import { notFound } from "next/navigation";
import Questionario from "@/components/telas/Questionario";
import { buscarRoteiro, listarRoteiros } from "@/lib/dados";

// Na exportação estática só existem as páginas geradas aqui; qualquer outro id cai no 404
export const dynamicParams = false;

export function generateStaticParams() {
  return listarRoteiros("publicado").map((roteiro) => ({ id: roteiro.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const roteiro = buscarRoteiro(id);
  return { title: roteiro ? `Questionário: ${roteiro.titulo}` : "Roteiro não encontrado" };
}

export default async function PaginaQuestionario({ params }) {
  const { id } = await params;
  const roteiro = buscarRoteiro(id);
  if (!roteiro || roteiro.status !== "publicado") notFound();

  return <Questionario roteiro={roteiro} />;
}
