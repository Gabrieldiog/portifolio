"use client";

import { useState } from "react";
import { contato } from "@/lib/dados";

export function CopiarEmail() {
  const [copiado, setCopiado] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(contato.email);
          setCopiado(true);
          window.setTimeout(() => setCopiado(false), 2000);
        } catch {
          window.location.href = `mailto:${contato.email}`;
        }
      }}
      className="group inline-flex items-center gap-3 font-mono text-lg text-text transition-colors hover:text-accent md:text-xl"
    >
      <span>{contato.email}</span>
      <span
        role="status"
        aria-live="polite"
        className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint group-hover:text-accent"
      >
        {copiado ? "copiado ✓" : "copiar"}
      </span>
    </button>
  );
}
