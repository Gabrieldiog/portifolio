"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMousePlay } from "@/hooks/use-mouse-play";

// Tilt 3D leve em cards: rotação limitada seguindo o cursor.
export function useTilt<T extends HTMLElement>({ max = 6 } = {}) {
  const ref = useRef<T>(null);
  const play = useMousePlay();

  useGSAP(() => {
    if (!play || !ref.current) return;
    const el = ref.current;
    let rect = el.getBoundingClientRect();
    const updateRect = () => {
      rect = el.getBoundingClientRect();
    };

    gsap.set(el, { transformPerspective: 800, transformStyle: "preserve-3d" });

    const rotateX = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: "power3" });
    const rotateY = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotateY(gsap.utils.mapRange(0, 1, -max, max, px));
      rotateX(gsap.utils.mapRange(0, 1, max, -max, py));
    };
    const onLeave = () => {
      rotateX(0);
      rotateY(0);
    };

    el.addEventListener("pointerenter", updateRect);
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", updateRect);

    return () => {
      el.removeEventListener("pointerenter", updateRect);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", updateRect);
    };
  }, { dependencies: [play, max], revertOnUpdate: true });

  return ref;
}
