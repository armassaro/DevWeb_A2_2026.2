"use client";

import { useState } from "react";
import { validarAvaliacao } from "@/lib/validacao";
import Botao from "./Botao";
import Campo, { estiloEntrada } from "./Campo";
import { IconeRelogio } from "./Icones";
import SeloIA from "./SeloIA";

export default function FormAvaliacao({ roteiro, aoCancelar, aoAprovar }) {
  const [campos, setCampos] = useState({
    titulo: roteiro.titulo,
    tema: roteiro.tema,
    descricao: roteiro.descricao,
    tempoEstimado: String(roteiro.tempoEstimado),
    fonteExterna: roteiro.fonteExterna,
  });
  const [erros, setErros] = useState({});

  function alterar(e) {
    setCampos({ ...campos, [e.target.name]: e.target.value });
  }

  function aprovar(e) {
    e.preventDefault();
    const encontrados = validarAvaliacao(campos);
    setErros(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    aoAprovar({
      ...roteiro,
      titulo: campos.titulo.trim(),
      tema: campos.tema.trim(),
      descricao: campos.descricao.trim(),
      tempoEstimado: Number(campos.tempoEstimado),
      fonteExterna: campos.fonteExterna.trim(),
    });
  }

  const propsErro = (campo) => ({
    "aria-invalid": Boolean(erros[campo]),
    "aria-describedby": erros[campo] ? `${campo}-erro` : undefined,
  });

  return (
    <form onSubmit={aprovar} noValidate className="space-y-4">
      <h2 className="text-lg font-semibold text-marinho">Avaliar roteiro</h2>
      <p className="text-sm text-gray-600">
        {roteiro.disciplina?.nome} · {roteiro.rotuloAno}
      </p>

      <Campo rotulo="Título" htmlFor="titulo" erro={erros.titulo}>
        <input id="titulo" name="titulo" value={campos.titulo} onChange={alterar} className={estiloEntrada} {...propsErro("titulo")} />
      </Campo>
      <Campo rotulo="Tema" htmlFor="tema" erro={erros.tema}>
        <input id="tema" name="tema" value={campos.tema} onChange={alterar} className={estiloEntrada} {...propsErro("tema")} />
      </Campo>
      <Campo rotulo="Descrição" htmlFor="descricao" erro={erros.descricao}>
        <textarea
          id="descricao"
          name="descricao"
          rows={6}
          value={campos.descricao}
          onChange={alterar}
          className={`${estiloEntrada} resize-y`}
          {...propsErro("descricao")}
        />
      </Campo>
      <Campo rotulo="Tempo estimado (minutos)" htmlFor="tempoEstimado" erro={erros.tempoEstimado} icone={<IconeRelogio className="h-5 w-5 text-marinho" />}>
        <input
          id="tempoEstimado"
          name="tempoEstimado"
          type="number"
          min={5}
          max={180}
          value={campos.tempoEstimado}
          onChange={alterar}
          className={estiloEntrada}
          {...propsErro("tempoEstimado")}
        />
      </Campo>
      <Campo rotulo="Link externo" htmlFor="fonteExterna" erro={erros.fonteExterna}>
        <input
          id="fonteExterna"
          name="fonteExterna"
          type="url"
          value={campos.fonteExterna}
          onChange={alterar}
          className={estiloEntrada}
          {...propsErro("fonteExterna")}
        />
      </Campo>

      <details className="rounded-lg border border-gray-200 p-3">
        <summary className="cursor-pointer font-medium text-marinho">Questões geradas ({roteiro.questoes.length})</summary>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-gray-800">
          {roteiro.questoes.map((q, i) => (
            <li key={i}>
              {q.enunciado}
              <span className="block text-gray-500">Resposta: {q.alternativas[q.resposta]}</span>
            </li>
          ))}
        </ol>
      </details>

      <SeloIA professor={roteiro.professor} atualizadoEm={roteiro.atualizadoEm} revisado={false} />

      <div className="flex justify-end gap-3 pt-2">
        <Botao texto="Cancelar" variante="secundario" acao={aoCancelar} />
        <Botao texto="Aprovar" tipo="submit" />
      </div>
    </form>
  );
}
