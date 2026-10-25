const ENDERECO = "https://pt.wikipedia.org/api/rest_v1/page/summary/";
const TEMPO_LIMITE = 8000;

// Cache em memória: enquanto a aba estiver aberta, o texto já baixado não é pedido de novo
const cache = new Map();

export function lerDoCache(termo) {
  return cache.get(termo) ?? null;
}

export async function buscarTextoApoio(termo) {
  if (cache.has(termo)) return cache.get(termo);

  const controle = new AbortController();
  const temporizador = setTimeout(() => controle.abort(), TEMPO_LIMITE);

  let resposta;
  try {
    resposta = await fetch(ENDERECO + encodeURIComponent(termo.replaceAll(" ", "_")), {
      signal: controle.signal,
      headers: { Accept: "application/json" },
    });
  } catch (erro) {
    if (erro.name === "AbortError") {
      throw new Error("A Wikipédia demorou demais para responder.");
    }
    throw new Error("Sem conexão com a Wikipédia no momento.");
  } finally {
    clearTimeout(temporizador);
  }

  if (resposta.status === 404) throw new Error("Não há artigo da Wikipédia sobre este tema.");
  if (resposta.status === 429) throw new Error("A Wikipédia recebeu muitos pedidos. Aguarde um pouco.");
  if (!resposta.ok) throw new Error(`A Wikipédia respondeu com erro ${resposta.status}.`);

  const dados = await resposta.json();
  if (!dados.extract) throw new Error("O artigo encontrado não tem resumo.");

  const texto = {
    titulo: dados.title,
    resumo: dados.extract,
    link: dados.content_urls?.desktop?.page ?? null,
    imagem: dados.thumbnail?.source ?? null,
  };
  cache.set(termo, texto);
  return texto;
}
