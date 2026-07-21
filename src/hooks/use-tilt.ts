"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMousePlay } from "@/hooks/use-mouse-play";

// Tilt 3D leve: o card inclina na direção do cursor (rotateX/rotateY) e volta
// no leave. rect recalculado no pointerenter. Só com mouse de verdade.
export function useTilt<T extends HTMLElement>({ max = 4 } = {}) {
  const ref = useRef<T>(null);
  const play = useMousePlay();

  useGSAP(() => {
    if (!play || !ref.current) return;
    const el = ref.current;
    let rect = el.getBoundingClientRect();

    const rotX = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" });
    const rotY = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" });

    const onEnter = () => {
      rect = el.getBoundingClientRect();
      gsap.set(el, { transformPerspective: 800, transformOrigin: "center" });
    };
    const onMove = (e: PointerEvent) => {
      const px = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const py = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      rotY(px * max);
      rotX(-py * max);
    };
    const onLeave = () => {
      rotX(0);
      rotY(0);
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, { dependencies: [play, max], revertOnUpdate: true });

  return ref;
}
