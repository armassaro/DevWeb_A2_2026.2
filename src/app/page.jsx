import ExplorarRoteiros from "@/components/telas/ExplorarRoteiros";
import { gruposDeFiltro, listarRoteiros, ultimaAtualizacao } from "@/lib/dados";

export default function Home() {
  const roteiros = listarRoteiros("publicado");

  return <ExplorarRoteiros roteiros={roteiros} grupos={gruposDeFiltro(roteiros)} ultimaAtualizacao={ultimaAtualizacao()} />;
}
