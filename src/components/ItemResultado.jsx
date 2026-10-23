import { IconeEstrela } from "./Icones";

export default function ItemResultado({ numero, enunciado, respostaAluno, respostaCorreta, acertou, marcada }) {
  return (
    <li
      className={`rounded-xl border-2 px-4 py-3 ${
        acertou ? "border-marinho bg-white text-marinho" : "border-transparent bg-marinho text-white"
      }`}
    >
      <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
        <span>Questão {numero}</span>
        <span className={`rounded px-1.5 text-xs ${acertou ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
          {acertou ? "Acertou" : "Errou"}
        </span>
        {marcada && <IconeEstrela preenchida className="ml-auto h-4 w-4 text-estrela" />}
      </div>
      <p className="line-clamp-2 text-sm">{enunciado}</p>
      <p className="mt-1 text-sm">
        Sua resposta: <strong>{respostaAluno ?? "sem resposta"}</strong>
      </p>
      {!acertou && (
        <p className="text-sm">
          Resposta correta: <strong>{respostaCorreta}</strong>
        </p>
      )}
    </li>
  );
}
