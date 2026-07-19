"use client";

import { projetos, type Projeto } from "@/lib/dados";
import { useTilt } from "@/hooks/use-tilt";

// Projetos autorais no ar: cards clicáveis com tilt leve no mouse.
export function Projetos() {
  return (
    <section id="projetos" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <header className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Projetos no ar
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Clica e usa.
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            Projetos autorais publicados, do app financeiro com usuárias reais ao
            jogo multijogador. Todos com código no GitHub.
          </p>
        </header>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {projetos.map((p) => (
            <CardProjeto key={p.id} projeto={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CardProjeto({ projeto }: { projeto: Projeto }) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 5 });

  return (
    <div
      ref={tiltRef}
      className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50 md:p-7"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl font-semibold">{projeto.nome}</h3>
        <a
          href={projeto.link}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full border border-accent/40 px-4 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent transition-colors hover:bg-accent hover:text-bg"
        >
          Ver no ar ↗
        </a>
      </div>
      <p className="mt-4 flex-1 leading-relaxed text-muted">{projeto.descricao}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-2">
          {projeto.stack.map((t) => (
            <li
              key={t}
              className="rounded border border-border bg-surface-2 px-2.5 py-1 font-mono text-[0.68rem] text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
        {projeto.repo && (
          <a
            href={projeto.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faint transition-colors hover:text-accent"
          >
            Código ↗
          </a>
        )}
      </div>
    </div>
  );
}
