// Validação simples dos tipos recebidos pelos componentes (definida na seção de elementos reutilizáveis)
export function exigir(componente, condicao, mensagem) {
  if (!condicao) throw new TypeError(`<${componente}>: ${mensagem}`);
}

// Confere se o valor é um par [valor, setValor] vindo de um useState
export function ehEstado(valor) {
  return Array.isArray(valor) && valor.length >= 2 && typeof valor[1] === "function";
}
