"use client";

import dynamic from "next/dynamic";
import { exigir } from "@/lib/props";

// Só baixa a barra de busca e os filtros quando o bloco for usado nesse formato
const SearchBar = dynamic(() => import("./SearchBar"), {
  loading: () => <div className="h-[76px] w-full animate-pulse rounded-full bg-white/10" />,
});
const FilterOptions = dynamic(() => import("./FilterOptions"));

export default function Bloco({ conteudo, aoBuscar }) {
  exigir("Bloco", Array.isArray(conteudo) && [1, 2].includes(conteudo.length), "conteudo deve ser um array com 1 ou 2 itens");

  if (conteudo.length === 1) {
    exigir("Bloco", typeof conteudo[0] === "string", "com um item só, ele precisa ser um texto");
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
