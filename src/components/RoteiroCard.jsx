"use client";

import { IconeEstrela, IconeSeta } from "./Icones";

export default function RoteiroCard({ titulo, subtitulo, rotulo = "Detalhes", favoritado = false, aoFavoritar, aoAbrir }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={aoAbrir}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          aoAbrir();
        }
      }}
      className="flex min-h-[52px] w-full cursor-pointer items-center gap-3 border border-black bg-fundo px-4 py-2 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-navbar"
    >
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 break-words leading-snug">{titulo}</p>
        {subtitulo && <p className="truncate text-xs text-gray-500">{subtitulo}</p>}
      </div>
      <span className="shrink-0 text-gray-500">{rotulo}</span>
      {aoFavoritar && (
        <button
          type="button"
          aria-label={favoritado ? "Remover dos favoritos" : "Favoritar"}
          aria-pressed={favoritado}
          onClick={(e) => {
            e.stopPropagation();
            aoFavoritar();
          }}
          className="shrink-0 text-estrela"
        >
          <IconeEstrela preenchida={favoritado} />
        </button>
      )}
      <IconeSeta className="h-4 w-4 shrink-0 text-gray-400" />
    </div>
  );
}
