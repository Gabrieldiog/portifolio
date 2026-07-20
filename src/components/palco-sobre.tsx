"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { perfil, chipsPerfil, palavrasHero, historia } from "@/lib/dados";
import { WordRotator } from "@/components/word-rotator";
import { useMagnetic } from "@/hooks/use-magnetic";
import { SidebarSobre } from "@/components/sidebar-sobre";

const NOME = perfil.nomeGigante; // GABRIEL
const APELIDO = "DIOGO";

// Dourado iluminado: base + camada acesa pelo holofote.
const OURO_BASE = "#c99a12";
const OURO_ACESO = "#ffdd66";

const stats = [
  { valor: "3+", rotulo: "anos de experiência" },
  { valor: "15+", rotulo: "sistemas construídos" },
];

// Quanto do scroll (em viewports) cada fase ocupa.
const EXIT = 1.5; // voo + montagem da sidebar + chegada do "Sobre mim"

// UM PALCO SÓ: hero, sidebar e capítulos vivem na MESMA seção pinada, com
// uma timeline única. As peças do hero voam, a sidebar REAL se monta em cena
// e nunca mais se move; o "Sobre mim" chega e os capítulos rodam com a linha
// do tempo. Sem troca de seção, sem menu sumindo.
export function PalcoSobre() {
  const root = useRef<HTMLElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const sobreLayerRef = useRef<HTMLDivElement>(null);

  const nomeRef = useRef<SVGSVGElement>(null);
  const medidaRef = useRef<SVGTextElement>(null);
  const textoBaseRef = useRef<SVGTextElement>(null);
  const textoAcesoRef = useRef<SVGTextElement>(null);
  const fotoPosRef = useRef<HTMLDivElement>(null);
  const fotoRef = useRef<HTMLDivElement>(null);
  const fotoNitidaRef = useRef<HTMLDivElement>(null);
  const fotoBorradaRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<SVGCircleElement>(null);
  const nomeVooRef = useRef<HTMLDivElement>(null);
  const fotoDriftRef = useRef<HTMLDivElement>(null);
  const linhaSvgRef = useRef<SVGSVGElement>(null);
  const olRef = useRef<HTMLOListElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null); // o voo cuida dele; imã só no cta2
  const cta2Ref = useMagnetic<HTMLAnchorElement>();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const linhaRef = useRef<SVGPathElement>(null);
  const pontoRef = useRef<SVGCircleElement>(null);

  // Foto cravada no vão B|R: mede os glifos num texto estático invisível
  // (o morph não contamina) e alinha o centro da cabeça (47,7% do PNG).
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
        /* fonte ainda não pronta */
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

          const foto = fotoRef.current;
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

      // ── A timeline mestra do palco ─────────────────────────────────────
      mm.add(
        {
          isDesktop: "(min-width: 900px) and (min-height: 800px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };
          if (!isDesktop || reduceMotion) return;

          const heroLayer = heroLayerRef.current;
          const sobreLayer = sobreLayerRef.current;
          const sidebar = sidebarRef.current;
          if (!heroLayer || !sobreLayer || !sidebar) return;

          // No pin, as duas camadas se sobrepõem num palco de 1 viewport.
          gsap.set(root.current, { height: "100vh", overflow: "hidden" });
          gsap.set([heroLayer, sobreLayer], {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100vh",
          });
          gsap.set(sobreLayer, { zIndex: 30, pointerEvents: "none" });

          const cartoes = gsap.utils.toArray<HTMLElement>(".sobre-card", sidebar);
          const cards = cardRefs.current.filter((el): el is HTMLLIElement => el !== null);
          const header = headerRef.current;
          const linha = linhaRef.current;
          const ponto = pontoRef.current;
          const caps = cards.length - 1;
          const TOTAL = EXIT + caps;

          // Estados iniciais da camada Sobre.
          if (linhaSvgRef.current) gsap.set(linhaSvgRef.current, { autoAlpha: 0 });
          if (olRef.current) gsap.set(olRef.current, { display: "block", height: "34rem" });
          gsap.set(cartoes, { autoAlpha: 0, y: 26 });
          if (header) gsap.set(header, { autoAlpha: 0, y: 40 });
          gsap.set(cards, { position: "absolute", inset: 0, margin: "auto" });
          gsap.set(cards, { autoAlpha: 0, x: -110, y: 90 });

          const alvoDe = (sel: string) => sidebar.querySelector<HTMLElement>(sel);
          const voo = (fonte: Element | null, sel: string, comEscala = false) => ({
            x: () => {
              const t = alvoDe(sel);
              if (!fonte || !t) return 0;
              return t.getBoundingClientRect().left - fonte.getBoundingClientRect().left + 12;
            },
            y: () => {
              const t = alvoDe(sel);
              if (!fonte || !t) return 0;
              return t.getBoundingClientRect().top - fonte.getBoundingClientRect().top - 22;
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

          const q = gsap.utils.selector(heroLayer);
          const linksVoo: [string, string][] = [
            ['a[href="#historia"]', ".alvo-menu-sobre"],
            ['a[href="#projetos"]', ".alvo-menu-projetos"],
            ['a[href="#trajetoria"]', ".alvo-menu-trajetoria"],
          ];

          const tl = gsap.timeline({
            scrollTrigger: {
              id: "palco-sobre",
              trigger: root.current,
              start: "top top",
              end: () => `+=${TOTAL * window.innerHeight}`,
              scrub: 0.8,
              pin: true,
              anticipatePin: 1,
              fastScrollEnd: true,
              preventOverlaps: true,
              invalidateOnRefresh: true,
              snap: { snapTo: "labels", duration: 0.4, ease: "power1.inOut" },
            },
          });

          // ---- FASE 1: o voo e a montagem da sidebar [0 → EXIT] ----------
          tl.addLabel("inicio", 0);
          tl.to({}, { duration: 0.15 }, 0); // respiro

          tl.to(
            gsap.utils.toArray<HTMLElement>(".hero-solto", heroLayer),
            { autoAlpha: 0, y: 36, stagger: 0.03, ease: "power2.in", duration: 0.2 },
            0.15,
          );

          if (nomeVooRef.current) {
            tl.to(
              nomeVooRef.current,
              {
                ...voo(nomeVooRef.current, ".alvo-logo", true),
                transformOrigin: "0% 0%",
                ease: "power2.inOut",
                duration: 0.55,
              },
              0.15,
            );
            tl.to(nomeVooRef.current, { autoAlpha: 0, duration: 0.08, ease: "none" }, 0.66);
          }

          tl.to(fotoNitidaRef.current, { opacity: 0, ease: "power2.in", duration: 0.35 }, 0.18);
          tl.fromTo(
            fotoBorradaRef.current,
            { opacity: 0 },
            { opacity: 0.9, ease: "sine.out", duration: 0.3 },
            0.2,
          );
          tl.to(fotoDriftRef.current, { x: -90, y: -40, ease: "power2.inOut", duration: 0.5 }, 0.2);
          tl.to(fotoPosRef.current, { autoAlpha: 0, ease: "power1.in", duration: 0.15 }, 0.62);

          // A sidebar BONITA se monta em cena, card a card.
          cartoes.forEach((card, i) => {
            tl.to(card, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.12 }, 0.55 + i * 0.07);
          });

          linksVoo.forEach(([sel, alvo], i) => {
            const el = q(sel)[0];
            if (!el) return;
            tl.to(el, { ...voo(el, alvo), ease: "power3.out", duration: 0.32 }, 0.28 + i * 0.06);
            tl.to(el, { autoAlpha: 0, duration: 0.08, ease: "none" }, 0.76 + i * 0.03);
          });

          const statEls = q("[data-fly]");
          statEls.forEach((el, i) => {
            tl.to(
              el,
              {
                x: () => {
                  const t = alvoDe(".alvo-stats");
                  if (!t) return 0;
                  const r = t.getBoundingClientRect();
                  return r.left + (i === 0 ? 10 : r.width / 2) - el.getBoundingClientRect().left;
                },
                y: () => {
                  const t = alvoDe(".alvo-stats");
                  if (!t) return 0;
                  return t.getBoundingClientRect().top - el.getBoundingClientRect().top - 20;
                },
                scale: 0.82,
                ease: "power3.out",
                duration: 0.34,
              },
              0.3 + i * 0.06,
            );
            tl.to(el, { autoAlpha: 0, duration: 0.08, ease: "none" }, 0.72 + i * 0.03);
          });

          if (ctaRef.current) {
            tl.to(
              ctaRef.current,
              { ...voo(ctaRef.current, ".alvo-cta"), ease: "back.out(1.4)", duration: 0.25 },
              0.55,
            );
            tl.to(ctaRef.current, { autoAlpha: 0, duration: 0.08, ease: "none" }, 0.9);
          }

          // A camada Sobre acorda pro palco dos capítulos (e o hero dorme):
          // interação e seleção de texto passam pra quem está visível.
          tl.set(sobreLayer, { pointerEvents: "auto" }, EXIT - 0.25);
          tl.set(heroLayer, { pointerEvents: "none" }, EXIT - 0.25);
          if (linhaSvgRef.current) {
            tl.to(linhaSvgRef.current, { autoAlpha: 1, duration: 0.2 }, EXIT - 0.35);
          }

          // O "Sobre mim (&) minha jornada" já vem dando as caras.
          if (header) {
            tl.to(header, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.25 }, EXIT - 0.45);
          }

          // O primeiro capítulo entra pela diagonal fechando a fase.
          if (cards[0]) {
            tl.to(cards[0], { autoAlpha: 1, x: 0, y: 0, ease: "power2.out", duration: 0.3 }, EXIT - 0.3);
          }

          // ---- FASE 2: os capítulos [EXIT → TOTAL] -----------------------
          if (linha) {
            gsap.set(linha, { strokeDasharray: 100, strokeDashoffset: 100 });
            tl.to(linha, { strokeDashoffset: 0, duration: caps, ease: "none" }, EXIT);
          }
          if (ponto && linha) {
            tl.to(
              ponto,
              {
                motionPath: { path: linha, align: linha, alignOrigin: [0.5, 0.5] },
                duration: caps,
                ease: "none",
              },
              EXIT,
            );
          }

          // O "Sobre mim (&) minha jornada" fica visível por quase toda a
          // seção e some DURANTE o último capítulo — totalmente apagado bem
          // antes do fim do pin (senão pode piscar sobre os projetos ao
          // despinar em rolagem rápida).
          if (header) {
            tl.to(header, { autoAlpha: 0, y: -36, duration: 0.5 }, EXIT + caps - 1);
          }

          cards.forEach((el, i) => {
            if (i > 0) {
              tl.to(cards[i - 1], { autoAlpha: 0, x: 110, y: -90, duration: 0.38 }, EXIT + i - 1);
              tl.to(el, { autoAlpha: 1, x: 0, y: 0, duration: 0.38 }, EXIT + i - 0.38);
            }
            tl.addLabel(`cap-${i}`, EXIT + i);
          });

          // Âncora #historia: com o pin, o id aponta pro topo da página;
          // intercepta e rola pro ponto da timeline onde o Sobre existe.
          const st = tl.scrollTrigger;
          const irPraHistoria = (e: Event) => {
            e.preventDefault();
            if (!st) return;
            gsap.to(window, {
              scrollTo: st.labelToScroll("cap-0"),
              duration: 1,
              ease: "power2.inOut",
            });
          };
          const ancoras = Array.from(
            document.querySelectorAll<HTMLAnchorElement>('a[href="#historia"]'),
          );
          ancoras.forEach((a) => a.addEventListener("click", irPraHistoria));

          return () => {
            ancoras.forEach((a) => a.removeEventListener("click", irPraHistoria));
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="topo" className="relative w-full overflow-hidden">
      {/* ── CAMADA HERO ─────────────────────────────────────────────────── */}
      <div ref={heroLayerRef} className="relative w-full pb-16 pt-6 md:pt-10">
        <div className="relative mx-auto w-full max-w-[1500px] px-3 md:px-6">
          <div className="relative mx-auto w-full">
            <div ref={nomeVooRef} style={{ transformOrigin: "0% 0%" }}>
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
            </div>

            {/* Foto cravada no vão B|R (externa posiciona, interna anima). */}
            <div
              ref={fotoPosRef}
              className="pointer-events-none absolute z-10 aspect-[1122/1402]"
              style={{ width: "clamp(240px, 44%, 660px)", top: "-62%", left: "49%", transform: "translateX(-47.7%)" }}
            >
              <div ref={fotoDriftRef} className="absolute inset-0">
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
            </div>

            <h1 className="sr-only">
              {perfil.nomeCompleto}, desenvolvedor full stack em {perfil.local}
            </h1>
            <p className="sr-only">{stats.map((s) => `${s.valor} ${s.rotulo}`).join(". ")}.</p>

            <div className="pointer-events-none absolute inset-0 z-20 hidden md:block" aria-hidden>
              <div className="absolute left-[3%] top-[62%]" data-fly="stat-0">
                <div data-depth="1.4">
                  <StatCard valor={stats[0].valor} rotulo={stats[0].rotulo} />
                </div>
              </div>
              <div className="absolute right-[3%] top-[8%]" data-fly="stat-1">
                <div data-depth="0.8">
                  <StatCard valor={stats[1].valor} rotulo={stats[1].rotulo} />
                </div>
              </div>
            </div>
          </div>

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

          <div className="relative z-20 mt-10 grid grid-cols-2 gap-3 md:hidden" aria-hidden>
            {stats.map((s) => (
              <StatCard key={s.rotulo} valor={s.valor} rotulo={s.rotulo} />
            ))}
          </div>
        </div>
      </div>

      {/* ── CAMADA SOBRE (sidebar + capítulos) ──────────────────────────── */}
      <div ref={sobreLayerRef} id="historia" className="relative w-full">
        <p className="absolute left-6 top-8 z-10 font-mono text-xs uppercase tracking-[0.2em] text-accent min-[900px]:hidden">
          Minha história
        </p>

        <div className="mx-auto grid min-h-screen w-full max-w-[1500px] items-center gap-10 px-6 py-20 min-[900px]:h-full min-[900px]:grid-cols-[300px_1fr] min-[900px]:px-10 min-[900px]:py-0">
          {/* A sidebar REAL: se monta em cena e nunca mais se move. */}
          <div ref={sidebarRef} className="hidden min-[900px]:block">
            <SidebarSobre />
          </div>

          {/* Palco dos capítulos: linha do tempo + cards. */}
          <div className="relative flex min-h-[70vh] flex-col items-center justify-center min-[900px]:h-full min-[900px]:min-h-0">
            <div ref={headerRef} className="relative z-10 mb-10 w-full max-w-xl self-start min-[900px]:mb-12">
              <p className="inline-block rounded-full border border-accent/40 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">
                Do interior pro código
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-5xl">
                Sobre mim (&amp;)
                <br />
                minha jornada
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted">
                A história de como as automações de uma fazenda viraram profissão.
                Mais fácil mostrar do que explicar.
              </p>
            </div>

            <svg
              ref={linhaSvgRef}
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full min-[900px]:block"
            >
              {/* Trilha completa sempre visível; o progresso acende por cima. */}
              <path
                d="M -4 108 C 30 96, 40 78, 50 50 S 72 12, 104 -6"
                fill="none"
                stroke="var(--color-accent)"
                strokeOpacity="0.16"
                strokeWidth="0.4"
              />
              <path
                ref={linhaRef}
                d="M -4 108 C 30 96, 40 78, 50 50 S 72 12, 104 -6"
                pathLength={100}
                fill="none"
                stroke="var(--color-accent)"
                strokeOpacity="0.9"
                strokeWidth="0.55"
              />
              <circle ref={pontoRef} r="1.1" fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth="0.4" />
            </svg>

            {/* Fallback sem pin: cards empilhados. */}
            <ol ref={olRef} className="relative z-10 flex w-full max-w-xl flex-col gap-6">
              {historia.map((cap, i) => (
                <li
                  key={cap.marcador}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="flex h-fit flex-col gap-4 rounded-3xl border border-border bg-surface-2/90 p-7 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm md:p-9"
                >
                  <p className="font-display text-6xl font-bold leading-none text-accent md:text-7xl">
                    {cap.marcador}
                  </p>
                  <h3 className="font-display text-2xl font-semibold leading-tight md:text-3xl">
                    {cap.titulo}
                  </h3>
                  <p className="leading-relaxed text-muted">{cap.texto}</p>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">
                    Capítulo {String(i + 1).padStart(2, "0")} · {String(historia.length).padStart(2, "0")}
                  </p>
                </li>
              ))}
            </ol>
          </div>
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
