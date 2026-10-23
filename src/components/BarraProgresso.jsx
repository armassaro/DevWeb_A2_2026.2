export default function BarraProgresso({ atual, total }) {
  const porcentagem = total > 1 ? (atual / (total - 1)) * 100 : 100;

  return (
    <div
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={atual + 1}
      aria-label={`Questão ${atual + 1} de ${total}`}
      className="relative w-full max-w-xs"
    >
      <div className="h-1.5 rounded-full bg-gray-300" />
      <div className="absolute left-0 top-0 h-1.5 rounded-full bg-marinho/60" style={{ width: `${porcentagem}%` }} />
      <div
        className="absolute top-1/2 h-6 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-md transition-[left]"
        style={{ left: `${porcentagem}%` }}
      />
      <div className="mt-2 flex justify-between px-0.5">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`h-1 w-1 rounded-full ${i <= atual ? "bg-marinho" : "bg-gray-400"}`} />
        ))}
      </div>
      <p className="mt-1 text-center text-xs text-gray-600">
        {atual + 1} de {total}
      </p>
    </div>
  );
}
