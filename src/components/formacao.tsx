"use client";

import { useReveal } from "@/hooks/use-reveal";
import { formacao, competencias } from "@/lib/dados";
import { useTilt } from "@/hooks/use-tilt";

// Formação, cursos, idiomas e o arsenal. Título e cards se apresentam ao entrar,
// na mesma pegada do resto da história.
export function Formacao() {
  const root = useReveal<HTMLElement>();

  return (
    <section ref={root} id="formacao" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 md:grid-cols-[1fr_1fr] md:gap-16 md:px-10 motion-safe:lg:pl-[var(--rail-inset)]">
        <div>
          <p
            data-reveal
            className="inline-block rounded-full border border-accent/40 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent"
          >
            Formação e base
          </p>
          <h2
            data-reveal
            className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl"
          >
            Levo o estudo a sério.
          </h2>
          <p data-reveal className="mt-4 max-w-md text-lg font-medium leading-snug text-text">
            Faculdade em andamento, cursos sempre que dá e{" "}
            <span className="text-accent">código escrito com a própria mão.</span>
          </p>

          <CardTilt className="mt-8 rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-accent/50">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-faint">
              Graduação
            </p>
            <p className="mt-2 font-display text-xl font-semibold">
              {formacao.graduacao.curso}
            </p>
            <p className="mt-1 text-sm text-muted">
              {formacao.graduacao.instituicao} · {formacao.graduacao.periodo}
            </p>
          </CardTilt>

          <CardTilt className="mt-5 rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-accent/50">
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
          </CardTilt>

          <div data-reveal className="mt-5 flex flex-wrap gap-2">
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
          <p data-reveal className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Com o que eu construo
          </p>
          <div className="mt-6 space-y-6">
            {competencias.map((c) => (
              <div key={c.grupo} data-reveal>
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

// Card com tilt 3D leve no mouse (e que se apresenta ao entrar).
function CardTilt({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useTilt<HTMLDivElement>({ max: 4 });
  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  );
}
