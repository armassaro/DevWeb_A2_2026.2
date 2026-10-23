"use client";

import { useState } from "react";
import Botao from "./Botao";
import Campo, { estiloEntrada } from "./Campo";

const DOMINIO_EMAIL = "@escola.educa.gov.br";
const MIN_QUESTOES = 3;
const MAX_QUESTOES = 10;
const DIAS_ANTECEDENCIA = 7;

const VAZIO = { nome: "", email: "", disciplina: "", ano: "", tema: "", qtdQuestoes: "", dataUso: "" };

// "2026-10-01" -> "01/10/2026"
function formatarData(iso) {
  return iso.split("-").reverse().join("/");
}

// Primeira data aceita para uso: hoje + 7 dias, no formato "2026-10-01"
function dataMinimaUso() {
  const data = new Date();
  data.setDate(data.getDate() + DIAS_ANTECEDENCIA);
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${data.getFullYear()}-${mes}-${dia}`;
}

function validar(campos) {
  const erros = {};

  const nome = campos.nome.trim();
  if (nome.length < 3) erros.nome = "Informe seu nome completo.";
  else if (!/^[A-Za-zÀ-ÿ' ]+$/.test(nome)) erros.nome = "O nome deve ter apenas letras.";

  const email = campos.email.trim().toLowerCase();
  const usuario = email.slice(0, -DOMINIO_EMAIL.length);
  if (!email) erros.email = "Informe o e-mail institucional.";
  else if (!email.endsWith(DOMINIO_EMAIL) || !/^[a-z0-9._-]+$/.test(usuario)) {
    erros.email = `Use o e-mail institucional, terminado em ${DOMINIO_EMAIL}.`;
  }

  if (!campos.disciplina) erros.disciplina = "Escolha a disciplina.";
  if (!campos.ano) erros.ano = "Escolha o ano da turma.";
  if (campos.tema.trim().length < 3) erros.tema = "Descreva o tema (mínimo de 3 letras).";

  const quantidade = Number(campos.qtdQuestoes);
  if (
    campos.qtdQuestoes === "" ||
    !Number.isInteger(quantidade) ||
    quantidade < MIN_QUESTOES ||
    quantidade > MAX_QUESTOES
  ) {
    erros.qtdQuestoes = `A quantidade deve ser entre ${MIN_QUESTOES} e ${MAX_QUESTOES} questões.`;
  }

  const minima = dataMinimaUso();
  if (!campos.dataUso) erros.dataUso = "Informe a data em que vai usar o roteiro.";
  else if (campos.dataUso < minima) {
    erros.dataUso = `A revisão leva 7 dias: escolha a partir de ${formatarData(minima)}.`;
  }

  return erros;
}

export default function FormSolicitacao({ disciplinas, anos, aoEnviar, aoFechar }) {
  const [campos, setCampos] = useState(VAZIO);
  const [erros, setErros] = useState({});
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [enviado, setEnviado] = useState(null);

  function alterar(e) {
    const novos = { ...campos, [e.target.name]: e.target.value };
    setCampos(novos);
    // Depois da primeira tentativa, os erros acompanham a digitação
    if (tentouEnviar) setErros(validar(novos));
  }

  function enviar(e) {
    e.preventDefault();
    const encontrados = validar(campos);
    setTentouEnviar(true);
    setErros(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    const solicitacao = {
      ...campos,
      nome: campos.nome.trim(),
      email: campos.email.trim().toLowerCase(),
      tema: campos.tema.trim(),
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
    return (
      <div role="status" className="space-y-4">
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-emerald-900">
          <p className="font-semibold">Pedido registrado com sucesso!</p>
          <p className="text-sm">
            Roteiro de {enviado.disciplina} ({enviado.ano}) sobre &quot;{enviado.tema}&quot;, com {enviado.qtdQuestoes}{" "}
            questões, para uso em {formatarData(enviado.dataUso)}. Ele já aparece na lista de solicitados.
          </p>
        </div>
        <p className="text-sm text-gray-600">Por enquanto o pedido fica apenas nesta página e some ao recarregar.</p>
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
        <Campo rotulo="Disciplina" htmlFor="disciplina" erro={erros.disciplina}>
          <select id="disciplina" name="disciplina" value={campos.disciplina} onChange={alterar} className={estiloEntrada} {...propsErro("disciplina")}>
            <option value="">Selecione</option>
            {disciplinas.map((disciplina) => (
              <option key={disciplina} value={disciplina}>
                {disciplina}
              </option>
            ))}
          </select>
        </Campo>

        <Campo rotulo="Ano da turma" htmlFor="ano" erro={erros.ano}>
          <select id="ano" name="ano" value={campos.ano} onChange={alterar} className={estiloEntrada} {...propsErro("ano")}>
            <option value="">Selecione</option>
            {anos.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
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
