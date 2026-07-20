// Conteúdo real do Gabriel (currículo + links verificados). Nada inventado.

export const perfil = {
  nome: "Gabriel Diogo",
  nomeGigante: "GABRIEL",
  nomeCompleto: "Gabriel Diogo Vieira Silva",
  cargo: "Desenvolvedor Full Stack",
  local: "Goiânia, GO",
};

export const contato = {
  email: "diogo.software1@gmail.com",
  github: "https://github.com/Gabrieldiog",
  linkedin: "https://linkedin.com/in/gabrieldiogovsilva",
  whatsapp: "https://wa.me/5562984931303",
  whatsappLabel: "(62) 98493-1303",
};

// Palavras que trocam no título do hero.
export const palavrasHero = ["resolver", "entregar", "simplificar", "automatizar"];

export const chipsPerfil = ["Full Stack", "APIs REST", "TDD & Code Review", "Calmo", "Companheiro", "Extrovertido", "Curioso", "Autônomo", "Mão na massa", "Resolvedor"];

// ── Minha história (a seção pinada, capítulo a capítulo) ────────────────────
export type Capitulo = {
  marcador: string;
  titulo: string;
  texto: string;
};

export const historia: Capitulo[] = [
  {
    marcador: "Fazenda",
    titulo: "A curiosidade nasceu no interior",
    texto:
      "Cresci em fazenda, encantado com o que funcionava sozinho: a luz do sensor de presença que acendia ao passar, o irrigador que ligava na hora certa pelo timer, a boia que enchia a caixa d'água e desligava a bomba, o portão que abria com um botão. Eu precisava entender como aquilo funcionava.",
  },
  {
    marcador: "Jogos",
    titulo: "Os jogos viraram combustível",
    texto:
      "Com os jogos a paixão por tecnologia só cresceu. Ali decidi: eu não queria só usar sistemas, queria construir os meus.",
  },
  {
    marcador: "Java",
    titulo: "Quebrando a cabeça com Java",
    texto:
      "No começo era Java na raça. Quebrava a cabeça pra entender cada conceito e amava cada minuto. Foi ali que aprendi a não largar um problema até ele ceder.",
  },
  {
    marcador: "Faculdade",
    titulo: "Engenharia de Software na UNIGOIÁS",
    texto:
      "Escolhi Engenharia de Software e amo o que estudo. Levo a faculdade a sério e ela me devolve base pra construir melhor.",
  },
  {
    marcador: "Confiança",
    titulo: "O dev que soluciona, e em quem confiam",
    texto:
      "Virei a pessoa que chamam quando tem problema pra resolver. Os diretores confiaram na minha autonomia e, ainda júnior, dirigi dois projetos do início ao fim. Entender a dor de quem usa e resolver virou o meu padrão.",
  },
  {
    marcador: "Hoje",
    titulo: "Eu guio a tecnologia, não o contrário",
    texto:
      "Hoje a IA acelera meu trabalho, mas não substitui o conhecimento: eu guio, ela executa junto. Faço code review, sigo fazendo cursos pra aprender sempre mais e, na faculdade, escrevo o código com a própria mão. Sou apaixonado por tecnologia e sempre vou ser.",
  },
];

// ── Projetos no ar (com link e print real) ──────────────────────────────────
export type Projeto = {
  id: string;
  nome: string;
  descricao: string;
  stack: string[];
  link: string;
  repo?: string;
  imagem: string;
};

export const projetos: Projeto[] = [
  {
    id: "gpol",
    nome: "GPol",
    descricao:
      "Inteligência política em tempo real: mapa de votos dos 5.570 municípios, dados do TSE e do Censo e escuta social com IA. Em produção com 40 pessoas em 2 estados.",
    stack: ["Node.js", "TypeScript", "Python", "SQL"],
    link: "https://sergio.seg.br/gpol-/",
    imagem: "/projetos/gpol.png",
  },
  {
    id: "fox",
    nome: "Fox Finance",
    descricao:
      "App de gestão financeira pessoal com usuárias reais: cada conta é privada e isolada, com senha protegida por Argon2id e teste automatizado que garante que um usuário nunca lê os dados do outro.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle"],
    link: "https://fox-finance.vercel.app",
    repo: "https://github.com/Gabrieldiog/FOX-finance",
    imagem: "/projetos/fox-print.png",
  },
  {
    id: "calculadora",
    nome: "Calculadora do Creator",
    descricao:
      "A calculadora que ajuda criadores de conteúdo a precificar e planejar serviços, feita com o Conteúdo Club. Mais de 100 criadores usando.",
    stack: ["Vue.js", "Node.js", "SQL"],
    link: "https://calculadoradocreator.com",
    imagem: "/projetos/calculadora.png",
  },
  {
    id: "balcao",
    nome: "Balcão",
    descricao:
      "API gateway que unifica APIs públicas brasileiras (Câmara, Senado, BACEN, IBGE) num só lugar: normalização de dados, cache, retry com circuit breaker e busca que consulta várias fontes em paralelo.",
    stack: ["Python", "FastAPI", "Docker"],
    link: "https://balcaoo.netlify.app",
    repo: "https://github.com/Gabrieldiog/gateway-",
    imagem: "/projetos/balcao.png",
  },
  {
    id: "algoshorts",
    nome: "Algo Shorts",
    descricao:
      "Visualizador interativo de algoritmos de ordenação, passo a passo, narrado e com som gerado em tempo real via Web Audio. Aprender vendo, no ritmo que você quiser.",
    stack: ["Next.js", "TypeScript", "Web Audio"],
    link: "https://algoshorts.netlify.app",
    repo: "https://github.com/Gabrieldiog/algo-shorts",
    imagem: "/projetos/algoshorts.png",
  },
  {
    id: "maiormenor",
    nome: "Maior ou Menor?",
    descricao:
      "Jogo de adivinhação com dados públicos reais do Brasil e multijogador 1v1 por WebSocket. O motor é agnóstico: cada baralho é um JSON.",
    stack: ["Next.js", "TypeScript", "WebSocket"],
    link: "https://game-numbers.vercel.app",
    repo: "https://github.com/Gabrieldiog/game-numbers",
    imagem: "/projetos/maiormenor.png",
  },
  {
    id: "pharmacy",
    nome: "Pharmacy Price",
    descricao:
      "Comparador de preços de medicamentos: o teto legal (CMED) lado a lado com o preço real praticado nas farmácias.",
    stack: ["TypeScript", "Scraping", "APIs"],
    link: "https://pharmacy-price.netlify.app",
    repo: "https://github.com/Gabrieldiog/Pharmacy-price",
    imagem: "/projetos/pharmacy.png",
  },
];

// ── Trajetória profissional ─────────────────────────────────────────────────
// Soma honesta de quem usa o que construí: 55 (gestão ASSEGO) + 40 (GPol)
// + 10 (clube e pousada) + 100+ (calculadora) + 200+ (totem) = 400+.
export const alcanceTotal = {
  valor: "400+",
  rotulo: "pessoas usam ou já usaram sistemas que construí",
};

export type Trabalho = {
  org: string;
  site?: string;
  cargo: string;
  periodo: string;
  feitos: string[];
  nota?: string;
  metrica?: { valor: number; sufixo: string; rotulo: string };
};

export const trajetoria: Trabalho[] = [
  {
    org: "ASSEGO",
    site: "https://www.assego.com.br/",
    cargo: "Desenvolvedor Full Stack Júnior",
    periodo: "fev/2025 · atual",
    feitos: [
      "Sistema de gestão administrativa com 14+ módulos (financeiro, jurídico, comercial e mais), substituindo o legado: 55 usuários, 30+ todo dia",
      "GPol, plataforma de inteligência política em tempo real usada por 40 pessoas em Goiás e no Ceará",
      "Dois sistemas de gestão e agendamento, do clube e da pousada, usados por 10 colaboradores",
      "Sistema de ouvidoria completo, do levantamento de requisitos aos testes",
      "Sistema do projeto Bombeiro Mirim, do cadastro à gestão administrativa",
      "Mais de 10 outros sistemas e APIs internas pra operação do dia a dia",
      "Apoio à configuração dos servidores de tudo isso",
    ],
    nota: "Sistemas internos: rodam na rede da associação, sem landing page pra visitar. A prova: 105+ pessoas usando, 30+ delas todo dia.",
    metrica: { valor: 15, sufixo: "+", rotulo: "sistemas e APIs construídos" },
  },
  {
    org: "IHGG",
    site: "https://ihgg.org/",
    cargo: "Arquiteto e Desenvolvedor de Software",
    periodo: "out/2025 · jan/2026",
    feitos: [
      "Arquitetura e desenvolvimento do totem interativo touchscreen exposto em Brasília",
      "Modelagem completa da base de dados do acervo histórico",
      "Consulta a jornais históricos sobre Goiás e Brasília, usada por 200+ visitantes",
    ],
    nota: "É um totem físico: o link é ir até ele em Brasília.",
    metrica: { valor: 200, sufixo: "+", rotulo: "visitantes no totem" },
  },
  {
    org: "Conteúdo Club",
    site: "https://conteudoclub.com/",
    cargo: "Desenvolvedor Full Stack",
    periodo: "jun/2023 · jan/2026",
    feitos: [
      "Calculadora do Creator: precificação e planejamento de serviços pra 100+ criadores de conteúdo",
      "Participação ativa nas decisões técnicas e de produto",
    ],
    metrica: { valor: 100, sufixo: "+", rotulo: "criadores usando a calculadora" },
  },
  {
    org: "Fazenda Nova · GO (freelancer)",
    cargo: "Desenvolvedor Full Stack",
    periodo: "mar/2024 · abr/2025",
    feitos: [
      "Sistema de gestão rural: controle de estoque, financeiro e o valor da arroba do gado em tempo real",
      "Apoio a decisões operacionais e estratégicas da fazenda",
    ],
    nota: "Sistema interno da fazenda, sem página pública.",
  },
];

// ── Formação, cursos e idiomas ──────────────────────────────────────────────
export const formacao = {
  graduacao: {
    curso: "Bacharelado em Engenharia de Software",
    instituicao: "UNIGOIÁS",
    periodo: "2023 · conclusão prevista jun/2027",
  },
  cursos: [
    "Ciência de Dados para Iniciantes com Projetos Reais (Udemy)",
    "Web Frontend: Fundamentos HTML, CSS e JS + 10 Projetos (Udemy)",
  ],
  idiomas: ["Português (nativo)", "Espanhol (intermediário)", "Inglês (básico)"],
};

export const competencias: { grupo: string; itens: string[] }[] = [
  { grupo: "Linguagens", itens: ["JavaScript", "TypeScript", "PHP", "SQL", "Python", "Java", "HTML", "CSS"] },
  { grupo: "Frameworks", itens: ["Node.js", "Express.js", "NestJS", "React", "Next.js", "Vue.js", "Laravel", "Spring Boot", "TypeORM"] },
  { grupo: "Bancos", itens: ["MySQL", "PostgreSQL", "SQL Server"] },
  { grupo: "Infra & DevOps", itens: ["Docker", "Docker Compose", "Linux", "SSH", "Git"] },
  { grupo: "Práticas", itens: ["APIs REST", "TDD/BDD", "Levantamento de requisitos", "POO"] },
];
