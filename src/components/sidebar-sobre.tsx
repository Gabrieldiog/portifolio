"use client";

import { useEffect, useRef, useState } from "react";
import { contato } from "@/lib/dados";

// A sidebar do "Sobre mim": se monta em cena durante o voo do hero e fica
// pro resto da jornada. As classes .alvo-* são os pontos de pouso do voo.
export function SidebarSobre() {
  const logoRef = useRef<HTMLSpanElement>(null);

  // O logo acompanha o morph GABRIEL/DIOGO do hero.
  useEffect(() => {
    const onMorph = (e: Event) => {
      const texto = (e as CustomEvent<string>).detail;
      if (logoRef.current && texto) logoRef.current.textContent = `${texto}®`;
    };
    window.addEventListener("nome-morph", onMorph);
    return () => window.removeEventListener("nome-morph", onMorph);
  }, []);

  return (
    <aside
      className="flex flex-col gap-3"
      aria-label="Resumo e navegação"
    >
      <div className="sobre-card rounded-2xl border border-border bg-surface p-5">
        <span
          ref={logoRef}
          className="alvo-logo inline-block rounded-lg bg-accent px-3 py-1 font-display text-sm font-bold text-bg"
        >
          GABRIEL®
        </span>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Sistemas de ponta a ponta, com calma e teimosia na medida.
        </p>
      </div>

      <div className="sobre-card alvo-stats flex items-center gap-4 rounded-2xl border border-border bg-surface p-5">
        <div>
          <p className="font-display text-2xl font-semibold text-accent tnum">3+</p>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">
            anos de código
          </p>
        </div>
        <span aria-hidden className="h-8 w-px bg-border" />
        <div>
          <p className="font-display text-2xl font-semibold text-accent tnum">15+</p>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">
            sistemas construídos
          </p>
        </div>
      </div>

      <nav className="sobre-card rounded-2xl border border-border bg-surface p-3" aria-label="Seções">
        <ul className="flex flex-col gap-1">
          <li>
            <a
              href="#topo"
              className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-text"
            >
              Home
            </a>
          </li>
          <li>
            <span className="alvo-menu-sobre block rounded-lg bg-accent px-3 py-2 text-sm font-medium text-bg">
              Sobre mim
            </span>
          </li>
          <li>
            <a
              href="#projetos"
              className="alvo-menu-projetos block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-text"
            >
              Projetos
            </a>
          </li>
          <li>
            <a
              href="#trajetoria"
              className="alvo-menu-trajetoria block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-text"
            >
              Trajetória
            </a>
          </li>
        </ul>
      </nav>

      <div className="sobre-card">
        <BotaoEmail />
      </div>

      <a
        href="#contato"
        className="sobre-card alvo-cta rounded-2xl bg-accent px-5 py-3.5 text-center font-medium text-bg transition-colors hover:bg-accent-hi"
      >
        Falar comigo
      </a>
    </aside>
  );
}

// E-mail com copiar, no formato pill da sidebar.
function BotaoEmail() {
  const [copiado, setCopiado] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(contato.email);
          setCopiado(true);
          window.setTimeout(() => setCopiado(false), 2000);
        } catch {
          window.location.href = `mailto:${contato.email}`;
        }
      }}
      className="group flex w-full items-center justify-between gap-2 rounded-2xl border border-border bg-surface px-4 py-3 text-left transition-colors hover:border-accent/50"
      aria-label={`Copiar e-mail ${contato.email}`}
    >
      <span className="truncate font-mono text-xs text-muted group-hover:text-text">
        {contato.email}
      </span>
      <span
        role="status"
        aria-live="polite"
        className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-accent"
      >
        {copiado ? "copiado ✓" : "copiar"}
      </span>
    </button>
  );
}
