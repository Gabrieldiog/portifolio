import { contato, perfil } from "@/lib/dados";
import { CopiarEmail } from "./copiar-email";

export function Contato() {
  return (
    <footer id="contato" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <p className="inline-block rounded-full border border-accent/40 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">
          Contato
        </p>
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Vamos trabalhar <span className="text-accent">juntos?</span>
        </h2>
        <p className="mt-5 max-w-xl text-lg font-medium leading-snug text-text">
          Disponível pra vaga presencial, remota ou híbrida,{" "}
          <span className="text-accent">com início imediato.</span>
        </p>
        <p className="mt-2 max-w-xl leading-relaxed text-muted">
          Freelas e projetos também são bem-vindos. Me chama que a gente conversa.
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div className="flex flex-col gap-6">
            <CopiarEmail />
            <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
              <a
                href={contato.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-accent"
              >
                GitHub ↗
              </a>
              <a
                href={contato.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-accent"
              >
                LinkedIn ↗
              </a>
              <a
                href={`mailto:${contato.email}`}
                className="text-muted transition-colors hover:text-accent"
              >
                E-mail ↗
              </a>
            </div>
          </div>

          {/* Me conheça em 1 minuto: vídeo de apresentação (em breve). */}
          <div className="w-full">
            <div className="aspect-video w-full overflow-hidden rounded-3xl border border-border bg-surface transition-colors hover:border-accent/50">
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-bg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <p className="font-display text-lg font-semibold">Me conheça em 1 minuto</p>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
                  vídeo de apresentação · em breve
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 font-mono text-xs text-faint">
          <span>
            {perfil.nomeCompleto} · {perfil.local}
          </span>
          <a href="#topo" className="transition-colors hover:text-accent">
            ↑ voltar ao topo
          </a>
        </div>
      </div>
    </footer>
  );
}
