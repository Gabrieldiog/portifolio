import { formacao, competencias } from "@/lib/dados";

// Formação, cursos, idiomas e o que eu construo. Inclui o espaço do vídeo
// de apresentação (YouTube, em breve).
export function Formacao() {
  return (
    <section id="formacao" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1fr] md:gap-16 md:px-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Formação e base
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Levo o estudo a sério.
          </h2>

          <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
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

          <div className="mt-5 rounded-2xl border border-border bg-surface p-6">
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

          <div className="mt-5 flex flex-wrap gap-2">
            {formacao.idiomas.map((i) => (
              <span
                key={i}
                className="rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-[0.7rem] text-muted"
              >
                {i}
              </span>
            ))}
          </div>

          {/* Espaço do vídeo de apresentação (YouTube, entra em breve). */}
          <div className="mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 text-accent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
                Vídeo de apresentação · em breve
              </p>
            </div>
          </div>
        </div>

        <div className="md:pt-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Com o que eu construo
          </p>
          <div className="mt-6 space-y-6">
            {competencias.map((c) => (
              <div key={c.grupo}>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">
                  {c.grupo}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {c.itens.map((i) => (
                    <li
                      key={i}
                      className="rounded border border-border bg-surface px-2.5 py-1 font-mono text-[0.72rem] text-text"
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
