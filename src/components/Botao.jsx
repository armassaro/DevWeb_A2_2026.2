"use client";

import { exigir } from "@/lib/props";

const VARIANTES = {
  primario: "bg-marinho text-white",
  secundario: "border border-marinho bg-white text-marinho",
};

export default function Botao({ texto, acao, tipo = "button", variante = "primario", desabilitado = false }) {
  exigir("Botao", typeof texto === "string", "o texto do botão precisa ser uma string");
  exigir("Botao", tipo === "submit" || typeof acao === "function", "informe a função com a ação do botão");

  return (
    <button
      type={tipo}
      onClick={acao}
      disabled={desabilitado}
      className={`min-h-11 rounded-full px-6 py-2.5 font-medium shadow-sm transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40 ${VARIANTES[variante]}`}
    >
      {texto}
    </button>
  );
}
