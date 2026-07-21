"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { contato } from "@/lib/dados";
import { ScrollTrigger } from "@/lib/gsap";

// A rail persistente: no desktop é a coluna fixa à esquerda que se monta durante
// o voo do hero (os alvos .alvo-* são os pontos de pouso) e acompanha a jornada
// inteira; no celular ela vira um botão hambúrguer que abre um drawer pela
// esquerda. O scroll-spy acende o item da seção em que você está.

type Item = { href: string; label: string; spy: string; alvo?: string };

const ITENS: Item[] = [
  { href: "#topo", label: "Home", spy: "" },
  { href: "#historia", label: "Sobre mim", spy: "historia", alvo: "alvo-menu-sobre" },
  { href: "#projetos", label: "Projetos", spy: "projetos", alvo: "alvo-menu-projetos" },
  { href: "#trajetoria", label: "Trajetória", spy: "trajetoria", alvo: "alvo-menu-trajetoria" },
  { href: "#formacao", label: "Formação", spy: "formacao" },
  { href: "#contato", label: "Contato", spy: "contato" },
];

export function SidebarRail() {
  const [aberto, setAberto] = useState(false);
  const lenis = useLenis();
  const logoRef = useRef<HTMLSpanElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const scrollLockY = useRef(0);

  // Trava/destrava o corpo de forma IMPERATIVA (não via cleanup de efeito):
  // ao navegar por um link do drawer, precisamos destravar SÍNCRONO no clique,
  // antes de o smooth-anchor global medir o alvo — senão o body travado
  // (position:fixed; top:-Y) desloca todos os rects e o link pousa errado.
  const travarCorpo = () => {
    scrollLockY.current = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollLockY.current}px`;
    body.style.width = "100%";
  };
  const destravarCorpo = () => {
    const body = document.body;
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";
    window.scrollTo(0, scrollLockY.current);
    // O position:fixed zera o range de scroll do Lenis; ao destravar,
    // resincronizamos dimensões + posição, senão ele recusa o próximo
    // scrollTo (a navegação do menu ficaria parada).
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(scrollLockY.current, { immediate: true });
    }
  };

  const abrir = () => {
    travarCorpo();
    setAberto(true);
  };
  // Usado por X, backdrop, Esc E pelos links: destrava o corpo e restaura o
  // scroll no MESMO clique. Nos links não damos preventDefault, então o
  // smooth-anchor global roda em seguida com o corpo já livre e mede certo.
  const fechar = () => {
    destravarCorpo();
    setAberto(false);
  };

  // O logo acompanha o morph GABRIEL/DIOGO do hero.
  useEffect(() => {
    const onMorph = (e: Event) => {
      const texto = (e as CustomEvent<string>).detail;
      if (logoRef.current && texto) logoRef.current.textContent = `${texto}®`;
    };
    window.addEventListener("nome-morph", onMorph);
    return () => window.removeEventListener("nome-morph", onMorph);
  }, []);

  // Scroll-spy: descobre a seção sob o centro da tela e acende o item certo.
  // Seções pinadas medem pelo range do ScrollTrigger; as demais pelo offset.
  useEffect(() => {
    const topoDe = (id: string) => {
      const el = document.getElementById(id);
      return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
    };
    const inicioSecao = (spy: string): number => {
      if (spy === "historia") return 0; // o palco é a primeira seção, sempre
      if (spy === "projetos") {
        const st = ScrollTrigger.getById("projetos-pin");
        return st ? st.start : topoDe("projetos");
      }
      return topoDe(spy);
    };

    let raf = 0;
    let atual = "";
    const medir = () => {
      raf = 0;
      const centro = window.scrollY + window.innerHeight * 0.5;
      let ativo = "historia";
      for (const it of ITENS) {
        if (!it.spy) continue;
        if (inicioSecao(it.spy) <= centro) ativo = it.spy;
      }
      if (ativo === atual) return;
      atual = ativo;
      document.querySelectorAll<HTMLElement>("[data-spy]").forEach((el) => {
        el.classList.toggle("is-active", el.dataset.spy === ativo);
      });
    };
    const agendar = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Drawer aberto: Esc fecha, foca o primeiro item e PRENDE o foco (Tab não
  // escapa pro conteúdo atrás). O corpo já foi travado no abrir().
  useEffect(() => {
    if (!aberto) return;
    const botao = botaoRef.current;
    const drawer = drawerRef.current;

    const focaveis = () =>
      drawer
        ? Array.from(
            drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
          ).filter((el) => el.offsetParent !== null)
        : [];

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        fechar();
        return;
      }
      if (e.key !== "Tab") return;
      const els = focaveis();
      if (!els.length) return;
      const primeiro = els[0];
      const ultimo = els[els.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    focaveis()[0]?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      botao?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberto]);

  return (
    <>
      {/* ── RAIL FIXA (desktop com movimento) ─────────────────────────────── */}
      <aside
        id="rail"
        aria-label="Resumo e navegação"
        className="pointer-events-none fixed left-[var(--rail-left)] top-1/2 z-30 hidden w-[var(--rail-w)] -translate-y-1/2 flex-col gap-2.5 motion-safe:lg:flex"
      >
        <div className="rail-card rounded-2xl border border-border bg-surface p-5">
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

        <div className="rail-card alvo-stats flex items-center gap-4 rounded-2xl border border-border bg-surface p-5">
          <div>
            <p className="font-display text-2xl font-semibold text-accent tnum">3+</p>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">anos de código</p>
          </div>
          <span aria-hidden className="h-8 w-px bg-border" />
          <div>
            <p className="font-display text-2xl font-semibold text-accent tnum">15+</p>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">sistemas profissionais</p>
          </div>
        </div>

        <nav className="rail-card rounded-2xl border border-border bg-surface p-3" aria-label="Seções">
          <ul className="flex flex-col gap-0.5">
            {ITENS.map((it) => (
              <li key={it.href}>
                <a
                  href={it.href}
                  data-spy={it.spy || undefined}
                  className={`rail-link block rounded-lg px-3 py-1.5 text-sm ${it.alvo ?? ""}`}
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="rail-card">
          <BotaoEmail />
        </div>

        <a
          href="#contato"
          className="rail-card alvo-cta rounded-2xl bg-accent px-5 py-3.5 text-center font-medium text-bg transition-colors hover:bg-accent-hi"
        >
          Falar comigo
        </a>
      </aside>

      {/* ── HAMBÚRGUER (celular, e desktop com reduced-motion) ────────────── */}
      <button
        ref={botaoRef}
        type="button"
        onClick={abrir}
        aria-label="Abrir menu"
        aria-expanded={aberto}
        aria-controls="drawer-menu"
        className="fixed left-[max(1rem,env(safe-area-inset-left))] top-[max(1rem,env(safe-area-inset-top))] z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/90 backdrop-blur-md lg:hidden motion-reduce:lg:flex"
      >
        <span aria-hidden className="relative block h-3 w-5">
          <span className="absolute left-0 top-0 h-0.5 w-full rounded-full bg-text" />
          <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-text" />
          <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-text" />
        </span>
      </button>

      {/* Backdrop + painel */}
      <div
        className={`fixed inset-0 z-50 lg:hidden motion-reduce:lg:block ${aberto ? "" : "pointer-events-none"}`}
        aria-hidden={!aberto}
      >
        <button
          type="button"
          tabIndex={aberto ? 0 : -1}
          aria-label="Fechar menu"
          onClick={fechar}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            aberto ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          id="drawer-menu"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          inert={!aberto}
          className={`absolute inset-y-0 left-0 flex w-[min(84vw,340px)] flex-col gap-4 overflow-y-auto border-r border-border bg-surface p-6 pt-[max(1.5rem,env(safe-area-inset-top))] shadow-2xl transition-transform duration-300 ease-out will-change-transform ${
            aberto ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="inline-block rounded-lg bg-accent px-3 py-1 font-display text-sm font-bold text-bg">
              GABRIEL®
            </span>
            <button
              type="button"
              onClick={fechar}
              aria-label="Fechar menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-text"
            >
              <span aria-hidden className="text-lg leading-none">✕</span>
            </button>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface-2 p-4">
            <div>
              <p className="font-display text-2xl font-semibold text-accent tnum">3+</p>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted">anos de código</p>
            </div>
            <span aria-hidden className="h-8 w-px bg-border" />
            <div>
              <p className="font-display text-2xl font-semibold text-accent tnum">15+</p>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted">profissionais</p>
            </div>
          </div>

          <nav aria-label="Seções">
            <ul className="flex flex-col gap-1">
              {ITENS.map((it) => (
                <li key={it.href}>
                  <a
                    href={it.href}
                    data-spy={it.spy || undefined}
                    onClick={fechar}
                    className="rail-link block rounded-lg px-4 py-3 text-base"
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-3 pb-[env(safe-area-inset-bottom)]">
            <BotaoEmail />
            <a
              href="#contato"
              onClick={fechar}
              className="rounded-2xl bg-accent px-5 py-3.5 text-center font-medium text-bg transition-colors hover:bg-accent-hi"
            >
              Falar comigo
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// E-mail com copiar, no formato pill.
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
      <span className="truncate font-mono text-xs text-muted group-hover:text-text">{contato.email}</span>
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
