"use client";

import dynamic from "next/dynamic";

// Só baixa a barra de busca e os filtros quando o bloco for usado nesse formato
const SearchBar = dynamic(() => import("./SearchBar"), {
  loading: () => <div className="h-[76px] w-full animate-pulse rounded-full bg-white/10" />,
});
const FilterOptions = dynamic(() => import("./FilterOptions"));

function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Aplica os filtros e a busca do bloco. Dentro de um mesmo grupo as opções somam (OU); entre grupos diferentes, restringem (E)
export function filtrarItens(itens, selecionadas, termo, grupos) {
  const ativas = (grupo) => grupo.filter((opcao) => selecionadas.includes(opcao));
  const anosAtivos = ativas(grupos.anos);
  const disciplinasAtivas = ativas(grupos.disciplinas);
  const lancamentosAtivos = ativas(grupos.lancamentos);
  const busca = normalizar(termo.trim());

  return itens.filter(
    (item) =>
      (anosAtivos.length === 0 || anosAtivos.includes(item.ano)) &&
      (disciplinasAtivas.length === 0 || disciplinasAtivas.includes(item.disciplina)) &&
      (lancamentosAtivos.length === 0 || lancamentosAtivos.includes(item.anoLancamento)) &&
      (busca === "" || normalizar(`${item.tema} ${item.titulo ?? ""}`).includes(busca))
  );
}

export default function Bloco({ conteudo, aoBuscar }) {
  if (conteudo.length === 1) {
    return (
      <section className="w-full break-words rounded-2xl bg-marinho px-5 py-4 text-white sm:text-lg">
        {conteudo[0]}
      </section>
    );
  }

  const [filtros, busca] = conteudo;
  return (
    <section className="grid w-full grid-cols-1 gap-6 rounded-2xl bg-marinho p-5 sm:p-6 md:min-h-64 md:grid-cols-2 md:items-center">
      <div className="order-2 flex min-w-0 justify-center md:order-1">
        <FilterOptions opcoes={filtros} />
      </div>
      <div className="order-1 min-w-0 md:order-2 md:min-w-64">
        <SearchBar estado={busca} aoBuscar={aoBuscar} />
      </div>
    </section>
  );
}
