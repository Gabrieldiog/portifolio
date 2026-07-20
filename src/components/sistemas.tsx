"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { sistemas } from "@/lib/dados";

const fmt = new Intl.NumberFormat("pt-BR");

// Vitrine pinada: a seção prende e cada avanço do scroll revela um sistema,
// com o número da métrica subindo junto da entrada do painel. A lista lateral
// marca o ativo; painéis inativos ficam inert (sem foco em link invisível).
// Fallback (mobile/reduced-motion/sem JS): painéis empilhados com o valor final.
export function Sistemas() {
  const containerRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLLIElement | null)[]>([]);
  const navRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const activeIndexRef = useRef(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 900px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };
          if (!isDesktop || reduceMotion) return;

          const panels = panelRefs.current.filter((el): el is HTMLLIElement => el !== null);
          if (panels.length < 2) return;

          gsap.set(panels, { position: "absolute", inset: 0 });
          gsap.set(panels.slice(1), { opacity: 0, y: 44 });
          panels.slice(1).forEach((el) => el.setAttribute("inert", ""));

          const setActive = (index: number) => {
            if (index === activeIndexRef.current) return;
            activeIndexRef.current = index;
            navRefs.current.forEach((el, i) => {
              el?.classList.toggle("text-accent", i === index);
              el?.classList.toggle("text-faint", i !== index);
            });
            panels.forEach((el, i) => {
              if (i === index) el.removeAttribute("inert");
              else el.setAttribute("inert", "");
            });
          };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${(panels.length - 1) * window.innerHeight}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              snap: { snapTo: "labels", duration: 0.4, ease: "power1.inOut" },
              onUpdate: (self) => {
                setActive(Math.round(self.progress * (panels.length - 1)));
              },
            },
          });

          // Transições em [i-1, i] e label no FIM (t = i): o snap descansa com
          // um painel inteiro na tela, inclusive o último. O contador do painel
          // sobe dentro da própria transição de entrada (dirigido pelo scroll).
          panels.forEach((el, i) => {
            if (i > 0) {
              tl.to(panels[i - 1], { opacity: 0, y: -44, duration: 1 }, i - 1);
              tl.to(el, { opacity: 1, y: 0, duration: 1 }, i - 1);

              const cont = el.querySelector<HTMLElement>(".contador");
              if (cont) {
                const valor = Number(cont.dataset.valor ?? "0");
                const sufixo = cont.dataset.sufixo ?? "";
                const obj = { v: 0 };
                tl.to(
                  obj,
                  {
                    v: valor,
                    duration: 1,
                    snap: { v: 1 },
                    onUpdate: () => {
                      cont.textContent = `${fmt.format(Math.round(obj.v))}${sufixo}`;
                    },
                  },
                  i - 1,
                );
              }
            }
            tl.addLabel(`sys-${i}`, i);
          });

          // Desfaz o que a timeline não desfaz sozinha (atributos e texto).
          return () => {
            panels.forEach((el) => {
              el.removeAttribute("inert");
              const cont = el.querySelector<HTMLElement>(".contador");
              if (cont) {
                cont.textContent = `${fmt.format(Number(cont.dataset.valor ?? "0"))}${cont.dataset.sufixo ?? ""}`;
              }
            });
          };
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="sistemas"
      aria-label="Sistemas em produção"
      className="relative isolate overflow-hidden border-t border-line bg-surface/40"
    >
      <div className="pointer-events-none absolute left-6 top-10 z-10 md:left-14">
        <p className="inline-block rounded-full border border-accent/40 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">
          Sistemas em produção
        </p>
        <p className="mt-3 max-w-sm text-lg font-medium leading-snug text-text">
          Alguns são internos, sem link pra visitar.{" "}
          <span className="text-accent">O número é a prova.</span>
        </p>
      </div>

      {/* Lista lateral: qual sistema está ativo (só onde o pin existe). */}
      <ol
        aria-hidden
        className="pointer-events-none absolute right-[4%] top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 text-right min-[900px]:flex"
      >
        {sistemas.map((s, i) => (
          <li key={s.id}>
            <span
              ref={(el) => {
                navRefs.current[i] = el;
              }}
              className={`font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors ${
                i === 0 ? "text-accent" : "text-faint"
              }`}
            >
              {s.nome}
            </span>
          </li>
        ))}
      </ol>

      {/* Fallback: painéis empilhados, um por tela, com o valor final. */}
      <ol className="relative min-h-screen list-none">
        {sistemas.map((s, i) => (
          <li
            key={s.id}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className="flex min-h-screen flex-col items-center justify-center px-6 py-24 md:px-14"
          >
            {/* O sistema vive num CARD, como os capítulos da história. */}
            <div className="w-full max-w-2xl rounded-3xl border border-border bg-surface-2/90 p-7 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm md:p-10">
              <p className="font-display text-7xl font-bold leading-none text-accent tnum md:text-8xl">
                <span className="contador" data-valor={s.metricaValor} data-sufixo={s.metricaSufixo}>
                  {fmt.format(s.metricaValor)}
                  {s.metricaSufixo}
                </span>
              </p>
              <p className="mt-3 max-w-sm font-mono text-[0.72rem] uppercase leading-relaxed tracking-[0.1em] text-muted">
                {s.metricaRotulo}
              </p>

              <div className="mt-7 border-t border-border pt-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-2xl font-semibold md:text-3xl">{s.nome}</h3>
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
                    {s.tagline}
                  </span>
                </div>
                <p className="mt-4 leading-relaxed text-muted">{s.descricao}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.stack.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-border bg-surface px-2.5 py-1 font-mono text-[0.7rem] text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <span className="text-faint">{s.papel}</span>
                  {s.link && (
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-accent-hi"
                    >
                      Ver ao vivo
                      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
