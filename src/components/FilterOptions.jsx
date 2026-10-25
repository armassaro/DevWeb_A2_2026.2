"use client";

import { exigir, ehEstado } from "@/lib/props";

export default function FilterOptions({ opcoes }) {
  exigir("FilterOptions", Array.isArray(opcoes) && ehEstado(opcoes[0]), "o primeiro item deve ser [selecionadas, setSelecionadas]");
  exigir(
    "FilterOptions",
    opcoes.slice(1).every((grupo) => Array.isArray(grupo) && grupo.every((o) => typeof o === "string")),
    "os grupos de opções devem ser arrays de strings"
  );
  const [[selecionadas, setSelecionadas], ...grupos] = opcoes;

  function alternar(opcao) {
    setSelecionadas((atuais) =>
      atuais.includes(opcao) ? atuais.filter((o) => o !== opcao) : [...atuais, opcao]
    );
  }

  return (
    <div className="flex flex-wrap gap-x-10 gap-y-4">
      {grupos.map((grupo, indice) => (
        <ul key={indice} className="space-y-1.5">
          {grupo.map((opcao) => {
            const marcada = selecionadas.includes(opcao);
            return (
              <li key={opcao}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={marcada}
                  onClick={() => alternar(opcao)}
                  className="flex items-center gap-2 text-sm font-semibold uppercase text-white hover:opacity-80 cursor-pointer"
                >
                  <span
                    className={`h-3.5 w-3.5 shrink-0 rounded-[3px] border border-white transition-colors duration-200 ${
                      marcada ? "bg-white" : "bg-transparent"
                    }`}
                  />
                  {opcao}
                </button>
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
}
