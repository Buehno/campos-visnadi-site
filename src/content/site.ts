/**
 * Conteúdo institucional centralizado.
 *
 * Fonte de verdade: skill institucional "campos-visnadi" e documentos de marca
 * (Projeto Campos Visnadi.pdf, certificado INPI). Textos marcados como
 * "proposta editorial" aguardam revisão do escritório — ver docs/content-pending.md.
 */

export const firm = {
  brand: "Campos Visnadi",
  descriptor: "soluções jurídicas",
  fullName: "Campos Visnadi Soluções Jurídicas",
  legalName: "Thiago de Campos Visnadi Sociedade Individual de Advocacia",
  cnpj: "42.107.312/0001-49",
  tagline: "O Direito pode ser inovador.",
  philosophy:
    "O direito deve ser acessível, certeiro e justo. Ele deve ajudar, não constranger.",
  founder: {
    name: "Thiago de Campos Visnadi",
    role: "Fundador e sócio-titular",
    registration: "Advogado inscrito na OAB/SP",
  },
  address: {
    street: "Rua Francisco Lopes, 144",
    city: "Jundiaí",
    state: "SP",
    postalCode: "13212-651",
  },
  trademark: {
    office: "INPI",
    process: "933204183",
    niceClass: "45",
    grantedAt: "09/09/2025",
    validUntil: "09/09/2035",
  },
  values: ["Qualidade", "Agilidade", "Gestão", "Estratégia"],
} as const;

export const nav = [
  { href: "#atuacao", label: "Atuação" },
  { href: "#abordagem", label: "Abordagem" },
  { href: "#escritorio", label: "Escritório" },
  { href: "#perguntas", label: "Perguntas frequentes" },
] as const;

export const contactCta = { href: "#contato", label: "Entrar em contato" } as const;

export const hero = {
  eyebrow: "Soluções jurídicas para empresas de tecnologia",
  title: "O Direito pode ser inovador.",
  lead: "Assessoria jurídica com clareza e visão estratégica para apoiar contratos, propriedade intelectual e decisões do seu negócio.",
  primary: contactCta,
  secondary: { href: "#atuacao", label: "Conhecer a atuação" },
} as const;

/** Proposta editorial: situações ilustrativas, não aconselhamento individual. */
export const context = {
  eyebrow: "Contexto",
  title: "Decisões de tecnologia também passam pelo jurídico.",
  intro:
    "Produto, parceria e crescimento geram documentos, responsabilidades e ativos que precisam de atenção jurídica. Três situações comuns:",
  items: [
    {
      title: "Contratos com clientes, parceiros e fornecedores",
      body: "Um novo cliente corporativo envia o próprio contrato. Uma integração com parceiro exige regras sobre dados e responsabilidades. Um fornecedor passa a operar parte do produto. Cada relação pede termos que o time consiga entender e cumprir.",
    },
    {
      title: "Software e outros ativos intelectuais",
      body: "Código, marca e conteúdo produzidos pela empresa são patrimônio. Licenciar um software, contratar desenvolvimento externo ou transferir tecnologia envolve decidir quem detém cada direito e em quais condições.",
    },
    {
      title: "Responsabilidades e práticas de compliance",
      body: "À medida que a operação cresce, cresce também a necessidade de papéis claros, políticas internas coerentes e decisões documentadas. Organizar isso cedo evita improviso mais adiante.",
    },
  ],
} as const;

/** Redação institucional proposta para revisão (base: áreas registradas no INPI). */
export const practice = {
  eyebrow: "Atuação",
  title: "Apoio jurídico conectado à operação.",
  intro:
    "Três núcleos concentram a atuação apresentada para empresas de tecnologia.",
  areas: [
    {
      id: "contratos",
      title: "Contratos e negociações",
      body: "Elaboração, revisão e negociação de instrumentos jurídicos ligados às relações do negócio.",
      topics: ["Contratos com clientes", "Parcerias e fornecedores", "Negociação de termos"],
    },
    {
      id: "pi",
      title: "Propriedade intelectual e tecnologia",
      body: "Assessoria envolvendo direitos autorais, licenciamento de software e transferência de tecnologia.",
      topics: ["Direitos autorais", "Licenciamento de software", "Transferência de tecnologia"],
    },
    {
      id: "compliance",
      title: "Consultoria e compliance",
      body: "Orientação jurídica e apoio à organização de práticas e decisões empresariais.",
      topics: ["Consultoria jurídica", "Programas de compliance", "Organização de práticas"],
    },
  ],
} as const;

/** Proposta editorial de apresentação do atendimento — validar com o escritório. */
export const approach = {
  eyebrow: "Abordagem",
  title: "Clareza para entender. Estratégia para decidir.",
  intro:
    "A proposta da Campos Visnadi é tornar o Direito compreensível e útil para quem decide. Uma forma de apresentar o caminho de uma demanda:",
  steps: [
    {
      title: "Entender o contexto",
      body: "Conversa sobre o negócio, a situação e o que precisa ser decidido.",
    },
    {
      title: "Definir o escopo",
      body: "Delimitação do que será tratado, com linguagem direta sobre o trabalho envolvido.",
    },
    {
      title: "Conduzir o trabalho jurídico",
      body: "Análise, elaboração ou negociação conforme o escopo combinado.",
    },
    {
      title: "Alinhar próximos passos",
      body: "Explicação clara do resultado e do que cabe à empresa decidir a seguir.",
    },
  ],
} as const;

export const office = {
  eyebrow: "Escritório",
  title: "Direito sem armadura.",
  body: [
    "A Campos Visnadi nasceu para desmistificar o Direito e torná-lo compreensível e acessível. No lugar do latim e das expressões difíceis, conversa franca e explicação clara.",
    "O diálogo do escritório é, principalmente, com empresas de tecnologia — negócios que se movem rápido e precisam de orientação jurídica no mesmo ritmo.",
  ],
} as const;

export const engagement = {
  eyebrow: "Formas de atuação",
  title: "O escopo começa pela compreensão da sua necessidade.",
  body: "Cada demanda tem tamanho, prazo e contexto próprios. Por isso, a definição do trabalho parte de uma conversa sobre a situação da sua empresa — sem pacotes prontos.",
  cta: { href: "#contato", label: "Conversar sobre uma demanda" },
} as const;

/** Apenas respostas sustentadas por fatos disponíveis. Perguntas operacionais sem
 * resposta confirmada estão em docs/content-pending.md e não são publicadas. */
export const faq = {
  eyebrow: "Perguntas frequentes",
  title: "Antes de conversar.",
  items: [
    {
      q: "Quais áreas de atuação são apresentadas pelo escritório?",
      a: "Para empresas de tecnologia, a atuação se concentra em contratos e negociações, propriedade intelectual e tecnologia (direitos autorais, licenciamento de software e transferência de tecnologia) e consultoria e compliance.",
    },
    {
      q: "O escritório atua com contratos de software?",
      a: "Sim. O licenciamento de direitos autorais e de software está entre as áreas de propriedade intelectual em que o escritório atua, assim como a negociação de contratos.",
    },
    {
      q: "Como iniciar o contato?",
      a: "Pelo formulário nesta página. Informe seu nome, e-mail e uma descrição breve da necessidade; a empresa é opcional.",
    },
    {
      q: "Quais informações apresentar no primeiro contato?",
      a: "Um resumo do contexto basta: o que sua empresa faz, qual é a situação e o que precisa ser decidido. Não envie documentos nem informações confidenciais nesse primeiro momento.",
    },
    {
      q: "Quem está à frente do escritório?",
      a: "Thiago de Campos Visnadi, fundador e sócio-titular, advogado inscrito na OAB/SP.",
    },
    {
      q: "Onde o escritório está localizado?",
      a: "A sede fica na Rua Francisco Lopes, 144, em Jundiaí/SP, CEP 13212-651.",
    },
  ],
} as const;

export const contact = {
  eyebrow: "Contato",
  title: "Vamos conversar sobre o contexto do seu negócio?",
  body: "Apresente brevemente sua necessidade para iniciar o contato com o escritório.",
  note: "Não inclua documentos ou informações confidenciais nesta mensagem.",
} as const;
