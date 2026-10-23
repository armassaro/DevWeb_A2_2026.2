import { notFound } from "next/navigation";
import Questionario from "@/components/telas/Questionario";

// Só os roteiros publicados têm questionário
const ROTEIROS = [
  {
    id: "r01",
    titulo: "Frações no dia a dia",
    disciplina: "Matemática",
    ano: "6º ano",
    questoes: [
      { enunciado: "Uma pizza foi dividida em 8 pedaços iguais e João comeu 3. Que fração da pizza ele comeu?", alternativas: ["3/5", "3/8", "5/8", "8/3"], resposta: 1 },
      { enunciado: "Na fração 2/7, qual número é o denominador?", alternativas: ["2", "7", "9", "5"], resposta: 1 },
      { enunciado: "Qual fração é equivalente a 1/2?", alternativas: ["2/3", "3/6", "1/4", "2/5"], resposta: 1 },
      { enunciado: "Quanto é 1/4 + 2/4?", alternativas: ["3/8", "3/4", "2/4", "1/2"], resposta: 1 },
    ],
  },
  {
    id: "r02",
    titulo: "Como a água circula pelo planeta",
    disciplina: "Ciências",
    ano: "6º ano",
    questoes: [
      { enunciado: "Como se chama a passagem da água do estado líquido para o vapor?", alternativas: ["Condensação", "Evaporação", "Solidificação", "Precipitação"], resposta: 1 },
      { enunciado: "As nuvens se formam principalmente por qual processo?", alternativas: ["Condensação do vapor de água", "Fusão do gelo", "Infiltração no solo", "Evaporação do solo"], resposta: 0 },
      { enunciado: "Qual é a principal fonte de energia que movimenta o ciclo da água?", alternativas: ["O vento", "A Lua", "O Sol", "O calor do centro da Terra"], resposta: 2 },
      { enunciado: "Chuva, neve e granizo são exemplos de:", alternativas: ["Evaporação", "Transpiração", "Precipitação", "Condensação"], resposta: 2 },
    ],
  },
  {
    id: "r03",
    titulo: "Egito Antigo: o povo do Nilo",
    disciplina: "História",
    ano: "6º ano",
    questoes: [
      { enunciado: "Às margens de qual rio se desenvolveu a civilização egípcia?", alternativas: ["Amazonas", "Tigre", "Nilo", "Eufrates"], resposta: 2 },
      { enunciado: "Como era chamado o governante do Egito Antigo?", alternativas: ["Imperador", "Faraó", "Rei-sol", "César"], resposta: 1 },
      { enunciado: "Para que serviam as grandes pirâmides?", alternativas: ["Armazenar grãos", "Túmulos dos faraós", "Templos de comércio", "Moradia do povo"], resposta: 1 },
      { enunciado: "Por que as cheias do Nilo eram importantes?", alternativas: ["Deixavam o solo fértil para plantar", "Afastavam os inimigos", "Geravam energia", "Formavam desertos"], resposta: 0 },
    ],
  },
  {
    id: "r04",
    titulo: "Substantivos e suas classificações",
    disciplina: "Português",
    ano: "7º ano",
    questoes: [
      { enunciado: "Qual das palavras abaixo é um substantivo próprio?", alternativas: ["rio", "Brasil", "cachorro", "escola"], resposta: 1 },
      { enunciado: "\"Cardume\" é o coletivo de:", alternativas: ["abelhas", "lobos", "peixes", "aves"], resposta: 2 },
      { enunciado: "Qual palavra é um substantivo composto?", alternativas: ["guarda-chuva", "chuva", "chuvoso", "chover"], resposta: 0 },
      { enunciado: "Na frase \"A alegria tomou conta da sala\", qual é o substantivo abstrato?", alternativas: ["sala", "conta", "alegria", "tomou"], resposta: 2 },
    ],
  },
  {
    id: "r05",
    titulo: "As formas do relevo",
    disciplina: "Geografia",
    ano: "7º ano",
    questoes: [
      { enunciado: "Qual forma de relevo é baixa, plana e marcada pelo acúmulo de sedimentos?", alternativas: ["Montanha", "Planície", "Planalto", "Serra"], resposta: 1 },
      { enunciado: "Uma área mais baixa que as regiões ao seu redor é chamada de:", alternativas: ["Depressão", "Planalto", "Cordilheira", "Pico"], resposta: 0 },
      { enunciado: "Qual destes fatores ajuda a modificar o relevo ao longo do tempo?", alternativas: ["A erosão causada pela chuva e pelo vento", "A rotação da Lua", "O horário de verão", "A iluminação pública"], resposta: 0 },
      { enunciado: "Formas de relevo elevadas, onde predomina o desgaste, são os:", alternativas: ["Planaltos", "Mangues", "Deltas", "Litorais"], resposta: 0 },
    ],
  },
  {
    id: "r06",
    titulo: "A célula, unidade da vida",
    disciplina: "Ciências",
    ano: "7º ano",
    questoes: [
      { enunciado: "Qual parte da célula guarda o material genético?", alternativas: ["Membrana", "Citoplasma", "Núcleo", "Parede celular"], resposta: 2 },
      { enunciado: "Qual estrutura existe na célula vegetal, mas não na animal?", alternativas: ["Núcleo", "Cloroplasto", "Membrana plasmática", "Citoplasma"], resposta: 1 },
      { enunciado: "A membrana plasmática tem a função de:", alternativas: ["Produzir luz", "Controlar o que entra e sai da célula", "Guardar o DNA", "Fazer fotossíntese"], resposta: 1 },
      { enunciado: "Qual instrumento permite observar células?", alternativas: ["Telescópio", "Microscópio", "Termômetro", "Barômetro"], resposta: 1 },
    ],
  },
  {
    id: "r07",
    titulo: "Equações do 1º grau",
    disciplina: "Matemática",
    ano: "8º ano",
    questoes: [
      { enunciado: "Qual é o valor de x em x + 5 = 12?", alternativas: ["5", "7", "12", "17"], resposta: 1 },
      { enunciado: "Qual é o valor de x em 3x = 21?", alternativas: ["6", "7", "18", "24"], resposta: 1 },
      { enunciado: "Qual é o valor de x em 2x - 4 = 10?", alternativas: ["3", "5", "7", "14"], resposta: 2 },
      { enunciado: "O dobro de um número mais 3 é igual a 11. Que número é esse?", alternativas: ["4", "7", "8", "5"], resposta: 0 },
    ],
  },
  {
    id: "r08",
    titulo: "Revolução Francesa",
    disciplina: "História",
    ano: "8º ano",
    questoes: [
      { enunciado: "Em que ano começou a Revolução Francesa?", alternativas: ["1500", "1789", "1822", "1914"], resposta: 1 },
      { enunciado: "Qual acontecimento se tornou símbolo do início da revolução?", alternativas: ["A Queda da Bastilha", "A chegada de Cabral", "A Guerra do Paraguai", "A Revolução Industrial"], resposta: 0 },
      { enunciado: "Qual era o lema da Revolução Francesa?", alternativas: ["Ordem e progresso", "Liberdade, igualdade e fraternidade", "Independência ou morte", "Paz, terra e pão"], resposta: 1 },
      { enunciado: "Um dos motivos da revolução foi:", alternativas: ["Os privilégios da nobreza e do clero", "A descoberta do petróleo", "A invenção da internet", "A abolição da escravidão no Brasil"], resposta: 0 },
    ],
  },
  {
    id: "r09",
    titulo: "Conhecendo o Sistema Solar",
    disciplina: "Ciências",
    ano: "9º ano",
    questoes: [
      { enunciado: "Qual é o planeta mais próximo do Sol?", alternativas: ["Vênus", "Terra", "Mercúrio", "Marte"], resposta: 2 },
      { enunciado: "Qual é o maior planeta do Sistema Solar?", alternativas: ["Saturno", "Júpiter", "Netuno", "Terra"], resposta: 1 },
      { enunciado: "Quantos planetas existem no Sistema Solar?", alternativas: ["7", "8", "9", "10"], resposta: 1 },
      { enunciado: "O Sol é classificado como:", alternativas: ["Um planeta", "Um satélite", "Uma estrela", "Um cometa"], resposta: 2 },
    ],
  },
  {
    id: "r10",
    titulo: "Globalização e o mundo conectado",
    disciplina: "Geografia",
    ano: "9º ano",
    questoes: [
      { enunciado: "O que a globalização aumentou entre os países?", alternativas: ["O isolamento", "A integração econômica e cultural", "O uso de cartas", "A distância entre eles"], resposta: 1 },
      { enunciado: "Qual tecnologia acelerou muito a globalização?", alternativas: ["A internet", "O arado", "A roda d'água", "O telégrafo de fumaça"], resposta: 0 },
      { enunciado: "Empresas que atuam em vários países são chamadas de:", alternativas: ["Cooperativas", "Multinacionais", "Microempresas", "Autarquias"], resposta: 1 },
      { enunciado: "Um efeito negativo apontado na globalização é:", alternativas: ["A desigualdade entre países ricos e pobres", "O fim do comércio", "O fim das cidades", "A falta de produtos"], resposta: 0 },
    ],
  },
  {
    id: "r11",
    titulo: "Figuras de linguagem",
    disciplina: "Português",
    ano: "9º ano",
    questoes: [
      { enunciado: "\"Já te falei isso um milhão de vezes!\" é um exemplo de:", alternativas: ["Metáfora", "Hipérbole", "Personificação", "Ironia"], resposta: 1 },
      { enunciado: "\"O vento cantava na janela\" é um exemplo de:", alternativas: ["Personificação", "Hipérbole", "Comparação", "Eufemismo"], resposta: 0 },
      { enunciado: "\"Meu irmão é uma fera no futebol\" é um exemplo de:", alternativas: ["Metáfora", "Onomatopeia", "Hipérbole", "Antítese"], resposta: 0 },
      { enunciado: "Qual figura imita sons, como \"tic-tac\" e \"au-au\"?", alternativas: ["Ironia", "Onomatopeia", "Metáfora", "Pleonasmo"], resposta: 1 },
    ],
  },
];

// Na exportação estática só existem as páginas geradas aqui; qualquer outro id cai no 404
export const dynamicParams = false;

export function generateStaticParams() {
  return ROTEIROS.map((roteiro) => ({ id: roteiro.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const roteiro = ROTEIROS.find((r) => r.id === id);
  return { title: roteiro ? `Questionário: ${roteiro.titulo}` : "Roteiro não encontrado" };
}

export default async function PaginaQuestionario({ params }) {
  const { id } = await params;
  const roteiro = ROTEIROS.find((r) => r.id === id);
  if (!roteiro) notFound();

  return <Questionario roteiro={roteiro} />;
}
