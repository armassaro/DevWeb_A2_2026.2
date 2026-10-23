"use client";

import Botao from "./Botao";
import Campo, { estiloCaixa } from "./Campo";
import { IconeRelogio } from "./Icones";
import SeloIA from "./SeloIA";

function formatarMinutos(minutos) {
  if (minutos < 60) return `${minutos} minutos`;
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  return resto ? `${horas}h ${resto}min` : `${horas}h`;
}

export default function DetalhesRoteiro({ roteiro, mostrarQuestionario = true }) {
  const publicado = roteiro.status === "publicado";

  function abrirQuestionario() {
    window.open(`/questionario/${roteiro.id}/`, "_blank", "noopener");
  }

  return (
    <div className="space-y-4">
      <Campo rotulo="Título">
        <p className={estiloCaixa}>{roteiro.titulo}</p>
      </Campo>
      <Campo rotulo="Tema">
        <p className={estiloCaixa}>{roteiro.tema}</p>
      </Campo>
      <Campo rotulo="Disciplina e ano">
        <p className={estiloCaixa}>
          {roteiro.disciplina} · {roteiro.ano}
        </p>
      </Campo>
      <Campo rotulo="Descrição">
        <p className={`${estiloCaixa} min-h-36`}>{roteiro.descricao}</p>
      </Campo>
      <Campo rotulo="Tempo estimado" icone={<IconeRelogio className="h-5 w-5 text-marinho" />}>
        <p className={estiloCaixa}>{formatarMinutos(roteiro.tempoEstimado)}</p>
      </Campo>
      <Campo rotulo="Link externo">
        <a
          href={roteiro.fonteExterna}
          target="_blank"
          rel="noopener noreferrer"
          className={`${estiloCaixa} block truncate text-navbar underline`}
        >
          {roteiro.fonteExterna}
        </a>
      </Campo>
      <Campo rotulo="Questionário">
        <p className={estiloCaixa}>{roteiro.qtdQuestoes} questões de fixação com correção</p>
      </Campo>

      <SeloIA professor={roteiro.professor} atualizadoEm={roteiro.atualizadoEm} revisado={publicado} />

      {mostrarQuestionario && publicado && (
        <div className="flex justify-end pt-2">
          <Botao texto="Fazer questionário" acao={abrirQuestionario} />
        </div>
      )}
    </div>
  );
}
