"use client";

import { useEffect, useRef } from "react";

// Indicador global de "role pra baixo": fica FIXO no rodapé, pequeno e discreto,
// acompanha a página inteira (não some junto com o hero) e só desaparece quando
// você chega perto do fim. Vale pro desktop e pro celular.
export function ScrollCue() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const medir = () => {
      raf = 0;
      const fim = document.documentElement.scrollHeight;
      const base = window.scrollY + window.innerHeight;
      // some perto do fim; e some também se a página não rola (nada a indicar).
      const rolavel = fim - window.innerHeight > 120;
      el.dataset.oculto = !rolavel || base > fim - 160 ? "1" : "0";
    };
    const agendar = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar, { passive: true });
    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      data-oculto="0"
      className="scroll-cue pointer-events-none fixed inset-x-0 bottom-[max(0.9rem,env(safe-area-inset-bottom))] z-40 flex flex-col items-center gap-1"
    >
      <span className="font-mono text-[0.5rem] uppercase tracking-[0.25em] text-muted">
        role
      </span>
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        className="scroll-bounce text-accent [filter:drop-shadow(0_1px_6px_rgba(0,0,0,0.6))]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}
