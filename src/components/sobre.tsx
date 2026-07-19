import { competencias } from "@/lib/dados";

export function Sobre() {
  return (
    <section id="sobre" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1fr] md:gap-16 md:px-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Sobre
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Resolvo o problema — e ajudo quem está do outro lado dele.
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>
              Sou desenvolvedor full stack, cursando Engenharia de Software na
              UNIGOIÁS. Em 3+ anos, fui de sistema de gestão a plataforma de
              dados em tempo real, sempre de ponta a ponta — API, banco, front e
              o deploy no servidor Linux.
            </p>
            <p>
              Trabalho calmo, mas não largo um problema até ele estar resolvido
              e rodando. Gosto de código limpo, de teste automatizado (TDD/BDD) e
              de deixar as coisas mais simples pra quem vai usar.
            </p>
          </div>

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
