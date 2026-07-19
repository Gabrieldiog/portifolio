import { Hero } from "@/components/hero";
import { Historia } from "@/components/historia";
import { Sistemas } from "@/components/sistemas";
import { Projetos } from "@/components/projetos";
import { Trajetoria } from "@/components/trajetoria";
import { Formacao } from "@/components/formacao";
import { Contato } from "@/components/contato";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Historia />
        <Sistemas />
        <Projetos />
        <Trajetoria />
        <Formacao />
      </main>
      <Contato />
    </>
  );
}
