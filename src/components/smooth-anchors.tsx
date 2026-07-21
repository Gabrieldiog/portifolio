"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Todo link interno (#...) rola bonito, não pula. Um handler delegado no
// documento pega hero, rail, drawer e o "voltar ao topo" de uma vez, e
// sobrevive a re-render (o drawer abre/fecha à vontade).
//
// #topo vai pro início; #historia vai pro ponto da timeline onde os capítulos
// existem (o pin faz o id apontar pro topo do palco, então a gente resolve
// pela label do ScrollTrigger). O resto rola até o elemento.
export function SmoothAnchors() {
  const lenis = useLenis();

  useEffect(() => {
    const alvoY = (href: string): number | null => {
      if (href === "#topo") return 0;

      if (href === "#historia") {
        const st = ScrollTrigger.getById("palco-sobre");
        if (st) return st.labelToScroll("cap-0");
        // sem pin (mobile/reduced): o elemento está no fluxo normal.
      }

      const el = document.querySelector(href);
      if (!el) return null;
      const margem = 24;
      // top absoluto imune a scroll-lock: quando o body está travado
      // (position:fixed; top:-Y), window.scrollY zera e os rects deslocam -Y;
      // medir contra o próprio body cancela esse deslocamento em qualquer estado.
      const y = el.getBoundingClientRect().top - document.body.getBoundingClientRect().top - margem;
      return Math.max(0, y);
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const alvo = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (!alvo) return;
      const href = alvo.getAttribute("href");
      if (!href || href.length < 2) return;

      const y = alvoY(href);
      if (y == null) return;
      e.preventDefault();

      if (lenis) {
        lenis.scrollTo(y, { duration: 1.1, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
      } else {
        // Reduced-motion (Lenis desligado): salto direto, sem animação.
        gsap.set(window, { scrollTo: y });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}
