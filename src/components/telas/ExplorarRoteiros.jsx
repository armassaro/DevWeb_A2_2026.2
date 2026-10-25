"use client";

import { useCallback, useState } from "react";
import { filtrarItens } from "@/lib/dados";
import { formatarData } from "@/lib/formatos";
import Bloco from "../Bloco";
import DetalhesRoteiro from "../DetalhesRoteiro";
import Modal from "../Modal";
import RoteiroCard from "../RoteiroCard";

export default function ExplorarRoteiros({ roteiros, grupos, ultimaAtualizacao }) {
  const [selecionadas, setSelecionadas] = useState([]);
  const [busca, setBusca] = useState("");
  const [termo, setTermo] = useState("");
  const [favoritos, setFavoritos] = useState([]);
  const [abertoId, setAbertoId] = useState(null);

  const visiveis = filtrarItens(roteiros, selecionadas, termo, grupos);
  const aberto = roteiros.find((r) => r.id === abertoId);
  const fecharModal = useCallback(() => setAbertoId(null), []);

  function alternarFavorito(id) {
    setFavoritos((atuais) => (atuais.includes(id) ? atuais.filter((f) => f !== id) : [...atuais, id]));
  }

  return (
    <>
      <Bloco
        conteudo={[[[selecionadas, setSelecionadas], grupos.anos, grupos.disciplinas, grupos.lancamentos], [busca, setBusca]]}
        aoBuscar={setTermo}
      />

      <div className="mt-10 mb-4 flex flex-wrap items-end justify-between gap-2">
        <h1 className="font-semibold uppercase text-marinho">Roteiros disponíveis ({visiveis.length})</h1>
        <p className="text-sm text-gray-600">
          Os roteiros são atualizados uma vez por mês · última atualização em {formatarData(ultimaAtualizacao)}
        </p>
      </div>

      {visiveis.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-400 p-8 text-center text-gray-600">
          Nenhum roteiro encontrado para os filtros escolhidos.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiveis.map((roteiro) => (
            <li key={roteiro.id}>
              <RoteiroCard
                titulo={roteiro.titulo}
                subtitulo={`${roteiro.disciplina?.nome} · ${roteiro.rotuloAno}`}
                favoritado={favoritos.includes(roteiro.id)}
                aoFavoritar={() => alternarFavorito(roteiro.id)}
                aoAbrir={() => setAbertoId(roteiro.id)}
              />
            </li>
          ))}
        </ul>
      )}

      <Modal aberto={Boolean(aberto)} aoFechar={fecharModal} titulo={aberto?.titulo ?? "Roteiro"}>
        {/* key garante que o estado do texto de apoio seja do roteiro aberto */}
        {aberto && <DetalhesRoteiro key={aberto.id} roteiro={aberto} />}
      </Modal>
    </>
  );
}
