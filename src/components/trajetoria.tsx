"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { trajetoria, alcanceTotal, type Trabalho } from "@/lib/dados";
import { useTilt } from "@/hooks/use-tilt";
import { Contador } from "@/components/contador";

// Onde meu código roda: coluna esquerda fixa com o número total e o porquê
// de nem tudo ter link; à direita, um card por casa com tudo que construí.
export function Trajetoria() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Cards sobem em cascata ao entrar na tela (só com movimento liberado).
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(gsap.utils.toArray<HTMLElement>(".traj-card", root.current), {
          opacity: 0,
          y: 44,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="trajetoria" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 md:px-10 min-[900px]:grid-cols-[340px_1fr] min-[900px]:gap-16">
        {/* Coluna esquerda: o total e a explicação, presos enquanto rola. */}
        <aside className="min-[900px]:sticky min-[900px]:top-16 min-[900px]:self-start">
          <p className="inline-block rounded-full border border-accent/40 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">
            Trajetória
          </p>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-5xl">
            Onde meu
            <br />
            código roda.
          </h2>

          <div className="mt-8 rounded-3xl border border-accent/30 bg-surface p-7">
            <p className="font-display text-6xl font-bold leading-none text-accent-hi tnum">
              <Contador valor={400} sufixo="+" />
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text">{alcanceTotal.rotulo}</p>
          </div>

          <p className="mt-6 max-w-xs text-lg font-medium leading-snug text-text">
            A maioria é sistema interno:{" "}
            <span className="text-accent">não tem landing page pra visitar.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Roda na rede de quem contratou, todo dia. Por isso a prova aqui não
            é um link bonito: é quem usa.
          </p>
        </aside>

        {/* Cards das casas, com tilt no mouse. */}
        <div className="flex flex-col gap-6">
          {trajetoria.map((t) => (
            <CardTrabalho key={t.org} trabalho={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CardTrabalho({ trabalho }: { trabalho: Trabalho }) {
  const tiltRef = useTilt<HTMLElement>({ max: 3 });

  return (
    <article
      ref={tiltRef}
      className="traj-card group rounded-3xl border border-border bg-surface p-7 transition-colors hover:border-accent/50 md:p-9"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-2xl font-semibold transition-colors group-hover:text-accent md:text-3xl">
            {trabalho.org}
          </h3>
          {trabalho.site && (
            <a
              href={trabalho.site}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent hover:text-accent-hi"
            >
              site ↗
            </a>
          )}
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-faint">
          {trabalho.periodo}
        </p>
      </div>
      <p className="mt-1 text-sm text-muted">{trabalho.cargo}</p>

      {/* O número da casa, subindo em amarelo brilhante. */}
      {trabalho.metrica && (
        <div className="mt-5 flex items-baseline gap-3">
          <p className="font-display text-5xl font-bold leading-none text-accent-hi tnum md:text-6xl">
            <Contador valor={trabalho.metrica.valor} sufixo={trabalho.metrica.sufixo} />
          </p>
          <p className="max-w-[12rem] font-mono text-[0.65rem] uppercase leading-snug tracking-[0.12em] text-muted">
            {trabalho.metrica.rotulo}
          </p>
        </div>
      )}

      <ul className="mt-5 flex flex-col gap-2.5">
        {trabalho.feitos.map((f) => (
          <li key={f} className="flex gap-3 leading-relaxed text-muted">
            <span aria-hidden className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {f}
          </li>
        ))}
      </ul>

      {trabalho.nota && (
        <p className="mt-5 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm leading-relaxed text-text">
          {trabalho.nota}
        </p>
      )}
    </article>
  );
}
