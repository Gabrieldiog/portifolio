import { trajetoria } from "@/lib/dados";

export function Trajetoria() {
  return (
    <section id="trajetoria" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <header className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Trajetória
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Onde meu código roda.
          </h2>
        </header>

        <ol className="mt-12">
          {trajetoria.map((t) => (
            <li
              key={t.org}
              className="grid gap-2 border-t border-line py-8 md:grid-cols-[13rem_1fr] md:gap-10"
            >
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-faint">
                {t.periodo}
              </p>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-display text-xl font-semibold">{t.org}</h3>
                  {t.site && (
                    <a
                      href={t.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent hover:text-accent-hi"
                    >
                      site ↗
                    </a>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">{t.cargo}</p>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                  {t.resumo}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
