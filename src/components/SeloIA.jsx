import { formatarData } from "@/lib/formatos";

export default function SeloIA({ professor, atualizadoEm, revisado = true }) {
  return (
    <div className="rounded-lg border border-navbar/30 bg-navbar/5 p-3 text-sm text-gray-800">
      <p className="mb-1 flex items-center gap-2 font-semibold text-marinho">
        <span className="rounded bg-marinho px-1.5 py-0.5 text-xs font-bold text-white">IA</span>
        Conteúdo gerado por inteligência artificial
      </p>
      {professor && (
        <p>
          {revisado ? "Revisado por" : "Aguardando revisão de"} <strong>Prof. {professor.nome}</strong>
          {professor.disciplina && ` (${professor.disciplina.nome})`}
          {professor.escola && ` — ${professor.escola.nome}`}
        </p>
      )}
      <p className="text-gray-600">Última atualização: {formatarData(atualizadoEm)}</p>
    </div>
  );
}
