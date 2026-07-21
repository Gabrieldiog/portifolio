"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Registro central, uma vez só (sobrevive ao Fast Refresh).
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin, ScrambleTextPlugin, ScrollToPlugin);
  // No celular a barra de endereço aparece/some e muda a altura da viewport;
  // sem isso o pin "pula" a cada mudança. Ignora esse resize de UI.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, useGSAP, ScrollTrigger, MotionPathPlugin, ScrambleTextPlugin };
