import { contato, perfil } from "@/lib/dados";
import { CopiarEmail } from "./copiar-email";

export function Contato() {
  return (
    <footer id="contato" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Contato</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Tem um problema pra resolver?{" "}
          <span className="text-muted">Vamos conversar.</span>
        </h2>

        <div className="mt-10 flex flex-col gap-6">
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
