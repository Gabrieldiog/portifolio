"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { formacao, competencias } from "@/lib/dados";

// Formação, cursos, idiomas e o arsenal. Cards com hover e entrada em cascata.
export function Formacao() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(gsap.utils.toArray<HTMLElement>(".form-card", root.current), {
          opacity: 0,
          y: 36,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: root.current,
            start: "top 72%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="formacao" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 md:grid-cols-[1fr_1fr] md:gap-16 md:px-10">
        <div>
          <p className="inline-block rounded-full border border-accent/40 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">
            Formação e base
          </p>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Levo o estudo a sério.
          </h2>
          <p className="mt-4 max-w-md text-lg font-medium leading-snug text-text">
            Faculdade em andamento, cursos sempre que dá e{" "}
            <span className="text-accent">código escrito com a própria mão.</span>
          </p>

          <div className="form-card mt-8 rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-accent/50">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-faint">
              Graduação
            </p>
            <p className="mt-2 font-display text-xl font-semibold">
              {formacao.graduacao.curso}
            </p>
            <p className="mt-1 text-sm text-muted">
              {formacao.graduacao.instituicao} · {formacao.graduacao.periodo}
            </p>
          </div>

          <div className="form-card mt-5 rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-accent/50">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-faint">
              Cursos
            </p>
            <ul className="mt-3 space-y-2">
              {formacao.cursos.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="form-card mt-5 flex flex-wrap gap-2">
            {formacao.idiomas.map((i) => (
              <span
                key={i}
                className="rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-[0.7rem] text-muted transition-colors hover:border-accent/50 hover:text-text"
              >
                {i}
              </span>
            ))}
          </div>
        </div>

        <div className="md:pt-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Com o que eu construo
          </p>
          <div className="mt-6 space-y-6">
            {competencias.map((c) => (
              <div key={c.grupo} className="form-card">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">
                  {c.grupo}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {c.itens.map((i) => (
                    <li
                      key={i}
                      className="rounded border border-border bg-surface px-2.5 py-1 font-mono text-[0.72rem] text-text transition-colors hover:border-accent/60 hover:text-accent"
                    >
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
