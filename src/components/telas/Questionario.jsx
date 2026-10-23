"use client";

import Link from "next/link";
import { useState } from "react";
import Alternativa from "../Alternativa";
import BarraProgresso from "../BarraProgresso";
import Bloco from "../Bloco";
import Botao from "../Botao";
import GraficoPizza from "../GraficoPizza";
import { IconeEstrela } from "../Icones";
import ItemResultado from "../ItemResultado";

function respostasVazias(total) {
  return Array.from({ length: total }, () => []);
}

export default function Questionario({ roteiro }) {
  const { questoes } = roteiro;
  const total = questoes.length;

  const [atual, setAtual] = useState(0);
  const [respostas, setRespostas] = useState(() => respostasVazias(total));
  const [marcadas, setMarcadas] = useState([]);
  const [finalizado, setFinalizado] = useState(false);
  const [aviso, setAviso] = useState("");

  const questao = questoes[atual];
  const selecionadas = respostas[atual];
  const ehUltima = atual === total - 1;

  function setSelecionadas(novas) {
    setAviso("");
    setRespostas(respostas.map((r, i) => (i === atual ? novas : r)));
  }

  function alternarMarcada() {
    setMarcadas(marcadas.includes(atual) ? marcadas.filter((m) => m !== atual) : [...marcadas, atual]);
  }

  function avancar() {
    if (selecionadas.length === 0) {
      setAviso("Escolha uma alternativa antes de continuar.");
      return;
    }
    if (ehUltima) setFinalizado(true);
    else setAtual(atual + 1);
  }

  function voltar() {
    setAviso("");
    setAtual(atual - 1);
  }

  function reiniciar() {
    setAtual(0);
    setRespostas(respostasVazias(total));
    setMarcadas([]);
    setAviso("");
    setFinalizado(false);
  }

  const cabecalho = (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
      <p className="text-sm text-gray-600">
        Questionário · <strong className="text-marinho">{roteiro.titulo}</strong> ({roteiro.disciplina}, {roteiro.ano})
      </p>
      <Link href="/" className="text-sm text-navbar underline">
        Voltar aos roteiros
      </Link>
    </div>
  );

  if (finalizado) {
    const acertos = questoes.filter((q, i) => respostas[i][0] === q.resposta).length;
    const proporcao = acertos / total;

    return (
      <>
        {cabecalho}
        <Bloco conteudo={[`Você terminou o questionário "${roteiro.titulo}". Confira abaixo como foi em cada questão.`]} />

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <GraficoPizza
            titulo="Resultados"
            dados={{
              Acertos: { cor: "#172554", porcentagem: proporcao },
              Erros: { cor: "#d9d9d9", porcentagem: 1 - proporcao },
            }}
          />
          <ul className="max-h-[420px] space-y-4 overflow-y-auto pr-2" aria-label="Resultado por questão">
            {questoes.map((q, i) => (
              <ItemResultado
                key={i}
                numero={i + 1}
                enunciado={q.enunciado}
                respostaAluno={q.alternativas[respostas[i][0]]}
                respostaCorreta={q.alternativas[q.resposta]}
                acertou={respostas[i][0] === q.resposta}
                marcada={marcadas.includes(i)}
              />
            ))}
          </ul>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-gray-300 pt-6 text-marinho">
          <p>
            <span className="block text-4xl font-bold">{Math.round(proporcao * 100)}%</span>
            <span className="text-sm">de acertos</span>
          </p>
          <p className="text-right">
            <span className="block text-4xl font-bold">
              {acertos}/{total}
            </span>
            <span className="text-sm">questões certas</span>
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Botao texto="Reiniciar questionário" acao={reiniciar} />
        </div>
      </>
    );
  }

  return (
    <>
      {cabecalho}
      <Bloco conteudo={[`Questão ${atual + 1}: ${questao.enunciado}`]} />

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={alternarMarcada}
          aria-pressed={marcadas.includes(atual)}
          className="flex items-center gap-2 text-sm font-semibold uppercase text-marinho hover:opacity-70"
        >
          <IconeEstrela preenchida={marcadas.includes(atual)} className="h-6 w-6 text-estrela" />
          Marcar pergunta
        </button>
      </div>

      <fieldset className="mt-2">
        <legend className="mb-4 text-sm font-semibold uppercase text-marinho">Alternativas</legend>
        <div role="radiogroup" className="space-y-4 sm:px-8">
          {questao.alternativas.map((texto, indice) => (
            <Alternativa key={`${atual}-${indice}`} texto={texto} indice={indice} selecao={[selecionadas, setSelecionadas]} />
          ))}
        </div>
      </fieldset>

      {aviso && (
        <p role="alert" className="mt-4 text-center text-sm text-red-700">
          {aviso}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-4 sm:justify-center sm:gap-10">
        <Botao texto="Voltar" acao={voltar} desabilitado={atual === 0} />
        <BarraProgresso atual={atual} total={total} />
        <Botao texto={ehUltima ? "Finalizar" : "Avançar"} acao={avancar} />
      </div>
    </>
  );
}
