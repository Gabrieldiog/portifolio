"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { historia, contato } from "@/lib/dados";

// A seção-assinatura, no molde da referência: sidebar fixa à esquerda
// (logo, stats, menu, e-mail, CTA) e, no palco, um CARD por capítulo da
// história. Conforme o scroll, o card anterior sai pela diagonal, o próximo
// entra por ela, e uma LINHA DO TEMPO vai sendo traçada atravessando a tela,
// com o ponto amarelo correndo na ponta. Fallback: cards empilhados.
export function Historia() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const linhaRef = useRef<SVGPathElement>(null);
  const pontoRef = useRef<SVGCircleElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const menuAtivoRef = useRef<HTMLSpanElement>(null);

  // O logo da sidebar acompanha o morph GABRIEL/DIOGO do hero.
  useEffect(() => {
    const onMorph = (e: Event) => {
      const texto = (e as CustomEvent<string>).detail;
      if (logoRef.current && texto) logoRef.current.textContent = `${texto}®`;
    };
    window.addEventListener("nome-morph", onMorph);
    return () => window.removeEventListener("nome-morph", onMorph);
  }, []);

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

          // A sidebar chega junto com o que desceu do hero.
          gsap.from(".hist-sidebar > *", {
            opacity: 0,
            y: -46,
            x: -30,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 55%",
              once: true,
            },
          });

          const cards = cardRefs.current.filter((el): el is HTMLLIElement => el !== null);
          if (cards.length < 2) return;

          const linha = linhaRef.current;
          const ponto = pontoRef.current;
          const header = headerRef.current;
          const total = cards.length - 1;

          gsap.set(cards, { position: "absolute", inset: 0, margin: "auto" });
          // Os próximos esperam embaixo, na direção da diagonal.
          gsap.set(cards.slice(1), { opacity: 0, x: -110, y: 90 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${total * window.innerHeight}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              snap: { snapTo: "labels", duration: 0.4, ease: "power1.inOut" },
            },
          });

          // A linha se traça do início ao fim do pin (pathLength normalizado
          // em 100) e o ponto corre na ponta do traço.
          if (linha) {
            gsap.set(linha, { strokeDasharray: 100, strokeDashoffset: 100 });
            tl.to(linha, { strokeDashoffset: 0, duration: total, ease: "none" }, 0);
          }
          if (ponto && linha) {
            tl.to(
              ponto,
              {
                motionPath: { path: linha, align: linha, alignOrigin: [0.5, 0.5] },
                duration: total,
                ease: "none",
              },
              0,
            );
          }

          // O cabeçalho da jornada some quando o primeiro card avança.
          if (header) {
            tl.to(header, { opacity: 0, y: -36, duration: 0.45 }, 0.1);
          }

          // Transição sequenciada: o card SAI por inteiro, a trilha respira
          // sozinha um instante, e só então o próximo ENTRA pela diagonal.
          cards.forEach((el, i) => {
            if (i > 0) {
              tl.to(cards[i - 1], { opacity: 0, x: 110, y: -90, duration: 0.38 }, i - 1);
              tl.to(el, { opacity: 1, x: 0, y: 0, duration: 0.38 }, i - 0.38);
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
      className="relative isolate overflow-hidden"
    >
      <p className="absolute left-6 top-8 z-10 font-mono text-xs uppercase tracking-[0.2em] text-accent min-[900px]:hidden">
        Minha história
      </p>

      <div className="mx-auto grid min-h-screen w-full max-w-[1500px] items-center gap-10 px-6 py-20 min-[900px]:grid-cols-[300px_1fr] min-[900px]:px-10 min-[900px]:py-0">
        {/* Sidebar: quem está contando a história. */}
        <aside className="hist-sidebar hidden flex-col gap-3 min-[900px]:flex" aria-label="Resumo e navegação">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <span
              ref={logoRef}
              className="inline-block rounded-lg bg-accent px-3 py-1 font-display text-sm font-bold text-bg"
            >
              GABRIEL®
            </span>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Sistemas de ponta a ponta, com calma e teimosia na medida.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5">
            <div>
              <p className="font-display text-2xl font-semibold text-accent tnum">3+</p>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">anos de código</p>
            </div>
            <span aria-hidden className="h-8 w-px bg-border" />
            <div>
              <p className="font-display text-2xl font-semibold text-accent tnum">15+</p>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">sistemas construídos</p>
            </div>
          </div>

          <nav className="rounded-2xl border border-border bg-surface p-3" aria-label="Seções">
            <ul className="flex flex-col gap-1">
              <li>
                <a href="#topo" className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-text">
                  Home
                </a>
              </li>
              <li>
                <span ref={menuAtivoRef} className="block rounded-lg bg-accent px-3 py-2 text-sm font-medium text-bg">
                  Sobre mim
                </span>
              </li>
              <li>
                <a href="#projetos" className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-text">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#trajetoria" className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-text">
                  Trajetória
                </a>
              </li>
            </ul>
          </nav>

          <BotaoEmail />

          <a
            href="#contato"
            className="rounded-2xl bg-accent px-5 py-3.5 text-center font-medium text-bg transition-colors hover:bg-accent-hi"
          >
            Falar comigo
          </a>
        </aside>

        {/* Palco: a linha do tempo atravessa e o card do capítulo vive no centro. */}
        <div className="relative flex min-h-[70vh] flex-col items-center justify-center min-[900px]:min-h-screen">
          {/* Cabeçalho da jornada (some quando o primeiro card avança). */}
          <div ref={headerRef} className="relative z-10 mb-10 w-full max-w-xl self-start min-[900px]:mb-12">
            <p className="inline-block rounded-full border border-accent/40 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">
              Do interior pro código
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-5xl">
              Sobre mim (&amp;)
              <br />
              minha jornada
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              A história de como as automações de uma fazenda viraram profissão.
              Mais fácil mostrar do que explicar.
            </p>
          </div>
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full min-[900px]:block"
          >
            {/* A trilha completa fica sempre visível (apagada) e o progresso
                acende por cima. Sem vector-effect: com ele o tracejado vira
                espaço de tela e o pathLength normalizado (100) deixa de valer. */}
            <path
              d="M -4 108 C 30 96, 40 78, 50 50 S 72 12, 104 -6"
              fill="none"
              stroke="var(--color-accent)"
              strokeOpacity="0.16"
              strokeWidth="0.4"
            />
            <path
              ref={linhaRef}
              d="M -4 108 C 30 96, 40 78, 50 50 S 72 12, 104 -6"
              pathLength={100}
              fill="none"
              stroke="var(--color-accent)"
              strokeOpacity="0.9"
              strokeWidth="0.55"
            />
            <circle ref={pontoRef} r="1.1" fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth="0.4" />
          </svg>

          {/* Sem JS / mobile / reduced-motion: cards empilhados. */}
          <ol className="relative z-10 flex w-full max-w-xl flex-col gap-6 min-[900px]:block min-[900px]:h-[34rem]">
            {historia.map((cap, i) => (
              <li
                key={cap.marcador}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="flex h-fit flex-col gap-4 rounded-3xl border border-border bg-surface-2/90 p-7 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm md:p-9"
              >
                <p className="font-display text-6xl font-bold leading-none text-accent md:text-7xl">
                  {cap.marcador}
                </p>
                <h3 className="font-display text-2xl font-semibold leading-tight md:text-3xl">
                  {cap.titulo}
                </h3>
                <p className="leading-relaxed text-muted">{cap.texto}</p>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">
                  Capítulo {String(i + 1).padStart(2, "0")} · {String(historia.length).padStart(2, "0")}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// E-mail com copiar, no formato pill da sidebar.
function BotaoEmail() {
  const [copiado, setCopiado] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(contato.email);
          setCopiado(true);
          window.setTimeout(() => setCopiado(false), 2000);
        } catch {
          window.location.href = `mailto:${contato.email}`;
        }
      }}
      className="group flex items-center justify-between gap-2 rounded-2xl border border-border bg-surface px-4 py-3 text-left transition-colors hover:border-accent/50"
      aria-label={`Copiar e-mail ${contato.email}`}
    >
      <span className="truncate font-mono text-xs text-muted group-hover:text-text">
        {contato.email}
      </span>
      <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-accent">
        {copiado ? "copiado ✓" : "copiar"}
      </span>
    </button>
  );
}
