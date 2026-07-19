import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Sistemas } from "@/components/sistemas";
import { Trajetoria } from "@/components/trajetoria";
import { Sobre } from "@/components/sobre";
import { Contato } from "@/components/contato";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Sistemas />
        <Trajetoria />
        <Sobre />
      </main>
      <Contato />
    </>
  );
}
