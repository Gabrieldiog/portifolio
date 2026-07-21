"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Cada seção se apresenta: todo elemento marcado com data-reveal sobe e aparece
// no momento em que cruza a tela — a mesma pegada do "Sobre mim (&) minha
// jornada", pro site inteiro contar UMA história contínua (sem linhas secas
// separando as seções, e sem nada aparecendo antes da hora).
//
// O gatilho é POR elemento (não a seção inteira de uma vez): assim o título
// aparece quando você chega no título, e cada card quando você chega nele —
// mesmo numa seção alta, nada se revela fora da tela.
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const root = useRef<T>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]", root.current).forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 52,
            scale: 0.97,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return root;
}
