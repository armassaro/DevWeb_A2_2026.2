"use client";

import { useId } from "react";
import { exigir, ehEstado } from "@/lib/props";
import { IconeFechar, IconeLupa } from "./Icones";

export const LIMITE_BUSCA = 300;

export default function SearchBar({ estado, aoBuscar }) {
  exigir("SearchBar", ehEstado(estado) && typeof estado[0] === "string", "estado deve ser [texto, setTexto, textoSuperior?]");
  const [texto, setTexto, textoSuperior = "Buscar por tema"] = estado;
  const id = useId();

  function buscar() {
    aoBuscar?.(texto.trim());
  }

  function limpar() {
    setTexto("");
    aoBuscar?.("");
  }

  return (
    <div className="w-full min-w-0">
      <label htmlFor={id} className="mb-2 block text-sm font-semibold uppercase tracking-wide text-white">
        {textoSuperior}
      </label>
      <div className="flex items-center gap-2">
        <div className="flex h-12 min-w-0 flex-1 items-center gap-2 rounded-full border border-white/40 bg-white/60 px-4 text-gray-800">
          <button type="button" onClick={buscar} aria-label="Pesquisar" className="shrink-0 hover:opacity-70">
            <IconeLupa />
          </button>
          <input
            id={id}
            type="search"
            value={texto}
            maxLength={LIMITE_BUSCA}
            placeholder="Pesquisar"
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscar()}
            className="h-full min-w-0 flex-1 truncate bg-transparent outline-none placeholder:text-gray-600"
          />
        </div>
        <button
          type="button"
          onClick={limpar}
          aria-label="Limpar busca"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/60 text-gray-900 hover:opacity-70"
        >
          <IconeFechar />
        </button>
      </div>
    </div>
  );
}
