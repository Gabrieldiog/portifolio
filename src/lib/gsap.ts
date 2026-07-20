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
}

export { gsap, useGSAP, ScrollTrigger, MotionPathPlugin, ScrambleTextPlugin };
