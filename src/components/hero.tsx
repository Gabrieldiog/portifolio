"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { perfil, chipsPerfil, palavrasHero } from "@/lib/dados";
import { WordRotator } from "@/components/word-rotator";
import { useMagnetic } from "@/hooks/use-magnetic";

const NOME = perfil.nomeGigante; // GABRIEL
const APELIDO = "DIOGO";

// Dourado iluminado: base + camada acesa pelo holofote.
const OURO_BASE = "#c99a12";
const OURO_ACESO = "#ffdd66";

const stats = [
  { valor: "3+", rotulo: "anos de experiência" },
  { valor: "15+", rotulo: "sistemas construídos" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const nomeRef = useRef<SVGSVGElement>(null);
  const medidaRef = useRef<SVGTextElement>(null);
  const textoBaseRef = useRef<SVGTextElement>(null);
  const textoAcesoRef = useRef<SVGTextElement>(null);
  const fotoPosRef = useRef<HTMLDivElement>(null);
  const fotoRef = useRef<HTMLDivElement>(null);
  const fotoNitidaRef = useRef<HTMLDivElement>(null);
  const fotoBorradaRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<SVGCircleElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>();
  const cta2Ref = useMagnetic<HTMLAnchorElement>();

  // A foto fica cravada no vão entre o B e o R: mede a largura real dos
  // glifos num texto ESTÁTICO invisível (o morph não contamina) e alinha o
  // centro da CABEÇA (47,7% do PNG, medido no alfa) nesse vão.
  useEffect(() => {
    const posicionar = () => {
      const texto = medidaRef.current;
      const foto = fotoPosRef.current;
      if (!texto || !foto) return;
      try {
        const total = texto.getSubStringLength(0, NOME.length);
        const ateB = texto.getSubStringLength(0, 3); // G, A, B
        const frac = ateB / total;
        if (frac > 0.3 && frac < 0.65) foto.style.left = `${frac * 100}%`;
      } catch {
        /* fonte ainda não pronta; fonts.ready/resize tentam de novo */
      }
    };
    document.fonts.ready.then(posicionar);
    window.addEventListener("resize", posicionar);
    return () => window.removeEventListener("resize", posicionar);
  }, []);

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

          const foto = fotoRef.current; // camada interna: nunca a posição
          const fotoX = foto && gsap.quickTo(foto, "x", { duration: 0.6, ease: "power3.out" });
          const fotoY = foto && gsap.quickTo(foto, "y", { duration: 0.6, ease: "power3.out" });
          const spotX = spot && gsap.quickTo(spot, "x", { duration: 0.35, ease: "power2.out" });
          const spotY = spot && gsap.quickTo(spot, "y", { duration: 0.35, ease: "power2.out" });

          const onMove = (e: MouseEvent) => {
            const relX = e.clientX / window.innerWidth - 0.5;
            const relY = e.clientY / window.innerHeight - 0.5;

            movers.forEach((m) => {
              m.x(relX * 24 * m.depth);
              m.y(relY * 24 * m.depth);
            });
            fotoX?.(relX * 14);
            fotoY?.(relY * 9);

            const nome = nomeRef.current;
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

      // ── O VOO: hero preso, cada peça voa pro lugar EXATO da sidebar ────
      // Os alvos são os elementos reais da sidebar da seção seguinte
      // ([data-fly-target]); origem e alvo medidos no MESMO tick (o scroll
      // se cancela) e o -historiaStart projeta o alvo pra onde ele estará
      // quando a Historia pinar. No fim do pin, troca por visibilidade:
      // fantasmas somem, sidebar real assume no mesmo pixel.
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const historiaStart = () => ScrollTrigger.getById("historia-pin")?.start ?? 0;

        const alvoDe = (sel: string) => document.querySelector<HTMLElement>(sel);
        const voo = (fonte: Element | null, sel: string, comEscala = false) => ({
          x: () => {
            const t = alvoDe(sel);
            if (!fonte || !t) return 0;
            return t.getBoundingClientRect().left - fonte.getBoundingClientRect().left + 14;
          },
          y: () => {
            const t = alvoDe(sel);
            if (!fonte || !t) return 0;
            return (
              t.getBoundingClientRect().top -
              fonte.getBoundingClientRect().top -
              historiaStart() +
              6
            );
          },
          ...(comEscala
            ? {
                scale: () => {
                  const t = alvoDe(sel);
                  const h = fonte?.getBoundingClientRect().height;
                  if (!t || !h) return 1;
                  return t.getBoundingClientRect().height / h;
                },
              }
            : {}),
        });

        const q = gsap.utils.selector(root);
        const linksVoo: [string, string][] = [
          ['a[href="#historia"]', "#alvo-menu-sobre"],
          ['a[href="#projetos"]', "#alvo-menu-projetos"],
          ['a[href="#trajetoria"]', "#alvo-menu-trajetoria"],
        ];
        const voadores = () =>
          [
            nomeRef.current,
            ctaRef.current,
            ...linksVoo.map(([sel]) => q(sel)[0]),
            ...q("[data-fly]"),
          ].filter(Boolean) as HTMLElement[];
        const alvosReais = () => gsap.utils.toArray<HTMLElement>("[data-fly-target]");

        // Fantasmas ↔ sidebar real: troca instantânea no handoff.
        const troca = (entregue: boolean) => {
          gsap.set(voadores(), { autoAlpha: entregue ? 0 : 1 });
          gsap.set(alvosReais(), { autoAlpha: entregue ? 1 : 0 });
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "hero-flight",
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.4}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            onEnter: () => gsap.set(voadores(), { willChange: "transform, opacity" }),
            onLeaveBack: () => gsap.set(voadores(), { willChange: "auto" }),
            onLeave: () => {
              gsap.set(voadores(), { willChange: "auto" });
              troca(true);
            },
            onEnterBack: () => troca(false),
          },
        });

        // Estado inicial da troca depende de onde a página carregou.
        requestAnimationFrame(() => {
          troca((tl.scrollTrigger?.progress ?? 0) >= 1);
        });

        // 0→0.15: respiro (nada se move).
        tl.to({}, { duration: 0.15 }, 0);

        // Dispersão de quem não tem pouso na sidebar.
        tl.to(
          gsap.utils.toArray<HTMLElement>(".hero-solto", root.current),
          { opacity: 0, y: 36, stagger: 0.03, ease: "power2.in", duration: 0.2 },
          0.15,
        );

        // O nome gigante voa virando o logo da sidebar.
        if (nomeRef.current) {
          tl.to(
            nomeRef.current,
            { ...voo(nomeRef.current, "#alvo-logo", true), ease: "power2.inOut", duration: 0.6 },
            0.15,
          );
        }

        // A foto: crossfade pra camada borrada (blur FIXO, nunca animado) e some.
        tl.to(fotoNitidaRef.current, { opacity: 0, ease: "power2.in", duration: 0.35 }, 0.18);
        tl.fromTo(
          fotoBorradaRef.current,
          { opacity: 0 },
          { opacity: 0.9, ease: "sine.out", duration: 0.3 },
          0.2,
        );
        tl.to(fotoRef.current, { x: -90, y: -40, ease: "power2.inOut", duration: 0.5 }, 0.2);
        tl.to(fotoPosRef.current, { autoAlpha: 0, ease: "power1.in", duration: 0.15 }, 0.7);

        // Links da nav em cascata diagonal pros itens do menu real.
        linksVoo.forEach(([sel, alvo], i) => {
          const el = q(sel)[0];
          if (!el) return;
          tl.to(el, { ...voo(el, alvo), ease: "power3.out", duration: 0.32 }, 0.28 + i * 0.06);
        });

        // Stat-cards pousam nas metades do card de stats da sidebar.
        const statEls = q("[data-fly]");
        statEls.forEach((el, i) => {
          tl.to(
            el,
            {
              x: () => {
                const t = alvoDe("#alvo-stats");
                if (!t) return 0;
                const r = t.getBoundingClientRect();
                return r.left + (i === 0 ? 10 : r.width / 2) - el.getBoundingClientRect().left;
              },
              y: () => {
                const t = alvoDe("#alvo-stats");
                if (!t) return 0;
                return (
                  t.getBoundingClientRect().top -
                  el.getBoundingClientRect().top -
                  historiaStart() +
                  8
                );
              },
              scale: 0.82,
              ease: "power3.out",
              duration: 0.34,
            },
            0.3 + i * 0.06,
          );
        });

        // O CTA pousa por último, com respiro.
        if (ctaRef.current) {
          tl.to(
            ctaRef.current,
            { ...voo(ctaRef.current, "#alvo-cta"), ease: "back.out(1.5)", duration: 0.25 },
            0.6,
          );
        }

        // 0.85→1: buffer parado (absorve o atraso do scrub antes da troca).
        tl.to({}, { duration: 0.15 }, 0.85);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="topo" className="relative w-full overflow-hidden pb-16 pt-6 md:pt-10">
      <div className="relative mx-auto w-full max-w-[1500px] px-3 md:px-6">
        <div className="relative mx-auto w-full">
          {/* Nome gigante dourado: base + camada acesa pelo holofote. */}
          <svg
            ref={nomeRef}
            viewBox="0 0 1000 250"
            className="block h-auto w-full select-none"
            style={{ transformBox: "fill-box", transformOrigin: "0% 0%" }}
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
              ref={medidaRef}
              x="0"
              y="205"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              opacity="0"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 245 }}
            >
              {NOME}
            </text>
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

          {/* Foto cravada no vão B|R: a div EXTERNA posiciona; a INTERNA leva
              parallax e o crossfade nítida/borrada (blur fixo em camada). */}
          <div
            ref={fotoPosRef}
            className="pointer-events-none absolute z-10 aspect-[1122/1402]"
            style={{ width: "clamp(240px, 44%, 660px)", top: "-62%", left: "49%", transform: "translateX(-47.7%)" }}
          >
            <div ref={fotoRef} className="absolute inset-0">
              <div ref={fotoNitidaRef} className="absolute inset-0">
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
              <div ref={fotoBorradaRef} className="absolute inset-0 opacity-0 blur-2xl">
                <Image
                  src="/fotominha.png"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 60vw, 44vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <h1 className="sr-only">
            {perfil.nomeCompleto}, desenvolvedor full stack em {perfil.local}
          </h1>
          <p className="sr-only">{stats.map((s) => `${s.valor} ${s.rotulo}`).join(". ")}.</p>

          {/* Stat-cards flutuando sobre o nome, com parallax; voam pra sidebar. */}
          <div className="pointer-events-none absolute inset-0 z-20 hidden md:block" aria-hidden>
            <div className="absolute left-[3%] top-[62%]" data-depth="1.4" data-fly="stat-0">
              <StatCard valor={stats[0].valor} rotulo={stats[0].rotulo} />
            </div>
            <div className="absolute right-[3%] top-[8%]" data-depth="0.8" data-fly="stat-1">
              <StatCard valor={stats[1].valor} rotulo={stats[1].rotulo} />
            </div>
          </div>
        </div>

        {/* Nav dividida em dois grupos, desviando da foto no centro. */}
        <nav className="hero-nav relative z-20 mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em]">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#historia" className="inline-block py-2 text-muted transition-colors hover:text-accent">
              Sobre mim
            </a>
            <a href="#projetos" className="inline-block py-2 text-muted transition-colors hover:text-accent">
              Projetos
            </a>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#trajetoria" className="inline-block py-2 text-muted transition-colors hover:text-accent">
              Trajetória
            </a>
            <a href="#contato" className="hero-solto inline-block py-2 text-accent transition-colors hover:text-accent-hi">
              Contato
            </a>
          </div>
        </nav>

        {/* Headline no peito da foto, centrada. */}
        <div className="relative z-20 mx-auto mt-6 flex max-w-3xl flex-col items-center text-center md:mt-2">
          <h2 className="hero-solto font-display text-[clamp(2rem,5.2vw,3.9rem)] font-bold leading-[1.03] tracking-tight">
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
              className="hero-solto inline-block rounded-full border border-border bg-bg/70 px-7 py-3.5 font-medium text-text backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
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
