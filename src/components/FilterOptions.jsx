"use client";

export default function FilterOptions({ opcoes }) {
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
                  className="flex items-center gap-2 text-sm font-semibold uppercase text-white hover:opacity-80"
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
