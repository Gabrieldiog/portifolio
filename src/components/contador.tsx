"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type ContadorProps = {
  valor: number;
  sufixo?: string;
  className?: string;
};

const fmt = new Intl.NumberFormat("pt-BR");

// Número que sobe ao entrar na tela, uma vez. O markup nasce com o valor
// final (sem JS mostra o certo); com JS, zera e anima direto no textContent.
export function Contador({ valor, sufixo = "", className }: ContadorProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const render = (n: number) => {
        el.textContent = `${fmt.format(Math.round(n))}${sufixo}`;
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        render(valor);
        return;
      }

      render(0);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: valor,
        duration: 1.4,
        ease: "power2.out",
        snap: { v: 1 },
        onUpdate: () => render(obj.v),
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    { scope: ref, dependencies: [valor, sufixo] },
  );

  return (
    <span ref={ref} className={className}>
      {fmt.format(valor)}
      {sufixo}
    </span>
  );
}
