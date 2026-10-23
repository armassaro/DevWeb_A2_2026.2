// Rótulo + conteúdo (texto fixo ou input) + mensagem de erro opcional
export default function Campo({ rotulo, htmlFor, erro, icone, children }) {
  return (
    <div className="space-y-1">
      <label htmlFor={htmlFor} className="flex items-center gap-1.5 text-gray-900">
        {rotulo}
        {icone}
      </label>
      {children}
      {erro && (
        <p id={htmlFor ? `${htmlFor}-erro` : undefined} className="text-sm text-red-700">
          {erro}
        </p>
      )}
    </div>
  );
}

export const estiloCaixa = "w-full bg-campo px-3 py-2.5 text-gray-900";
export const estiloEntrada =
  "w-full bg-campo px-3 py-2.5 text-gray-900 outline-none border-2 border-transparent focus:border-navbar aria-[invalid=true]:border-red-600";
