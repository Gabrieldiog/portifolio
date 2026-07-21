"use client";

import { contato, perfil } from "@/lib/dados";
import { CopiarEmail } from "./copiar-email";
import { useReveal } from "@/hooks/use-reveal";

// Ícones das redes (SVG inline). A cor oficial de cada marca vem do canal.
const icones: Record<string, React.ReactNode> = {
  whatsapp: (
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  ),
  linkedin: (
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  ),
  github: (
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  ),
  email: (
    <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v.01L12 13l8-6.99V6H4zm16 12V8.24l-8 6.99-8-6.99V18h16z" />
  ),
};

// Cores oficiais das marcas (GitHub em branco pra ler no fundo escuro).
const canais = [
  { id: "whatsapp", nome: "WhatsApp", valor: contato.whatsappLabel, href: contato.whatsapp, cor: "#25D366" },
  { id: "linkedin", nome: "LinkedIn", valor: "in/gabrieldiogovsilva", href: contato.linkedin, cor: "#0A66C2" },
  { id: "github", nome: "GitHub", valor: "Gabrieldiog", href: contato.github, cor: "#f2f2f2" },
  { id: "email", nome: "E-mail", valor: contato.email, href: `mailto:${contato.email}`, cor: "#e9bc4a" },
];

export function Contato() {
  const root = useReveal<HTMLElement>();

  return (
    <footer ref={root} id="contato" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 motion-safe:lg:pl-[var(--rail-inset)]">
        <p
          data-reveal
          className="inline-block rounded-full border border-accent/40 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent"
        >
          Contato
        </p>
        <h2
          data-reveal
          className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl"
        >
          Vamos trabalhar <span className="text-accent">juntos?</span>
        </h2>
        <p data-reveal className="mt-5 max-w-xl text-lg font-medium leading-snug text-text">
          Disponível pra vaga presencial, remota ou híbrida,{" "}
          <span className="text-accent">com início imediato.</span>
        </p>
        <p data-reveal className="mt-2 max-w-xl leading-relaxed text-muted">
          Freelas e projetos também são bem-vindos. Me chama que a gente conversa.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-stretch">
          {/* Card de contato: e-mail em destaque + as redes com logo colorida. */}
          <div data-reveal className="rounded-3xl border border-border bg-surface p-6 md:p-8">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">
              Me chama por aqui
            </p>
            <div className="mt-3">
              <CopiarEmail />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {canais.map((c, i) => (
                <a
                  key={c.id}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ animationDelay: `${i * 0.6}s` }}
                  className="canal-card group flex items-center gap-3 rounded-2xl border border-border bg-surface-2 px-4 py-3.5 transition-[transform,border-color] hover:-translate-y-0.5 hover:border-accent/60"
                >
                  <span
                    className="canal-icone flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-bg"
                    style={{ color: c.cor, animationDelay: `${i * 0.35}s` }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      {icones[c.id]}
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-text">{c.nome}</span>
                    <span className="block truncate font-mono text-[0.68rem] text-muted">
                      {c.valor}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Resumo profissional (no lugar do vídeo, por enquanto). */}
          <div data-reveal className="flex flex-col justify-center rounded-3xl border border-border bg-surface p-6 md:p-8">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">
              Resumo
            </p>
            <p className="mt-3 text-lg leading-relaxed text-text">
              Desenvolvedor full stack com 3+ anos construindo aplicações de ponta
              a ponta: do back-end{" "}
              <span className="text-accent">(Node.js, TypeScript, PHP)</span> ao
              front-end <span className="text-accent">(React, Next.js)</span>,
              passando por banco, testes e deploy em Linux.
            </p>
            <p className="mt-3 leading-relaxed text-muted">
              Já entreguei sistemas usados por centenas de pessoas, de plataforma
              de dados em tempo real a totem interativo em Brasília. Cursando
              Engenharia de Software na UNIGOIÁS.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Goiânia, GO", "Presencial · remoto · híbrido", "Início imediato"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-accent/35 px-4 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-accent"
                >
                  {t}
                </span>
              ))}
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
