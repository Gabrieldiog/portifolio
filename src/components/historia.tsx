"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { historia } from "@/lib/dados";

// A seção-assinatura: fica presa na tela e os capítulos da minha história
// avançam conforme o scroll (com snap por capítulo). No mobile e com
// prefers-reduced-motion vira uma lista empilhada normal, um por tela.
export function Historia() {
  const containerRef = useRef<HTMLElement>(null);
  const chapterRefs = useRef<(HTMLLIElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
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

          const chapterEls = chapterRefs.current.filter(
            (el): el is HTMLLIElement => el !== null,
          );
          if (chapterEls.length < 2) return;

          gsap.set(chapterEls, { position: "absolute", inset: 0 });
          gsap.set(chapterEls.slice(1), { opacity: 0, y: 44 });

          const setActive = (index: number) => {
            if (index === activeIndexRef.current) return;
            activeIndexRef.current = index;
            if (markerRef.current) {
              markerRef.current.textContent = historia[index].marcador;
            }
          };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${(chapterEls.length - 1) * window.innerHeight}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              snap: { snapTo: "labels", duration: 0.4, ease: "power1.inOut" },
              onUpdate: (self) => {
                if (progressRef.current) {
                  progressRef.current.style.width = `${self.progress * 100}%`;
                }
                setActive(Math.round(self.progress * (chapterEls.length - 1)));
              },
            },
          });

          // Transições em [i-1, i] e label no FIM de cada uma (t = i): o snap
          // descansa onde um capítulo está inteiro na tela, inclusive o último.
          chapterEls.forEach((el, i) => {
            if (i > 0) {
              tl.to(chapterEls[i - 1], { opacity: 0, y: -44, duration: 1 }, i - 1);
              tl.to(el, { opacity: 1, y: 0, duration: 1 }, i - 1);
            }
            tl.addLabel(`cap-${i}`, i);
          });
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="historia"
      aria-label="Minha história"
      className="relative isolate overflow-hidden border-t border-line bg-bg"
    >
      {/* Linha de progresso da história. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] bg-line">
        <div ref={progressRef} className="h-full w-0 bg-accent" />
      </div>

      {/* Marcador gigante do capítulo ativo. */}
      <span
        ref={markerRef}
        aria-hidden
        className="pointer-events-none absolute right-[4%] top-1/2 z-0 hidden -translate-y-1/2 font-display text-[11vw] font-bold leading-none text-accent/10 min-[900px]:block"
      >
        {historia[0]?.marcador}
      </span>

      <div className="pointer-events-none absolute left-6 top-10 z-10 md:left-14">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Minha história</p>
      </div>

      {/* Sem JS / mobile / reduced-motion: lista normal, um capítulo por tela. */}
      <ol className="relative min-h-screen list-none">
        {historia.map((cap, i) => (
          <li
            key={cap.marcador}
            ref={(el) => {
              chapterRefs.current[i] = el;
            }}
            className="flex min-h-screen flex-col justify-center gap-5 px-6 py-24 md:px-14"
          >
            <span className="font-mono text-sm uppercase tracking-[0.24em] text-accent">
              {String(i + 1).padStart(2, "0")} · {cap.marcador}
            </span>
            <h3 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-6xl">
              {cap.titulo}
            </h3>
            <p className="max-w-xl text-lg leading-relaxed text-muted md:text-xl">{cap.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
