"use client";

import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// useLayoutEffect no cliente (a troca pra scroll nativo acontece antes da
// pintura); no servidor cai no useEffect só pra não avisar no SSR.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// A fiação Lenis+GSAP vive num FILHO do ReactLenis: o useLenis só entrega a
// instância quando ela existe (assinar via ref no pai roda cedo demais e a
// integração nunca anexa).
function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return null;
}

// Scroll amanteigado. Um único relógio: o gsap.ticker dirige o Lenis
// (autoRaf desligado). Com prefers-reduced-motion o site fica no scroll
// nativo (a troca é pré-pintura, sem flash).
export function LenisProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useIsoLayoutEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // A webfont chega depois do cálculo inicial dos pins; recalcula.
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.1, duration: 1.2, syncTouch: false }}>
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}
