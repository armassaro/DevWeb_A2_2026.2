import roteiros from "@/data/roteiros.json";
import disciplinas from "@/data/disciplinas.json";
import professores from "@/data/professores.json";
import escolas from "@/data/escolas.json";
import anos from "@/data/anos.json";
import solicitacoes from "@/data/solicitacoes.json";

// Para incluir uma nova turma (ex.: 5º ano) basta acrescentar em data/anos.json
export function listarAnos() {
  return anos;
}

export function listarDisciplinas() {
  return disciplinas;
}

export function rotuloAno(valor) {
  const ano = anos.find((a) => a.valor === Number(valor));
  return ano ? ano.rotulo : `${valor}º ano`;
}

function buscarProfessor(id) {
  const professor = professores.find((p) => p.id === id);
  if (!professor) return null;
  return {
    ...professor,
    disciplina: disciplinas.find((d) => d.id === professor.disciplinaId) ?? null,
    escola: escolas.find((e) => e.id === professor.escolaId) ?? null,
  };
}

// Junta o roteiro com as entidades relacionadas (disciplina, professor revisor e escola)
export function montarRoteiro(roteiro) {
  const dataReferencia = roteiro.publicadoEm ?? roteiro.atualizadoEm;
  return {
    ...roteiro,
    disciplina: disciplinas.find((d) => d.id === roteiro.disciplinaId) ?? null,
    professor: buscarProfessor(roteiro.professorId),
    rotuloAno: rotuloAno(roteiro.ano),
    anoLancamento: dataReferencia.slice(0, 4),
  };
}

export function montarSolicitacao(solicitacao) {
  return {
    ...solicitacao,
    titulo: solicitacao.tema,
    disciplina: disciplinas.find((d) => d.id === solicitacao.disciplinaId) ?? null,
    rotuloAno: rotuloAno(solicitacao.ano),
    anoLancamento: solicitacao.criadoEm.slice(0, 4),
  };
}

export function listarRoteiros(status) {
  const lista = status ? roteiros.filter((r) => r.status === status) : roteiros;
  return lista.map(montarRoteiro);
}

export function buscarRoteiro(id) {
  const roteiro = roteiros.find((r) => r.id === id);
  return roteiro ? montarRoteiro(roteiro) : null;
}

export function listarSolicitacoes() {
  return solicitacoes.map(montarSolicitacao);
}

export function ultimaAtualizacao() {
  return roteiros
    .filter((r) => r.status === "publicado")
    .map((r) => r.atualizadoEm)
    .sort()
    .at(-1);
}

// Opções dos filtros no formato esperado pelo componente FilterOptions
export function gruposDeFiltro(itens) {
  const lancamentos = [...new Set(itens.map((i) => i.anoLancamento))].sort();
  return {
    anos: anos.map((a) => a.rotulo),
    disciplinas: disciplinas.map((d) => d.nome),
    lancamentos,
  };
}

function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Dentro de um mesmo grupo as opções somam (OU); entre grupos diferentes, restringem (E)
export function filtrarItens(itens, selecionadas, termo, grupos) {
  const ativas = (grupo) => grupo.filter((opcao) => selecionadas.includes(opcao));
  const anosAtivos = ativas(grupos.anos);
  const disciplinasAtivas = ativas(grupos.disciplinas);
  const lancamentosAtivos = ativas(grupos.lancamentos);
  const busca = normalizar(termo.trim());

  return itens.filter(
    (item) =>
      (anosAtivos.length === 0 || anosAtivos.includes(item.rotuloAno)) &&
      (disciplinasAtivas.length === 0 || disciplinasAtivas.includes(item.disciplina?.nome)) &&
      (lancamentosAtivos.length === 0 || lancamentosAtivos.includes(item.anoLancamento)) &&
      (busca === "" || normalizar(`${item.tema} ${item.titulo}`).includes(busca))
  );
}
