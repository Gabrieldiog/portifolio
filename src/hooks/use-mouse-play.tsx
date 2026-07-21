"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Gate único dos efeitos de mouse: só com mouse de verdade e sem
// prefers-reduced-motion. Em touch, os hooks nem registram listener.
const MousePlayContext = createContext(false);

export function MousePlayProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return <MousePlayContext.Provider value={enabled}>{children}</MousePlayContext.Provider>;
}

export function useMousePlay() {
  return useContext(MousePlayContext);
}
