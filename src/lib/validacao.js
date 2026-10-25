import { dataISO, formatarData } from "./formatos";

export const DOMINIO_EMAIL = "@escola.educa.gov.br";
export const MIN_QUESTOES = 3;
export const MAX_QUESTOES = 10;
export const DIAS_ANTECEDENCIA = 7;

export function dataMinimaUso(hoje = new Date()) {
  const data = new Date(hoje);
  data.setDate(data.getDate() + DIAS_ANTECEDENCIA);
  return dataISO(data);
}

export function validarSolicitacao(campos, hoje = new Date()) {
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

  if (!campos.disciplinaId) erros.disciplinaId = "Escolha a disciplina.";
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

  const minima = dataMinimaUso(hoje);
  if (!campos.dataUso) erros.dataUso = "Informe a data em que vai usar o roteiro.";
  else if (campos.dataUso < minima) {
    erros.dataUso = `A revisão leva 7 dias: escolha a partir de ${formatarData(minima)}.`;
  }

  return erros;
}

export function validarAvaliacao(campos) {
  const erros = {};
  if (campos.titulo.trim().length < 3) erros.titulo = "O título é obrigatório.";
  if (campos.tema.trim().length < 3) erros.tema = "O tema é obrigatório.";
  if (campos.descricao.trim().length < 20) erros.descricao = "A descrição precisa ter pelo menos 20 caracteres.";

  const tempo = Number(campos.tempoEstimado);
  if (!Number.isInteger(tempo) || tempo < 5 || tempo > 180) {
    erros.tempoEstimado = "Informe um tempo entre 5 e 180 minutos.";
  }

  if (!/^https?:\/\/\S+\.\S+/.test(campos.fonteExterna.trim())) {
    erros.fonteExterna = "Informe um link válido, começando com http:// ou https://.";
  }
  return erros;
}
