// Conteúdo real do Gabriel (currículo + links verificados). Nada inventado.

export const perfil = {
  nome: "Gabriel Diogo",
  nomeCompleto: "Gabriel Diogo Vieira Silva",
  cargo: "Desenvolvedor Full Stack",
  local: "Goiânia, GO",
};

export const contato = {
  email: "diogo.software1@gmail.com",
  github: "https://github.com/Gabrieldiog",
  linkedin: "https://linkedin.com/in/gabrieldiogovsilva",
};

export type Sistema = {
  id: string;
  nome: string;
  tagline: string;
  descricao: string;
  metricaValor: string;
  metricaRotulo: string;
  papel: string;
  stack: string[];
  link?: string;
};

// Sistemas em produção — o número é a prova. (o card sem link NÃO finge ser clicável)
export const sistemas: Sistema[] = [
  {
    id: "gpol",
    nome: "GPol",
    tagline: "Inteligência política em tempo real",
    descricao:
      "O mapa eleitoral inteiro numa tela: os 5.570 municípios, voto geolocalizado por local de votação, dados do TSE e do Censo e escuta social com IA. Cuidei do back-end, da integração dos dados e da gestão de usuários.",
    metricaValor: "40",
    metricaRotulo: "pessoas usando em produção — 2 estados (GO e CE)",
    papel: "Back-end · integração de dados · gestão de usuários",
    stack: ["Node.js", "TypeScript", "Python", "SQL"],
    link: "https://sergio.seg.br/gpol-/",
  },
  {
    id: "assego",
    nome: "Sistema de gestão — ASSEGO",
    tagline: "Um sistema no lugar de um legado inteiro",
    descricao:
      "A associação rodava num sistema antigo. Construí o substituto de ponta a ponta: 14+ módulos — financeiro, jurídico, comercial e mais — reunidos num só lugar, incluindo a configuração dos servidores.",
    metricaValor: "55",
    metricaRotulo: "usuários ativos — 30+ todo dia, em 14+ módulos",
    papel: "Full stack · infraestrutura",
    stack: ["PHP", "Node.js", "TypeScript", "SQL"],
  },
  {
    id: "totem",
    nome: "Totem interativo — IHGG",
    tagline: "Um acervo histórico numa tela de toque, em Brasília",
    descricao:
      "O Instituto Histórico e Geográfico de Goiás queria abrir seu acervo de jornais ao público. Arquitetei e construí o totem touchscreen — da modelagem do banco à interface — exposto em Brasília.",
    metricaValor: "200+",
    metricaRotulo: "visitantes — exposto em Brasília",
    papel: "Arquiteto e desenvolvedor",
    stack: ["TypeScript", "Node.js", "MySQL"],
  },
  {
    id: "contentclub",
    nome: "Calculadora de preços — Content Club",
    tagline: "Preço justo pra quem vive de conteúdo",
    descricao:
      "Na Content Club (agência do Grupo WE), construí uma calculadora que ajuda criadores a precificar e planejar serviços. Participei de perto das decisões técnicas e de produto.",
    metricaValor: "100+",
    metricaRotulo: "criadores de conteúdo usando",
    papel: "Full stack · produto",
    stack: ["Node.js", "TypeScript", "SQL"],
  },
];

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
    periodo: "fev/2025 — atual",
    resumo:
      "Sistema de gestão (14+ módulos, 55 usuários), o GPol, um sistema de ouvidoria, sistemas de clube e pousada e o projeto Bombeiro Mirim.",
  },
  {
    org: "IHGG — Instituto Histórico e Geográfico de Goiás",
    site: "https://ihgg.org/",
    cargo: "Arquiteto e Desenvolvedor de Software",
    periodo: "out/2025 — jan/2026",
    resumo:
      "Totem interativo touchscreen exposto em Brasília, incluindo a modelagem da base de dados.",
  },
  {
    org: "Content Club",
    site: "https://contentclub.com.br",
    cargo: "Desenvolvedor Full Stack",
    periodo: "jun/2023 — jan/2026",
    resumo:
      "Calculadora usada por 100+ criadores, com participação ativa nas decisões técnicas e de produto.",
  },
  {
    org: "Fazenda Nova — GO · Freelancer",
    cargo: "Desenvolvedor Full Stack",
    periodo: "mar/2024 — abr/2025",
    resumo:
      "Sistema de gestão rural: controle de estoque, financeiro e o valor da arroba do gado em tempo real.",
  },
];

export const competencias: { grupo: string; itens: string[] }[] = [
  { grupo: "Linguagens", itens: ["JavaScript", "TypeScript", "PHP", "SQL", "Python", "Java", "HTML", "CSS"] },
  { grupo: "Frameworks", itens: ["Node.js", "Express", "NestJS", "React", "Next.js", "Vue.js", "Laravel", "Spring Boot", "TypeORM"] },
  { grupo: "Bancos", itens: ["MySQL", "PostgreSQL", "SQL Server"] },
  { grupo: "Infra & DevOps", itens: ["Docker", "Docker Compose", "Linux", "SSH", "Git"] },
];
