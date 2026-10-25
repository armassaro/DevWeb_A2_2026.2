import { formatarData } from "@/lib/formatos";
import Campo, { estiloCaixa } from "./Campo";

export default function DetalhesSolicitacao({ solicitacao }) {
  const linhas = [
    ["Professor(a)", solicitacao.nome],
    ["E-mail", solicitacao.email],
    ["Disciplina", solicitacao.disciplina?.nome],
    ["Ano", solicitacao.rotuloAno],
    ["Tema", solicitacao.tema],
    ["Quantidade de questões", solicitacao.qtdQuestoes],
    ["Data de uso", formatarData(solicitacao.dataUso)],
    ["Solicitado em", formatarData(solicitacao.criadoEm)],
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-marinho">Pedido de roteiro</h2>
      {linhas.map(([rotulo, valor]) => (
        <Campo key={rotulo} rotulo={rotulo}>
          <p className={`${estiloCaixa} break-words`}>{valor}</p>
        </Campo>
      ))}
      <p className="text-sm text-gray-600">O roteiro será gerado pela ferramenta de IA e passará por revisão antes de ser publicado.</p>
    </div>
  );
}
