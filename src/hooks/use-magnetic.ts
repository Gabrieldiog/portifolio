"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMousePlay } from "@/hooks/use-mouse-play";

// Botão magnético: o elemento se inclina na direção do cursor e volta no leave.
// rect recalculado só no pointerenter (nem thrash por frame, nem cache obsoleto).
export function useMagnetic<T extends HTMLElement>({ strength = 0.35 } = {}) {
  const ref = useRef<T>(null);
  const play = useMousePlay();

  useGSAP(() => {
    if (!play || !ref.current) return;
    const el = ref.current;
    let rect = el.getBoundingClientRect();

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    const onEnter = () => {
      rect = el.getBoundingClientRect();
    };
    const onMove = (e: PointerEvent) => {
      xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, { dependencies: [play, strength], revertOnUpdate: true });

  return ref;
}
