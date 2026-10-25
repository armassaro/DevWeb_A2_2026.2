"use client";

import { useState } from "react";
import { buscarTextoApoio, lerDoCache } from "@/lib/wikipedia";
import Botao from "./Botao";

export default function TextoApoio({ termo }) {
  // Se o texto já foi baixado nesta aba, aparece direto do cache
  const [estado, setEstado] = useState(() => {
    const salvo = lerDoCache(termo);
    return salvo ? { fase: "sucesso", texto: salvo } : { fase: "inicial" };
  });

  async function carregar() {
    setEstado({ fase: "carregando" });
    try {
      const texto = await buscarTextoApoio(termo);
      setEstado({ fase: "sucesso", texto });
    } catch (erro) {
      setEstado({ fase: "erro", mensagem: erro.message });
    }
  }

  if (estado.fase === "inicial") {
    return (
      <div className="flex justify-center">
        <Botao texto="Ver detalhes" variante="secundario" acao={carregar} />
      </div>
    );
  }

  if (estado.fase === "carregando") {
    return (
      <div role="status" className="space-y-2 rounded-lg border border-gray-200 p-4">
        <p className="text-sm text-gray-600">Carregando texto de apoio da Wikipédia...</p>
        <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  if (estado.fase === "erro") {
    return (
      <div role="alert" className="space-y-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <p>
          <strong>Não foi possível carregar o texto de apoio.</strong> {estado.mensagem} O roteiro continua disponível
          normalmente.
        </p>
        <Botao texto="Tentar novamente" variante="secundario" acao={carregar} />
      </div>
    );
  }

  const { texto } = estado;
  return (
    <article className="space-y-3 rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-marinho">Texto de apoio: {texto.titulo}</h3>
      {texto.imagem && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={texto.imagem} alt={texto.titulo} className="max-h-40 rounded object-contain" />
      )}
      <p className="text-gray-800">{texto.resumo}</p>
      <p className="text-xs text-gray-500">
        Fonte: Wikipédia
        {texto.link && (
          <>
            {" — "}
            <a href={texto.link} target="_blank" rel="noopener noreferrer" className="text-navbar underline">
              ler artigo completo
            </a>
          </>
        )}
      </p>
    </article>
  );
}
