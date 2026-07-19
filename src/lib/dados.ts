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
};

// Palavras que trocam no título do hero.
export const palavrasHero = ["resolver", "entregar", "simplificar", "automatizar"];

export const chipsPerfil = ["Tranquilo", "Resolvedor", "Back-end", "Front-end", "Autônomo"];

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
      "Cresci em fazenda, encantado com as automações: a luz que acendia sozinha ao passar, o irrigador que ligava na hora certa. Eu precisava entender como aquilo funcionava.",
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
    marcador: "Autonomia",
    titulo: "Confiança pra dirigir projetos",
    texto:
      "Nos trabalhos por onde passei, os diretores confiaram na minha autonomia. Ainda júnior, já dirigi dois projetos do início ao fim. Meu padrão é sempre o mesmo: entender a dor de quem usa e resolver.",
  },
  {
    marcador: "Hoje",
    titulo: "Eu guio a tecnologia, não o contrário",
    texto:
      "Hoje a IA acelera meu trabalho, mas não substitui o conhecimento: eu guio, ela executa junto. Sou apaixonado por tecnologia e sempre vou ser.",
  },
];

// ── Sistemas do trabalho (a prova em números) ───────────────────────────────
export type Sistema = {
  id: string;
  nome: string;
  tagline: string;
  descricao: string;
  metricaValor: number;
  metricaSufixo: string;
  metricaRotulo: string;
  papel: string;
  stack: string[];
  link?: string;
};

export const sistemas: Sistema[] = [
  {
    id: "gpol",
    nome: "GPol",
    tagline: "Inteligência política em tempo real",
    descricao:
      "O mapa eleitoral inteiro numa tela: os 5.570 municípios, voto geolocalizado por local de votação, dados do TSE e do Censo e escuta social com IA. Cuidei do back-end, da integração dos dados e da gestão de usuários.",
    metricaValor: 40,
    metricaSufixo: "",
    metricaRotulo: "pessoas usando em produção, em 2 estados (GO e CE)",
    papel: "Back-end · integração de dados · gestão de usuários",
    stack: ["Node.js", "TypeScript", "Python", "SQL"],
    link: "https://sergio.seg.br/gpol-/",
  },
  {
    id: "assego",
    nome: "Gestão ASSEGO",
    tagline: "Um sistema no lugar de um legado inteiro",
    descricao:
      "A associação rodava num sistema antigo. Participei da criação e evolução do substituto de ponta a ponta: 14+ módulos entre financeiro, jurídico e comercial, incluindo a configuração dos servidores.",
    metricaValor: 55,
    metricaSufixo: "",
    metricaRotulo: "usuários ativos, 30+ todo dia, em 14+ módulos",
    papel: "Full stack · infraestrutura",
    stack: ["PHP", "Node.js", "TypeScript", "SQL"],
  },
  {
    id: "totem",
    nome: "Totem IHGG",
    tagline: "Um acervo histórico numa tela de toque, em Brasília",
    descricao:
      "O Instituto Histórico e Geográfico de Goiás queria abrir seu acervo de jornais ao público. Arquitetei e construí o totem touchscreen, da modelagem do banco à interface, exposto em Brasília.",
    metricaValor: 200,
    metricaSufixo: "+",
    metricaRotulo: "visitantes consultando o acervo em Brasília",
    papel: "Arquiteto e desenvolvedor",
    stack: ["TypeScript", "Node.js", "MySQL"],
  },
  {
    id: "conteudoclub",
    nome: "Calculadora Conteúdo Club",
    tagline: "Preço justo pra quem vive de conteúdo",
    descricao:
      "No Conteúdo Club, construí a calculadora digital que ajuda criadores a precificar e planejar serviços, participando de perto das decisões técnicas e de produto.",
    metricaValor: 100,
    metricaSufixo: "+",
    metricaRotulo: "criadores de conteúdo usando na precificação",
    papel: "Full stack · produto",
    stack: ["Node.js", "TypeScript", "SQL"],
  },
];

// ── Projetos autorais (no ar, com link) ─────────────────────────────────────
export type Projeto = {
  id: string;
  nome: string;
  descricao: string;
  stack: string[];
  link: string;
  repo?: string;
};

export const projetos: Projeto[] = [
  {
    id: "fox",
    nome: "Fox Finance",
    descricao:
      "App de gestão financeira pessoal com usuárias reais: cada conta é privada e isolada, com senha protegida por Argon2id e teste automatizado que garante que um usuário nunca lê os dados do outro.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle"],
    link: "https://fox-finance.vercel.app",
    repo: "https://github.com/Gabrieldiog/FOX-finance",
  },
  {
    id: "balcao",
    nome: "Balcão",
    descricao:
      "API gateway que unifica APIs públicas brasileiras (Câmara, Senado, BACEN, IBGE) num só lugar: normalização de dados, cache, retry com circuit breaker e busca que consulta várias fontes em paralelo.",
    stack: ["Python", "FastAPI", "Docker"],
    link: "https://balcaoo.netlify.app",
    repo: "https://github.com/Gabrieldiog/gateway-",
  },
  {
    id: "algoshorts",
    nome: "Algo Shorts",
    descricao:
      "Visualizador interativo de algoritmos de ordenação, passo a passo, narrado e com som gerado em tempo real via Web Audio. Aprender vendo, no ritmo que você quiser.",
    stack: ["Next.js", "TypeScript", "Web Audio"],
    link: "https://algoshorts.netlify.app",
    repo: "https://github.com/Gabrieldiog/algo-shorts",
  },
  {
    id: "maiormenor",
    nome: "Maior ou Menor?",
    descricao:
      "Jogo de adivinhação com dados públicos reais do Brasil e multijogador 1v1 por WebSocket. O motor é agnóstico: cada baralho é um JSON.",
    stack: ["Next.js", "TypeScript", "WebSocket"],
    link: "https://game-numbers.vercel.app",
    repo: "https://github.com/Gabrieldiog/game-numbers",
  },
  {
    id: "pharmacy",
    nome: "Pharmacy Price",
    descricao:
      "Comparador de preços de medicamentos: o teto legal (CMED) lado a lado com o preço real praticado nas farmácias.",
    stack: ["TypeScript", "Scraping", "APIs"],
    link: "https://pharmacy-price.netlify.app",
    repo: "https://github.com/Gabrieldiog/Pharmacy-price",
  },
];

// ── Trajetória profissional ─────────────────────────────────────────────────
export type Trabalho = {
  org: string;
  site?: string;
  cargo: string;
  periodo: string;
  resumo: string;
};

export const trajetoria: Trabalho[] = [
  {
    org: "ASSEGO",
    site: "https://www.assego.com.br/",
    cargo: "Desenvolvedor Full Stack Júnior",
    periodo: "fev/2025 · atual",
    resumo:
      "Sistema de gestão com 14+ módulos e 55 usuários, o GPol, sistema de ouvidoria, sistemas de clube e pousada e o projeto Bombeiro Mirim.",
  },
  {
    org: "IHGG",
    site: "https://ihgg.org/",
    cargo: "Arquiteto e Desenvolvedor de Software",
    periodo: "out/2025 · jan/2026",
    resumo:
      "Totem interativo touchscreen exposto em Brasília, incluindo a modelagem da base de dados.",
  },
  {
    org: "Conteúdo Club",
    site: "https://conteudoclub.com/",
    cargo: "Desenvolvedor Full Stack",
    periodo: "jun/2023 · jan/2026",
    resumo:
      "Calculadora usada por 100+ criadores, com participação ativa nas decisões técnicas e de produto.",
  },
  {
    org: "Fazenda Nova · GO (freelancer)",
    cargo: "Desenvolvedor Full Stack",
    periodo: "mar/2024 · abr/2025",
    resumo:
      "Sistema de gestão rural: controle de estoque, financeiro e o valor da arroba do gado em tempo real.",
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
