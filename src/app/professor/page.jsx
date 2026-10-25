import PainelProfessor from "@/components/telas/PainelProfessor";
import { gruposDeFiltro, listarAnos, listarDisciplinas, listarRoteiros, listarSolicitacoes } from "@/lib/dados";

export const metadata = {
  title: "Área do professor | Roteiros de Estudo",
};

export default function PaginaProfessor() {
  const roteiros = listarRoteiros();
  const solicitacoes = listarSolicitacoes();

  return (
    <PainelProfessor
      roteirosIniciais={roteiros}
      solicitacoesIniciais={solicitacoes}
      disciplinas={listarDisciplinas()}
      anos={listarAnos()}
      grupos={gruposDeFiltro([...roteiros, ...solicitacoes])}
    />
  );
}
