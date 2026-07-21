"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { perfil, palavrasHero, chipsPerfil } from "@/lib/dados";
import { WordRotator } from "@/components/word-rotator";
import { MOBILE_MOTION } from "@/lib/breakpoints";

// Hero dedicado ao celular (ref: heynesh.com no mobile). A PESSOA é o centro:
// nome gigante atrás (aceso, trocando GABRIEL↔DIOGO), foto grande no meio, os
// stats flutuando no topo e os chips numa nuvem no rodapé do palco. Tudo num
// grid de uma célula (filhos em grid-area 1/1), empilhados por z-index.
const NOME = perfil.nomeGigante; // GABRIEL

const stats = [
  { valor: "3+", rotulo: "anos de código" },
  { valor: "15+", rotulo: "sistemas profissionais" },
];

export function HeroMobile() {
  const root = useRef<HTMLDivElement>(null);
  const nomeRef = useRef<HTMLParagraphElement>(null);

  // Morph GABRIEL↔DIOGO: o palco (palco-sobre) roda o scramble e dispara o
  // evento "nome-morph"; aqui a gente só acompanha o texto.
  useEffect(() => {
    const onMorph = (e: Event) => {
      const t = (e as CustomEvent<string>).detail;
      if (nomeRef.current && t) nomeRef.current.textContent = t;
    };
    window.addEventListener("nome-morph", onMorph);
    return () => window.removeEventListener("nome-morph", onMorph);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOBILE_MOTION, () => {
        const palco = root.current?.querySelector<HTMLElement>(".hm-palco");
        if (!palco) return;

        ScrollTrigger.saveStyles(".hm-nome, .hm-foto, .hm-card");

        // Entrada (no load): a cena se monta.
        gsap.from(".hm-nome", { autoAlpha: 0, scale: 1.06, duration: 1, ease: "power2.out" });
        gsap.from(".hm-foto", { autoAlpha: 0, yPercent: 8, duration: 0.9, ease: "power2.out", delay: 0.05 });
        gsap.from(".hm-card", {
          autoAlpha: 0,
          scale: 0.7,
          y: 18,
          duration: 0.7,
          ease: "back.out(1.6)",
          stagger: 0.09,
          delay: 0.25,
        });

        // Parallax por scrub (só transform): o nome anda mais que a foto
        // (profundidade); cards e chips derivam e somem ao rolar.
        const st = (end: string) => ({
          trigger: palco,
          start: "top top",
          end,
          scrub: 0.6,
          invalidateOnRefresh: true,
        });
        gsap.to(".hm-nome", { yPercent: -24, ease: "none", scrollTrigger: st("bottom top") });
        gsap.to(".hm-foto", { yPercent: -6, ease: "none", scrollTrigger: st("bottom top") });
        gsap.to(".hm-card", { yPercent: -46, autoAlpha: 0, ease: "none", stagger: 0.02, scrollTrigger: st("55% top") });

        // A frase entra (o indicador de rolagem virou global e fixo — ScrollCue).
        gsap.from(".hm-frase", { autoAlpha: 0, y: 20, duration: 0.8, ease: "power2.out", delay: 0.5 });

        // Respiração idle dos cards (num wrapper, pra não brigar com o parallax).
        gsap.utils.toArray<HTMLElement>(".hm-card-idle").forEach((c, i) => {
          gsap.to(c, {
            yPercent: i % 2 ? -6 : 6,
            rotation: i % 2 ? 1.5 : -1.5,
            duration: 2 + i * 0.35,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });

        // Headline + CTAs revelam ao entrar.
        gsap.from(".hm-abaixo > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".hm-abaixo", start: "top 88%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="block lg:hidden">
      <h1 className="sr-only">
        {perfil.nomeCompleto}, {perfil.cargo} em {perfil.local}
      </h1>

      {/* Palco 100svh: nome atrás (z0) / foto no centro (z10) / cards + chips (z20). */}
      <div className="hm-palco relative grid min-h-[100svh] place-items-center overflow-clip pt-[max(1.5rem,env(safe-area-inset-top))] [&>*]:[grid-area:1/1]">
        <p
          ref={nomeRef}
          aria-hidden
          className="hm-nome z-0 mt-[21svh] select-none self-start justify-self-center whitespace-nowrap text-center font-display font-bold leading-[0.8] tracking-[-0.045em] text-[#c99a12]"
          style={{ fontSize: "clamp(4rem,27vw,9rem)" }}
        >
          {NOME}
        </p>

        <div className="hm-foto relative z-10 h-[72svh] w-[90vw] max-w-[430px] self-end justify-self-center">
          <Image
            src="/fotominha.png"
            alt=""
            fill
            priority
            sizes="90vw"
            className="object-cover object-top [filter:drop-shadow(0_26px_40px_rgba(0,0,0,0.55))] [mask-image:linear-gradient(to_bottom,#000_74%,transparent)]"
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>

        {/* Os traços num card à esquerda (ref heynesh: a lista de qualidades). */}
        <div className="hm-card z-20 translate-y-[10svh] self-center justify-self-start pl-3">
          <div className="hm-card-idle rounded-2xl border border-white/15 bg-bg/60 px-3.5 py-3 backdrop-blur-md">
            <ul className="flex flex-col gap-[0.42rem]">
              {chipsPerfil.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-2 whitespace-nowrap font-mono text-[0.58rem] uppercase tracking-[0.05em] text-text/90"
                >
                  <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats à direita. */}
        <div className="hm-card z-20 self-start justify-self-end pr-3 pt-[5%]">
          <div className="hm-card-idle">
            <GlassStat valor={stats[0].valor} rotulo={stats[0].rotulo} />
          </div>
        </div>
        <div className="hm-card z-20 self-start justify-self-end pr-3 pt-[27%]">
          <div className="hm-card-idle">
            <GlassStat valor={stats[1].valor} rotulo={stats[1].rotulo} />
          </div>
        </div>

        {/* A frase, no rodapé do palco (onde estavam os chips). */}
        <div className="hm-frase z-20 w-full self-end justify-self-center px-6 pb-[13svh] text-center [text-shadow:0_2px_22px_rgba(0,0,0,0.65)]">
          <h2 className="font-display text-[clamp(1.7rem,6.8vw,2.5rem)] font-bold leading-[1.08] tracking-tight">
            Pego um problema e<br />
            não paro até{" "}
            <WordRotator words={palavrasHero} className="text-accent" />
          </h2>
        </div>

      </div>

      {/* Abaixo do palco: os CTAs. */}
      <div className="hm-abaixo mx-auto max-w-xl px-6 pb-16 pt-8 text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#contato"
            className="inline-block rounded-full bg-accent px-7 py-3.5 font-medium text-bg transition-colors hover:bg-accent-hi"
          >
            Falar comigo
          </a>
          <a
            href="#historia"
            className="inline-block rounded-full border border-border bg-bg/70 px-7 py-3.5 font-medium text-text backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
          >
            Minha história
          </a>
        </div>
      </div>
    </div>
  );
}

function GlassStat({ valor, rotulo }: { valor: string; rotulo: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-bg/55 px-4 py-3 backdrop-blur-md">
      <p className="font-display text-2xl font-semibold text-accent tnum">{valor}</p>
      <p className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted">{rotulo}</p>
    </div>
  );
}
