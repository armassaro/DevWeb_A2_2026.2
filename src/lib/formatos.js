// "2026-10-01" -> "01/10/2026" (sem passar por Date, para não sofrer com fuso horário)
export function formatarData(iso) {
  if (!iso) return "-";
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

export function dataISO(data = new Date()) {
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${data.getFullYear()}-${mes}-${dia}`;
}

export function formatarMinutos(minutos) {
  if (minutos < 60) return `${minutos} minutos`;
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  return resto ? `${horas}h ${resto}min` : `${horas}h`;
}
