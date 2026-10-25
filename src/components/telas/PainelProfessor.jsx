"use client";

import { useCallback, useState } from "react";
import { filtrarItens, montarSolicitacao } from "@/lib/dados";
import { dataISO, formatarData } from "@/lib/formatos";
import Bloco from "../Bloco";
import Botao from "../Botao";
import DetalhesRoteiro from "../DetalhesRoteiro";
import DetalhesSolicitacao from "../DetalhesSolicitacao";
import FormAvaliacao from "../FormAvaliacao";
import FormSolicitacao from "../FormSolicitacao";
import Modal from "../Modal";
import RoteiroCard from "../RoteiroCard";
import SecaoColapsavel from "../SecaoColapsavel";

function ListaCards({ itens, vazio, children }) {
  if (itens.length === 0) {
    return <p className="border border-dashed border-gray-400 p-4 text-center text-sm text-gray-600">{vazio}</p>;
  }
  return <ul className="space-y-6">{itens.map(children)}</ul>;
}

export default function PainelProfessor({ roteirosIniciais, solicitacoesIniciais, disciplinas, anos, grupos }) {
  const [roteiros, setRoteiros] = useState(roteirosIniciais);
  const [solicitacoes, setSolicitacoes] = useState(solicitacoesIniciais);
  const [selecionadas, setSelecionadas] = useState([]);
  const [busca, setBusca] = useState("");
  const [termo, setTermo] = useState("");
  const [favoritos, setFavoritos] = useState([]);
  const [modal, setModal] = useState(null); // { tipo: "solicitar" | "avaliar" | "roteiro" | "solicitacao", id? }
  const [aviso, setAviso] = useState("");

  const fecharModal = useCallback(() => setModal(null), []);

  const paraAvaliar = filtrarItens(roteiros.filter((r) => r.status === "avaliacao"), selecionadas, termo, grupos);
  const publicados = filtrarItens(roteiros.filter((r) => r.status === "publicado"), selecionadas, termo, grupos);
  const solicitados = filtrarItens(solicitacoes, selecionadas, termo, grupos);

  const roteiroModal = roteiros.find((r) => r.id === modal?.id);
  const solicitacaoModal = solicitacoes.find((s) => s.id === modal?.id);

  function alternarFavorito(id) {
    setFavoritos((atuais) => (atuais.includes(id) ? atuais.filter((f) => f !== id) : [...atuais, id]));
  }

  function registrarSolicitacao(dados) {
    const hoje = dataISO();
    const nova = montarSolicitacao({ ...dados, id: `sol-${Date.now()}`, criadoEm: hoje });
    setSolicitacoes((atuais) => [nova, ...atuais]);
  }

  function aprovarRoteiro(editado) {
    const hoje = dataISO();
    setRoteiros((atuais) =>
      atuais.map((r) =>
        r.id === editado.id
          ? { ...editado, status: "publicado", publicadoEm: hoje, atualizadoEm: hoje, anoLancamento: hoje.slice(0, 4) }
          : r
      )
    );
    setModal(null);
    setAviso(`O roteiro "${editado.titulo}" foi aprovado e publicado em ${formatarData(hoje)}.`);
  }

  function cardRoteiro(roteiro, rotulo, tipo) {
    return (
      <li key={roteiro.id}>
        <RoteiroCard
          titulo={roteiro.titulo}
          subtitulo={`${roteiro.disciplina?.nome} · ${roteiro.rotuloAno} · ${roteiro.anoLancamento}`}
          rotulo={rotulo}
          favoritado={favoritos.includes(roteiro.id)}
          aoFavoritar={() => alternarFavorito(roteiro.id)}
          aoAbrir={() => setModal({ tipo, id: roteiro.id })}
        />
      </li>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-marinho">Área do professor</h1>
        <Botao texto="Solicitar roteiro" acao={() => setModal({ tipo: "solicitar" })} />
      </div>

      <Bloco
        conteudo={[[[selecionadas, setSelecionadas], grupos.anos, grupos.disciplinas, grupos.lancamentos], [busca, setBusca]]}
        aoBuscar={setTermo}
      />

      {aviso && (
        <div role="status" className="mt-6 flex items-start justify-between gap-4 rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-emerald-900">
          <p>{aviso}</p>
          <button type="button" onClick={() => setAviso("")} className="text-sm underline">
            Fechar
          </button>
        </div>
      )}

      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <SecaoColapsavel titulo="Para avaliar" quantidade={paraAvaliar.length}>
          <ListaCards itens={paraAvaliar} vazio="Nenhum roteiro aguardando avaliação.">
            {(r) => cardRoteiro(r, "Avaliar", "avaliar")}
          </ListaCards>
        </SecaoColapsavel>

        <SecaoColapsavel titulo="Publicados" quantidade={publicados.length}>
          <ListaCards itens={publicados} vazio="Nenhum roteiro publicado com esses filtros.">
            {(r) => cardRoteiro(r, "Detalhes", "roteiro")}
          </ListaCards>
        </SecaoColapsavel>

        <SecaoColapsavel titulo="Solicitados" quantidade={solicitados.length}>
          <ListaCards itens={solicitados} vazio="Nenhum pedido com esses filtros.">
            {(s) => (
              <li key={s.id}>
                <RoteiroCard
                  titulo={s.tema}
                  subtitulo={`${s.disciplina?.nome} · ${s.rotuloAno} · uso em ${formatarData(s.dataUso)}`}
                  favoritado={favoritos.includes(s.id)}
                  aoFavoritar={() => alternarFavorito(s.id)}
                  aoAbrir={() => setModal({ tipo: "solicitacao", id: s.id })}
                />
              </li>
            )}
          </ListaCards>
        </SecaoColapsavel>
      </div>

      <Modal aberto={modal !== null} aoFechar={fecharModal} titulo="Roteiro">
        {modal?.tipo === "solicitar" && (
          <FormSolicitacao disciplinas={disciplinas} anos={anos} aoEnviar={registrarSolicitacao} aoFechar={fecharModal} />
        )}
        {modal?.tipo === "avaliar" && roteiroModal && (
          <FormAvaliacao key={roteiroModal.id} roteiro={roteiroModal} aoCancelar={fecharModal} aoAprovar={aprovarRoteiro} />
        )}
        {modal?.tipo === "roteiro" && roteiroModal && <DetalhesRoteiro key={roteiroModal.id} roteiro={roteiroModal} />}
        {modal?.tipo === "solicitacao" && solicitacaoModal && <DetalhesSolicitacao solicitacao={solicitacaoModal} />}
      </Modal>
    </>
  );
}
