"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { perfil, chipsPerfil, palavrasHero } from "@/lib/dados";
import { WordRotator } from "@/components/word-rotator";
import { useMagnetic } from "@/hooks/use-magnetic";

const NOME = perfil.nomeGigante;

const stats = [
  { valor: "3+", rotulo: "anos de experiência" },
  { valor: "4", rotulo: "empresas atendidas" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>();

  // Parallax dos stat-cards flutuantes: cada card com profundidade própria.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(".stat-card", root.current);
          const movers = cards.map((card) => ({
            x: gsap.quickTo(card, "x", { duration: 0.6, ease: "power3.out" }),
            y: gsap.quickTo(card, "y", { duration: 0.6, ease: "power3.out" }),
            depth: Number(card.dataset.depth ?? "1"),
          }));

          const onMove = (e: MouseEvent) => {
            const relX = e.clientX / window.innerWidth - 0.5;
            const relY = e.clientY / window.innerHeight - 0.5;
            movers.forEach((m) => {
              m.x(relX * 26 * m.depth);
              m.y(relY * 26 * m.depth);
            });
          };

          window.addEventListener("mousemove", onMove, { passive: true });
          return () => window.removeEventListener("mousemove", onMove);
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="topo" className="relative w-full overflow-hidden pb-16 pt-6 md:pt-10">
      <div className="relative mx-auto w-full max-w-[1500px] px-3 md:px-6">
        <div className="relative mx-auto w-full">
          {/* Nome gigante: o SVG estica o texto até as duas bordas, em qualquer tela. */}
          <svg viewBox="0 0 1000 250" className="block h-auto w-full select-none" aria-hidden="true">
            <text
              x="0"
              y="205"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fill="var(--color-accent)"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 245 }}
            >
              {NOME}
            </text>
          </svg>

          {/* Foto na frente das letras, ancorada em % do mesmo wrapper do SVG. */}
          <div
            className="pointer-events-none absolute left-1/2 bottom-0 z-10 h-[132%] -translate-x-1/2"
            style={{ width: "clamp(150px, 32%, 480px)" }}
          >
            <Image
              src="/fotominha.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 45vw, 32vw"
              className="object-contain object-bottom"
              onLoad={() => ScrollTrigger.refresh()}
            />
          </div>

          {/* Heading real pra leitores de tela e SEO; o SVG acima é decorativo. */}
          <h1 className="sr-only">
            {perfil.nomeCompleto}, desenvolvedor full stack em {perfil.local}
          </h1>
          {/* As métricas dos cards flutuantes, audíveis (os cards são decorativos). */}
          <p className="sr-only">{stats.map((s) => `${s.valor} ${s.rotulo}`).join(". ")}.</p>

          {/* Stat-cards flutuando sobre o nome (desktop), com parallax. */}
          <div className="pointer-events-none absolute inset-0 z-20 hidden md:block" aria-hidden>
            <div className="stat-card absolute left-[3%] top-[58%]" data-depth="1.4">
              <StatCard valor={stats[0].valor} rotulo={stats[0].rotulo} />
            </div>
            <div className="stat-card absolute right-[4%] top-[12%]" data-depth="0.8">
              <StatCard valor={stats[1].valor} rotulo={stats[1].rotulo} />
            </div>
          </div>
        </div>

        {/* Nav do hero, abaixo do nome (como a referência). */}
        <nav className="relative z-20 mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-y border-line py-3 font-mono text-[0.68rem] uppercase tracking-[0.18em]">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#historia" className="inline-block py-2 text-muted transition-colors hover:text-accent">
              História
            </a>
            <a href="#sistemas" className="inline-block py-2 text-muted transition-colors hover:text-accent">
              Sistemas
            </a>
            <a href="#projetos" className="inline-block py-2 text-muted transition-colors hover:text-accent">
              Projetos
            </a>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#trajetoria" className="inline-block py-2 text-muted transition-colors hover:text-accent">
              Trajetória
            </a>
            <a href="#contato" className="inline-block py-2 text-accent transition-colors hover:text-accent-hi">
              Contato
            </a>
          </div>
        </nav>

        {/* Frase-tese + chips + CTAs. */}
        <div className="relative z-20 mt-10 grid items-start gap-8 md:grid-cols-[1fr_auto] md:gap-14">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted">
              {perfil.cargo} · {perfil.local}
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
              Pego um problema e<br />
              não paro até{" "}
              <WordRotator words={palavrasHero} className="text-accent" />
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
              Sou tranquilo no jeito e teimoso no problema. Construo sistemas de
              ponta a ponta que gente de verdade usa todo dia.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <a
                ref={ctaRef}
                href="#contato"
                className="inline-block rounded-full bg-accent px-7 py-3.5 font-medium text-bg transition-colors hover:bg-accent-hi"
              >
                Falar comigo
              </a>
              <a
                href="#historia"
                className="rounded-full border border-border px-7 py-3.5 font-medium text-text transition-colors hover:border-accent hover:text-accent"
              >
                Minha história
              </a>
            </div>
          </div>

          <ul className="flex max-w-xs flex-wrap gap-2 md:flex-col md:items-end">
            {chipsPerfil.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-accent/35 px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {/* Stats no mobile (no desktop flutuam sobre o nome). */}
        <div className="relative z-20 mt-10 grid grid-cols-2 gap-3 md:hidden" aria-hidden>
          {stats.map((s) => (
            <StatCard key={s.rotulo} valor={s.valor} rotulo={s.rotulo} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ valor, rotulo }: { valor: string; rotulo: string }) {
  return (
    <div className="pointer-events-auto rounded-2xl border border-border bg-surface/80 px-5 py-4 backdrop-blur-sm">
      <p className="font-display text-3xl font-semibold text-accent tnum">{valor}</p>
      <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
        {rotulo}
      </p>
    </div>
  );
}
