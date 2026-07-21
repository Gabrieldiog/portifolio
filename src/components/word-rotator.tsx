"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type WordRotatorProps = { words: string[]; interval?: number; className?: string };

// Palavras trocando em loop contínuo, na MESMA linha do "até". Deslizam de baixo
// pra cima (nunca fica em branco) e ficam encostadas à ESQUERDA da caixa (logo
// depois do "até"), não centralizadas. A caixa reserva a largura da palavra mais
// larga com um fantasma invisível, então nada reflui. A parte animada é
// aria-hidden; o leitor de tela ouve a lista uma vez.
export function WordRotator({ words, interval = 2.2, className }: WordRotatorProps) {
  const root = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".word-rotator-item", root.current);
      if (items.length < 2) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          noReduce: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduce } = context.conditions as { reduce: boolean };

          // Estado base: todas embaixo, a primeira no palco.
          gsap.set(items, { yPercent: 110 });
          gsap.set(items[0], { yPercent: 0 });
          if (reduce) return; // fica na primeira palavra

          // Esteira determinística: em cada troca, o próximo é PARADO embaixo
          // (set explícito) e sobe enquanto o atual sai por cima. Sem fromTo /
          // immediateRender, então nunca trava nem fica em branco no loop.
          const tl = gsap.timeline({
            repeat: -1,
            defaults: { duration: 0.5, ease: "power2.inOut" },
          });
          items.forEach((el, i) => {
            const next = items[(i + 1) % items.length];
            const marca = `t${i}`;
            tl.addLabel(marca, `+=${interval}`);
            tl.set(next, { yPercent: 110 }, marca);
            tl.to(el, { yPercent: -110 }, marca);
            tl.to(next, { yPercent: 0 }, marca);
          });

          return () => tl.kill();
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
      <span aria-hidden className="relative block h-full">
        {/* Fantasma (h-0): dá a LARGURA da palavra mais larga em pixels. */}
        <span className="invisible block h-0 overflow-hidden">
          {words.map((word) => (
            <span key={word} className="block whitespace-nowrap">
              {word}
            </span>
          ))}
        </span>
        {words.map((word) => (
          <span
            key={word}
            className="word-rotator-item absolute inset-0 whitespace-nowrap text-left"
          >
            {word}
          </span>
        ))}
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
