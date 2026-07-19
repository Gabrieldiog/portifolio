import { sistemas } from "@/lib/dados";

export function Sistemas() {
  return (
    <section id="sistemas" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <header className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Sistemas em produção
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            O número é a prova.
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            Não são protótipos — são sistemas que pessoas usam pra trabalhar
            todo dia. Alguns são internos, sem link pra visitar; aí o que mostra
            o valor é quem está do outro lado usando.
          </p>
        </header>

        <div className="mt-14 flex flex-col">
          {sistemas.map((s) => (
            <article
              key={s.id}
              className="grid gap-6 border-t border-line py-12 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-12"
            >
              <div>
                <p className="font-display text-6xl font-semibold leading-none text-accent tnum md:text-7xl">
                  {s.metricaValor}
                </p>
                <p className="mt-3 max-w-[14rem] font-mono text-[0.72rem] uppercase leading-relaxed tracking-[0.1em] text-muted">
                  {s.metricaRotulo}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-2xl font-semibold">{s.nome}</h3>
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
                    {s.tagline}
                  </span>
                </div>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                  {s.descricao}
                </p>
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
                      <span
                        aria-hidden
                        className="transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
