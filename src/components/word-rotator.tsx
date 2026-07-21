"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type WordRotatorProps = { words: string[]; interval?: number; className?: string };

// Palavras trocando em loop, na MESMA linha do "até". Usa DOIS slots que se
// revezam: enquanto o da frente sai por cima, o de trás (já com a próxima
// palavra) sobe pra cena — os dois se sobrepõem, então NUNCA fica em branco.
// O texto de cada slot é sempre uma palavra de verdade, e a limpeza recoloca a
// primeira palavra visível: mesmo se o GSAP matar a timeline no meio de uma
// troca (Fast Refresh), ele volta legível em vez de sumir. Encostado à esquerda
// (logo depois do "até") e a largura é travada pela palavra mais larga.
export function WordRotator({ words, interval = 2.2, className }: WordRotatorProps) {
  const root = useRef<HTMLSpanElement>(null);
  const aRef = useRef<HTMLSpanElement>(null);
  const bRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const a = aRef.current;
      const b = bRef.current;
      if (!a || !b || words.length < 2) return;
      const slots = [a, b];

      // Estado base: 1ª palavra no palco, 2ª esperando embaixo. SEMPRE legível.
      const base = () => {
        a.textContent = words[0];
        b.textContent = words[1 % words.length];
        gsap.set(a, { yPercent: 0, autoAlpha: 1 });
        gsap.set(b, { yPercent: 100, autoAlpha: 1 });
      };

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          noReduce: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduce } = context.conditions as { reduce: boolean };
          base();
          if (reduce) return; // fica na primeira palavra

          const tl = gsap.timeline({ repeat: -1 });
          for (let k = 0; k < words.length; k++) {
            const front = slots[k % 2];
            const back = slots[(k + 1) % 2];
            const prox = words[(k + 1) % words.length];
            const marca = `s${k}`;
            tl.addLabel(marca, `+=${interval}`);
            // No rótulo, o slot de trás recebe a próxima palavra e é posto
            // embaixo (via callback, no runtime — nada de render antecipado).
            tl.call(
              () => {
                back.textContent = prox;
                gsap.set(back, { yPercent: 100, autoAlpha: 1 });
              },
              undefined,
              marca,
            );
            tl.to(front, { yPercent: -100, duration: 0.5, ease: "power2.inOut" }, marca);
            tl.to(back, { yPercent: 0, duration: 0.5, ease: "power2.inOut" }, marca);
          }

          return () => {
            tl.kill();
            base(); // nunca deixa em branco
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root, dependencies: [words.join("|"), interval] },
  );

  return (
    <span
      ref={root}
      className={`relative inline-block h-[1.15em] translate-y-[0.12em] overflow-hidden text-left align-bottom ${className ?? ""}`}
    >
      {/* Fantasma (h-0): trava a LARGURA na palavra mais larga. */}
      <span aria-hidden className="invisible block h-0 overflow-hidden">
        {words.map((word) => (
          <span key={word} className="block whitespace-nowrap">
            {word}
          </span>
        ))}
      </span>
      <span ref={aRef} aria-hidden className="absolute inset-0 whitespace-nowrap text-left">
        {words[0]}
      </span>
      <span ref={bRef} aria-hidden className="absolute inset-0 whitespace-nowrap text-left">
        {words[1 % words.length]}
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
