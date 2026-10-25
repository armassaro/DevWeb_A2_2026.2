"use client";

import { useState } from "react";
import { formatarData } from "@/lib/formatos";
import { dataMinimaUso, DOMINIO_EMAIL, MAX_QUESTOES, MIN_QUESTOES, validarSolicitacao } from "@/lib/validacao";
import Botao from "./Botao";
import Campo, { estiloEntrada } from "./Campo";

const VAZIO = { nome: "", email: "", disciplinaId: "", ano: "", tema: "", qtdQuestoes: "", dataUso: "" };

export default function FormSolicitacao({ disciplinas, anos, aoEnviar, aoFechar }) {
  const [campos, setCampos] = useState(VAZIO);
  const [erros, setErros] = useState({});
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [enviado, setEnviado] = useState(null);

  function alterar(e) {
    const novos = { ...campos, [e.target.name]: e.target.value };
    setCampos(novos);
    // Depois da primeira tentativa, os erros acompanham a digitação
    if (tentouEnviar) setErros(validarSolicitacao(novos));
  }

  function enviar(e) {
    e.preventDefault();
    const encontrados = validarSolicitacao(campos);
    setTentouEnviar(true);
    setErros(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    const solicitacao = {
      ...campos,
      nome: campos.nome.trim(),
      email: campos.email.trim().toLowerCase(),
      tema: campos.tema.trim(),
      ano: Number(campos.ano),
      qtdQuestoes: Number(campos.qtdQuestoes),
    };
    aoEnviar(solicitacao);
    setEnviado(solicitacao);
  }

  function novaSolicitacao() {
    setCampos(VAZIO);
    setErros({});
    setTentouEnviar(false);
    setEnviado(null);
  }

  if (enviado) {
    const disciplina = disciplinas.find((d) => d.id === enviado.disciplinaId);
    return (
      <div role="status" className="space-y-4">
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-emerald-900">
          <p className="font-semibold">Pedido registrado com sucesso!</p>
          <p className="text-sm">
            Roteiro de {disciplina?.nome} ({enviado.ano}º ano) sobre &quot;{enviado.tema}&quot;, com {enviado.qtdQuestoes}{" "}
            questões, para uso em {formatarData(enviado.dataUso)}. Ele já aparece na lista de solicitados.
          </p>
        </div>
        <p className="text-sm text-gray-600">
          Por enquanto o pedido fica apenas nesta página; nenhum dado é enviado para um servidor.
        </p>
        <div className="flex flex-wrap justify-end gap-3">
          <Botao texto="Fazer outro pedido" variante="secundario" acao={novaSolicitacao} />
          <Botao texto="Fechar" acao={aoFechar} />
        </div>
      </div>
    );
  }

  const quantidadeErros = Object.keys(erros).length;
  const propsErro = (campo) => ({
    "aria-invalid": Boolean(erros[campo]),
    "aria-describedby": erros[campo] ? `${campo}-erro` : undefined,
  });

  return (
    <form onSubmit={enviar} noValidate className="space-y-4">
      <h2 className="text-lg font-semibold text-marinho">Solicitar roteiro</h2>

      {tentouEnviar && quantidadeErros > 0 && (
        <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          Confira {quantidadeErros === 1 ? "o campo destacado" : `os ${quantidadeErros} campos destacados`} antes de enviar.
        </p>
      )}

      <Campo rotulo="Nome" htmlFor="nome" erro={erros.nome}>
        <input id="nome" name="nome" value={campos.nome} onChange={alterar} autoComplete="name" className={estiloEntrada} {...propsErro("nome")} />
      </Campo>

      <Campo rotulo="E-mail institucional" htmlFor="email" erro={erros.email}>
        <input
          id="email"
          name="email"
          type="email"
          value={campos.email}
          onChange={alterar}
          placeholder={`nome${DOMINIO_EMAIL}`}
          autoComplete="email"
          className={estiloEntrada}
          {...propsErro("email")}
        />
      </Campo>

      <div className="grid gap-4 sm:grid-cols-2">
        <Campo rotulo="Disciplina" htmlFor="disciplinaId" erro={erros.disciplinaId}>
          <select id="disciplinaId" name="disciplinaId" value={campos.disciplinaId} onChange={alterar} className={estiloEntrada} {...propsErro("disciplinaId")}>
            <option value="">Selecione</option>
            {disciplinas.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nome}
              </option>
            ))}
          </select>
        </Campo>

        <Campo rotulo="Ano da turma" htmlFor="ano" erro={erros.ano}>
          <select id="ano" name="ano" value={campos.ano} onChange={alterar} className={estiloEntrada} {...propsErro("ano")}>
            <option value="">Selecione</option>
            {anos.map((a) => (
              <option key={a.valor} value={a.valor}>
                {a.rotulo}
              </option>
            ))}
          </select>
        </Campo>
      </div>

      <Campo rotulo="Tema" htmlFor="tema" erro={erros.tema}>
        <input id="tema" name="tema" value={campos.tema} onChange={alterar} maxLength={120} className={estiloEntrada} {...propsErro("tema")} />
      </Campo>

      <div className="grid gap-4 sm:grid-cols-2">
        <Campo rotulo={`Quantidade de questões (${MIN_QUESTOES} a ${MAX_QUESTOES})`} htmlFor="qtdQuestoes" erro={erros.qtdQuestoes}>
          <input
            id="qtdQuestoes"
            name="qtdQuestoes"
            type="number"
            min={MIN_QUESTOES}
            max={MAX_QUESTOES}
            value={campos.qtdQuestoes}
            onChange={alterar}
            className={estiloEntrada}
            {...propsErro("qtdQuestoes")}
          />
        </Campo>

        <Campo rotulo="Data de uso" htmlFor="dataUso" erro={erros.dataUso}>
          <input
            id="dataUso"
            name="dataUso"
            type="date"
            min={dataMinimaUso()}
            value={campos.dataUso}
            onChange={alterar}
            className={estiloEntrada}
            {...propsErro("dataUso")}
          />
        </Campo>
      </div>
      <p className="text-xs text-gray-500">A revisão do roteiro leva uma semana, então a data precisa ter 7 dias de antecedência.</p>

      <div className="flex justify-end gap-3 pt-2">
        <Botao texto="Cancelar" variante="secundario" acao={aoFechar} />
        <Botao texto="Enviar pedido" tipo="submit" />
      </div>
    </form>
  );
}
