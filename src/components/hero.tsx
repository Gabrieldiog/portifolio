import Image from "next/image";
import { perfil } from "@/lib/dados";

const stats = [
  { valor: "3+", rotulo: "anos de experiência" },
  { valor: "40", rotulo: "pessoas usando · 2 estados" },
];

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-[130px]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-16 md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:px-10 md:pb-28 md:pt-24">
        <div className="relative order-2 md:order-1">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {perfil.cargo} · {perfil.local}
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.05rem,7vw,5rem)] font-semibold leading-[0.99] tracking-tight text-balance">
            Pego um problema e não paro até{" "}
            <em className="italic text-accent">resolver</em>.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            Sou tranquilo no jeito e teimoso no problema. Construo sistemas de
            ponta a ponta — back-end, front-end e banco — que gente de verdade
            usa todo dia.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href="#contato"
              className="rounded-full bg-accent px-6 py-3 font-medium text-bg transition-colors hover:bg-accent-hi"
            >
              Falar comigo
            </a>
            <a
              href="#sistemas"
              className="rounded-full border border-border px-6 py-3 font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
              Ver os sistemas
            </a>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-line pt-8">
            {stats.map((s) => (
              <div key={s.rotulo}>
                <p className="font-display text-3xl font-semibold text-accent tnum">
                  {s.valor}
                </p>
                <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">
                  {s.rotulo}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-[19rem] md:order-2 md:max-w-none">
          <div
            aria-hidden
            className="absolute inset-x-4 bottom-0 top-8 rounded-[2rem] bg-gradient-to-b from-accent/12 to-transparent"
          />
          <Image
            src="/fotominha.png"
            alt="Gabriel Diogo, desenvolvedor full stack"
            width={900}
            height={1150}
            priority
            className="relative z-10 mx-auto h-auto w-full object-contain [mask-image:linear-gradient(to_bottom,black_84%,transparent)]"
          />
        </div>
      </div>
    </section>
  );
}
