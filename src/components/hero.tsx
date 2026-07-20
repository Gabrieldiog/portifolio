"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { perfil, chipsPerfil, palavrasHero } from "@/lib/dados";
import { WordRotator } from "@/components/word-rotator";
import { useMagnetic } from "@/hooks/use-magnetic";

const NOME = perfil.nomeGigante; // GABRIEL
const APELIDO = "DIOGO";

// Dourado de verdade no nome: base apagada + camada acesa pelo holofote.
const OURO_BASE = "#c99a12";
const OURO_ACESO = "#ffdd66";

const stats = [{ valor: "3+", rotulo: "anos de experiência" }, { valor: "15+", rotulo: "sistemas construídos" }];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const nomeRef = useRef<SVGSVGElement>(null);
  const textoBaseRef = useRef<SVGTextElement>(null);
  const textoAcesoRef = useRef<SVGTextElement>(null);
  const fotoRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<SVGCircleElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>();
  const cta2Ref = useMagnetic<HTMLAnchorElement>();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ── Mouse-play: holofote, profundidade e parallax ──────────────────
      mm.add(
        {
          play: "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
          rest: "not ((min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference))",
        },
        (context) => {
          const { play } = context.conditions as { play: boolean };
          const spot = spotRef.current;

          if (!play) {
            if (spot) gsap.set(spot, { x: 500, y: 130 });
            return;
          }

          const flutuantes = gsap.utils.toArray<HTMLElement>("[data-depth]", root.current);
          const movers = flutuantes.map((el) => ({
            x: gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" }),
            depth: Number(el.dataset.depth ?? "1"),
          }));

          const nome = nomeRef.current;
          const foto = fotoRef.current;
          const nomeX = nome && gsap.quickTo(nome, "x", { duration: 0.8, ease: "power3.out" });
          const nomeY = nome && gsap.quickTo(nome, "y", { duration: 0.8, ease: "power3.out" });
          const fotoX = foto && gsap.quickTo(foto, "x", { duration: 0.6, ease: "power3.out" });
          const fotoY = foto && gsap.quickTo(foto, "y", { duration: 0.6, ease: "power3.out" });
          const spotX = spot && gsap.quickTo(spot, "x", { duration: 0.35, ease: "power2.out" });
          const spotY = spot && gsap.quickTo(spot, "y", { duration: 0.35, ease: "power2.out" });

          const onMove = (e: MouseEvent) => {
            const relX = e.clientX / window.innerWidth - 0.5;
            const relY = e.clientY / window.innerHeight - 0.5;

            movers.forEach((m) => {
              m.x(relX * 26 * m.depth);
              m.y(relY * 26 * m.depth);
            });
            fotoX?.(relX * 16);
            fotoY?.(relY * 10);
            nomeX?.(relX * -10);
            nomeY?.(relY * -6);

            if (nome && spotX && spotY) {
              const r = nome.getBoundingClientRect();
              spotX(((e.clientX - r.left) / r.width) * 1000);
              spotY(((e.clientY - r.top) / r.height) * 250);
            }
          };

          window.addEventListener("mousemove", onMove, { passive: true });
          return () => window.removeEventListener("mousemove", onMove);
        },
      );

      // ── Morph do nome: GABRIEL vira DIOGO letra a letra, e volta ───────
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const alvos = [textoBaseRef.current, textoAcesoRef.current];
        const driver = document.createElement("span");
        driver.textContent = NOME;
        const aplicar = () => {
          alvos.forEach((t) => {
            if (t) t.textContent = driver.textContent;
          });
          // O card da sidebar (e quem mais quiser) acompanha o morph.
          window.dispatchEvent(
            new CustomEvent("nome-morph", { detail: driver.textContent ?? "" }),
          );
        };

        const tl = gsap.timeline({ repeat: -1, delay: 5, repeatDelay: 6.5 });
        tl.to(driver, {
          duration: 1.9,
          scrambleText: { text: APELIDO, chars: "upperCase", speed: 0.28 },
          onUpdate: aplicar,
        }).to(
          driver,
          {
            duration: 1.9,
            scrambleText: { text: NOME, chars: "upperCase", speed: 0.28 },
            onUpdate: aplicar,
          },
          "+=3.2",
        );

        return () => {
          tl.kill();
          driver.textContent = NOME;
          aplicar();
        };
      });

      // ── Saída no scroll: o palco se recolhe pro canto esquerdo ─────────
      mm.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom 30%",
              scrub: 0.8,
            },
          });
          tl.to(
            nomeRef.current,
            { scale: 0.3, y: 170, transformOrigin: "left bottom", ease: "none" },
            0,
          )
            .to(fotoRef.current, { xPercent: -10, yPercent: 22, opacity: 0, ease: "none" }, 0)
            .to(
              gsap.utils.toArray<HTMLElement>("[data-depth]", root.current),
              { x: -200, y: 190, opacity: 0, stagger: 0.06, ease: "none" },
              0,
            )
            .to(
              gsap.utils.toArray<HTMLElement>(".hero-solto", root.current),
              { x: -80, y: 60, opacity: 0, stagger: 0.05, ease: "none" },
              0.08,
            );
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="topo" className="relative w-full overflow-hidden pb-16 pt-6 md:pt-10">
      <div className="relative mx-auto w-full max-w-[1500px] px-3 md:px-6">
        <div className="relative mx-auto w-full">
          {/* Nome gigante dourado: base apagada + camada acesa pelo holofote. */}
          <svg
            ref={nomeRef}
            viewBox="0 0 1000 250"
            className="block h-auto w-full select-none"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="holofote-grad">
                <stop offset="0%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
              </radialGradient>
              <mask id="holofote">
                <rect x="0" y="0" width="1000" height="250" fill="black" />
                <circle ref={spotRef} cx="0" cy="0" r="200" fill="url(#holofote-grad)" />
              </mask>
            </defs>
            <text
              ref={textoBaseRef}
              x="0"
              y="205"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 245, fill: OURO_BASE }}
            >
              {NOME}
            </text>
            <text
              ref={textoAcesoRef}
              x="0"
              y="205"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              mask="url(#holofote)"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 245, fill: OURO_ACESO }}
            >
              {NOME}
            </text>
          </svg>

          {/* Foto no CENTRO, na frente do nome, cruzando a nav. */}
          <div
            ref={fotoRef}
            className="pointer-events-none absolute left-1/2 z-10 aspect-[1122/1402]"
            style={{ width: "clamp(240px, 44%, 660px)", top: "-30%", transform: "translateX(-45.2%)" }}
          >
            <Image
              src="/fotominha.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 60vw, 44vw"
              className="object-contain"
              onLoad={() => ScrollTrigger.refresh()}
            />
          </div>

          <h1 className="sr-only">
            {perfil.nomeCompleto}, desenvolvedor full stack em {perfil.local}
          </h1>
          <p className="sr-only">{stats.map((s) => `${s.valor} ${s.rotulo}`).join(". ")}.</p>

          {/* Stat-cards flutuando sobre o nome, com parallax. */}
          <div className="pointer-events-none absolute inset-0 z-20 hidden md:block" aria-hidden>
            <div className="absolute left-[3%] top-[62%]" data-depth="1.4">
              <StatCard valor={stats[0].valor} rotulo={stats[0].rotulo} />
            </div>
            <div className="absolute right-[3%] top-[8%]" data-depth="0.8">
              <StatCard valor={stats[1].valor} rotulo={stats[1].rotulo} />
            </div>
          </div>
        </div>

        {/* Nav dividida em dois grupos, desviando da foto no centro. */}
        <nav className="hero-solto relative z-20 mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em]">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#historia" className="inline-block py-2 text-muted transition-colors hover:text-accent">
              Sobre mim
            </a>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#projetos" className="inline-block py-2 text-muted transition-colors hover:text-accent">
              Projetos
            </a>
            <a href="#trajetoria" className="inline-block py-2 text-muted transition-colors hover:text-accent">
              Trajetória
            </a>
            <a href="#contato" className="inline-block py-2 text-accent transition-colors hover:text-accent-hi">
              Contato
            </a>
          </div>
        </nav>

        {/* Headline no peito da foto, centrada. */}
        <div className="hero-solto relative z-20 mx-auto mt-6 flex max-w-3xl flex-col items-center text-center md:mt-2">
          <h2 className="font-display text-[clamp(2rem,5.2vw,3.9rem)] font-bold leading-[1.03] tracking-tight">
            Pego um problema e<br />
            não paro até{" "}
            <WordRotator words={palavrasHero} className="text-accent" />
          </h2>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <a
              ref={ctaRef}
              href="#contato"
              className="inline-block rounded-full bg-accent px-7 py-3.5 font-medium text-bg transition-colors hover:bg-accent-hi"
            >
              Falar comigo
            </a>
            <a
              ref={cta2Ref}
              href="#historia"
              className="inline-block rounded-full border border-border bg-bg/70 px-7 py-3.5 font-medium text-text backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
            >
              Minha história
            </a>
          </div>
        </div>

        {/* Rodapé do palco: tese à esquerda, chips à direita. */}
        <div className="hero-solto relative z-20 mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-sm">
            <p className="text-lg font-medium leading-snug">
              Calmo no processo,<br />
              <span className="text-accent">certeiro na entrega.</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {perfil.cargo} em {perfil.local}. Construo sistemas de ponta a
              ponta que gente de verdade usa todo dia.
            </p>
          </div>

          <ul className="flex max-w-md flex-wrap gap-2 md:justify-end">
            {chipsPerfil.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-accent/35 px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent transition-colors hover:bg-accent/10"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {/* Stats no mobile (no desktop flutuam sobre o nome). */}
        <div className="relative z-20 mt-10 grid grid-cols-2 gap-3 md:hidden" aria-hidden>
          {stats.map((s) => (
            <StatCard key={s.rotulo} valor={s.valor} rotulo={s.rotulo} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ valor, rotulo }: { valor: string; rotulo: string }) {
  return (
    <div className="pointer-events-auto rounded-2xl border border-border bg-surface/80 px-5 py-4 backdrop-blur-sm">
      <p className="font-display text-3xl font-semibold text-accent tnum">{valor}</p>
      <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
        {rotulo}
      </p>
    </div>
  );
}
