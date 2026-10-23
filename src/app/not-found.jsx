import Link from "next/link";

export default function NaoEncontrado() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="text-5xl font-bold text-marinho">404</p>
      <h1 className="mt-4 text-xl font-semibold text-marinho">Roteiro ou página não encontrado</h1>
      <p className="mt-2 text-gray-600">
        O endereço acessado não existe ou o roteiro ainda não foi publicado. Confira o link ou escolha um roteiro na lista.
      </p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-marinho px-6 py-2.5 font-medium text-white hover:opacity-70">
        Ver roteiros disponíveis
      </Link>
    </div>
  );
}
