const COR_DESCONHECIDO = "#9ca3af";

export default function GraficoPizza({ titulo, dados }) {
  const fatias = Object.entries(dados).map(([nome, { cor, porcentagem }]) => ({ nome, cor, porcentagem }));

  // Se as fatias não fecham 100%, o que falta vira "Desconhecido"
  const soma = fatias.reduce((total, f) => total + f.porcentagem, 0);
  if (soma < 0.999) fatias.push({ nome: "Desconhecido", cor: COR_DESCONHECIDO, porcentagem: 1 - soma });

  let acumulado = 0;
  const gradiente = fatias
    .map((f) => {
      const inicio = acumulado * 100;
      acumulado += f.porcentagem;
      return `${f.cor} ${inicio}% ${acumulado * 100}%`;
    })
    .join(", ");

  const descricao = fatias.map((f) => `${f.nome}: ${Math.round(f.porcentagem * 100)}%`).join(", ");

  return (
    <figure className="flex flex-col items-center gap-5 sm:items-start">
      <figcaption className="text-xl font-semibold uppercase text-marinho">{titulo}</figcaption>
      <div
        role="img"
        aria-label={descricao}
        className="aspect-square w-52 rounded-full sm:w-64"
        style={{ background: `conic-gradient(${gradiente})` }}
      />
      <ul className="flex flex-wrap gap-6">
        {fatias.map((f) => (
          <li key={f.nome} className="flex items-center gap-3 text-lg font-semibold uppercase text-marinho">
            <span className="h-9 w-9 rounded-full" style={{ backgroundColor: f.cor }} />
            {f.nome}
          </li>
        ))}
      </ul>
    </figure>
  );
}
