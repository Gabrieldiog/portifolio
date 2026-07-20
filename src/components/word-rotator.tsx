"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type WordRotatorProps = { words: string[]; interval?: number; className?: string };

// Palavras trocando em loop contínuo. A parte animada é aria-hidden; o
// leitor de tela ouve a lista completa uma vez (sem spam de aria-live).
// O cursor em cima pausa (esperando a troca em curso terminar).
export function WordRotator({ words, interval = 2.2, className }: WordRotatorProps) {
  const root = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".word-rotator-item", root.current);
      if (items.length < 2) return;

      const mm = gsap.matchMedia();

      // As duas condições complementares: o handler roda pra TODO usuário
      // (só com "reduce" ele nunca dispararia no caso comum).
      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          noReduce: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduce } = context.conditions as { reduce: boolean };

          gsap.set(items, { opacity: 0, yPercent: 100 });
          gsap.set(items[0], { opacity: 1, yPercent: 0 });

          if (reduce) return; // fica na primeira palavra

          const tl = gsap.timeline({ repeat: -1 }); // contínuo (pausa sob o cursor)
          items.forEach((el, i) => {
            const next = items[(i + 1) % items.length];
            tl.to(el, { yPercent: -100, opacity: 0, duration: 0.5, ease: "power3.in" }, `+=${interval}`)
              .fromTo(
                next,
                { yPercent: 100, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
                "<",
              );
          });

          // Pausa sob o cursor (conteúdo em movimento precisa de freio) —
          // mas nunca no MEIO de uma troca: termina a transição e aí para.
          const el = root.current;
          let pausado = false;
          const pausar = () => {
            pausado = true;
            gsap.delayedCall(0.65, () => {
              if (pausado) tl.pause();
            });
          };
          const retomar = () => {
            pausado = false;
            tl.resume();
          };
          el?.addEventListener("pointerenter", pausar);
          el?.addEventListener("pointerleave", retomar);

          return () => {
            el?.removeEventListener("pointerenter", pausar);
            el?.removeEventListener("pointerleave", retomar);
            tl.kill();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root, dependencies: [words, interval] },
  );

  return (
    <span
      ref={root}
      className={`relative inline-block h-[1.15em] overflow-hidden pr-[0.05em] align-bottom ${className ?? ""}`}
    >
      <span aria-hidden="true" className="relative block h-full">
        {/* TODAS as palavras como fantasmas: a caixa fica com a largura da
            mais LARGA em pixels (contar letras mentia: "automatizar" é mais
            gorda que "simplificar" com o mesmo tanto de letras). */}
        <span className="invisible block h-0 overflow-hidden">
          {words.map((word) => (
            <span key={word} className="block whitespace-nowrap">
              {word}
            </span>
          ))}
        </span>
        {words.map((word) => (
          <span key={word} className="word-rotator-item absolute inset-0 whitespace-nowrap">
            {word}
          </span>
        ))}
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
