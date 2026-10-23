"use client";

export default function Alternativa({ texto, indice, selecao, multipla = false }) {
  const [selecionadas, setSelecionadas] = selecao;
  const marcada = selecionadas.includes(indice);

  function alternar() {
    if (multipla) {
      setSelecionadas(marcada ? selecionadas.filter((i) => i !== indice) : [...selecionadas, indice]);
    } else {
      // Resposta única: marcar uma desmarca a anterior
      setSelecionadas(marcada ? [] : [indice]);
    }
  }

  return (
    <button
      type="button"
      role={multipla ? "checkbox" : "radio"}
      aria-checked={marcada}
      onClick={alternar}
      className={`w-full rounded-xl border-2 px-4 py-3 text-left break-words transition-colors duration-200 ${
        marcada ? "border-marinho bg-white text-marinho" : "border-transparent bg-navbar text-white hover:opacity-90"
      }`}
    >
      <span className="font-semibold">{String.fromCharCode(97 + indice)})</span> {texto}
    </button>
  );
}
