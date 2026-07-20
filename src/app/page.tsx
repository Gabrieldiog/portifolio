import { PalcoSobre } from "@/components/palco-sobre";
import { Projetos } from "@/components/projetos";
import { Trajetoria } from "@/components/trajetoria";
import { Formacao } from "@/components/formacao";
import { Contato } from "@/components/contato";

export default function Home() {
  return (
    <>
      <main>
        <PalcoSobre />
        <Projetos />
        <Trajetoria />
        <Formacao />
      </main>
      <Contato />
    </>
  );
}
