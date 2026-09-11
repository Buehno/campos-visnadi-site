/**
 * Conteúdo institucional centralizado.
 *
 * Fontes: skill institucional "campos-visnadi", documentos de marca, certificado
 * INPI, perfil profissional de Thiago de Campos Visnadi (LinkedIn, PDF) e
 * informações confirmadas pelo cliente em 11/09/2026 (atuação ampla: compliance,
 * contratos, ações judiciais, registro de marca, processo civil, prevenção de
 * fraudes). Textos marcados como proposta editorial aguardam revisão —
 * ver docs/content-pending.md.
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
    shortName: "Thiago Visnadi",
    role: "Fundador e sócio-titular",
    registration: "Advogado inscrito na OAB/SP",
    specialty: "Especialista em Direito Digital e Proteção de Dados",
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
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#abordagem", label: "Abordagem" },
  { href: "#perguntas", label: "Perguntas frequentes" },
] as const;

export const contactCta = { href: "#contato", label: "Entrar em contato" } as const;

export const hero = {
  eyebrow: "Soluções jurídicas para empresas",
  title: "O Direito pode ser inovador.",
  lead: "Advocacia empresarial com clareza e visão estratégica — de compliance e contratos a ações judiciais e registro de marca.",
  primary: contactCta,
  secondary: { href: "#atuacao", label: "Conhecer a atuação" },
} as const;

/** Proposta editorial: situações ilustrativas, não aconselhamento individual. */
export const context = {
  eyebrow: "Contexto",
  title: "Decisões do negócio também passam pelo jurídico.",
  intro:
    "Crescer envolve contratos, responsabilidades, marca e, às vezes, disputas. Situações em que orientação jurídica clara faz diferença:",
  items: [
    {
      title: "Contratos com clientes, parceiros e fornecedores",
      body: "Um novo cliente envia o próprio contrato. Uma parceria exige regras sobre responsabilidades. Um fornecedor passa a operar parte do negócio. Cada relação pede termos que o time consiga entender e cumprir.",
    },
    {
      title: "Compliance e prevenção de fraudes",
      body: "Políticas internas coerentes, papéis definidos e controles documentados reduzem a exposição da empresa a irregularidades — e ajudam a agir rápido quando algo foge do previsto.",
    },
    {
      title: "Disputas que chegam ao Judiciário",
      body: "Quando a negociação não resolve, a empresa precisa de condução técnica do processo civil e de explicações claras sobre riscos, etapas e decisões.",
    },
    {
      title: "Marca e ativos intelectuais",
      body: "Nome, marca, software e conteúdo são patrimônio. Registrar e proteger esses ativos evita disputas e dá segurança para crescer.",
    },
  ],
} as const;

/** Áreas confirmadas pelo cliente e alinhadas ao registro INPI. Redação proposta. */
export const practice = {
  eyebrow: "Atuação",
  title: "Soluções jurídicas para toda a operação.",
  intro:
    "Atendimento full service para empresas tradicionais e startups — da prevenção ao contencioso.",
  areas: [
    {
      id: "compliance",
      title: "Compliance empresarial e prevenção de fraudes",
      body: "Estruturação de programas de integridade, políticas internas, controles e orientação para identificar, prevenir e responder a riscos e irregularidades.",
      topics: ["Programas de compliance", "Políticas e controles internos", "Prevenção de fraudes", "Auditoria e consultoria"],
    },
    {
      id: "contratos",
      title: "Contratos e negociações",
      body: "Elaboração, revisão e negociação de contratos com clientes, parceiros e fornecedores.",
      topics: ["Elaboração e revisão", "Negociação de termos"],
    },
    {
      id: "contencioso",
      title: "Ações judiciais e processo civil",
      body: "Condução de ações judiciais e acompanhamento de processos, com comunicação clara em cada etapa.",
      topics: ["Contencioso cível", "Acompanhamento processual"],
    },
    {
      id: "marcas",
      title: "Registro de marca e propriedade intelectual",
      body: "Registro e proteção de marcas, direitos autorais e licenciamento de software.",
      topics: ["Registro de marca", "Direitos autorais"],
    },
    {
      id: "digital",
      title: "Direito digital e proteção de dados",
      body: "Adequação de práticas e documentos ao tratamento de dados pessoais e aos desafios do ambiente digital.",
      topics: ["Proteção de dados", "Termos e políticas"],
    },
    {
      id: "consultoria",
      title: "Consultoria jurídica empresarial",
      body: "Orientação preventiva para decisões do dia a dia, mediação e resolução extrajudicial de conflitos.",
      topics: ["Consultoria preventiva", "Mediação"],
    },
  ],
} as const;

/** Trajetória: apenas marcos jurídicos (perfil profissional + INPI). */
export const journey = {
  eyebrow: "Trajetória",
  title: "Quem está à frente da marca.",
  intro:
    "Thiago de Campos Visnadi fundou o escritório com mentalidade empreendedora, ágil e tecnológica para aproximar o Direito das decisões de negócio.",
  highlights: [
    "Advogado inscrito na OAB/SP",
    "Especialista em Direito Digital e Proteção de Dados",
    "Membro da ANPPD",
    "Mentor jurídico de startups",
    "Professor e palestrante",
  ],
  milestones: [
    {
      period: "2014 — 2018",
      title: "Bacharelado em Direito",
      place: "Centro Universitário Padre Anchieta",
      body: "Formação jurídica em Jundiaí/SP.",
    },
    {
      period: "2018 — 2019",
      title: "Advocacia cível na prática",
      place: "Del Pra Sociedade de Advogados",
      body: "Elaboração de peças processuais, pesquisa e atuação na área cível com processo eletrônico.",
    },
    {
      period: "2019",
      title: "Fundação do escritório",
      place: "Jundiaí/SP",
      body: "Nasce o escritório que hoje é a Campos Visnadi Soluções Jurídicas, com proposta full service para startups e empresas tradicionais.",
    },
    {
      period: "2020 — 2021",
      title: "Pós-graduação em Direito, Tecnologia e Inovação",
      place: "Instituto New Law",
      body: "Especialização lato sensu com ênfase em Proteção de Dados.",
    },
    {
      period: "2022 — hoje",
      title: "Mentoria jurídica para startups e empresas",
      place: "Inovenow · eMentor",
      body: "Mentor jurídico com foco empresarial e digital para empreendedores e negócios em crescimento.",
    },
    {
      period: "2025",
      title: "Marca registrada no INPI",
      place: "Processo nº 933204183",
      body: "Registro da marca Campos Visnadi Soluções Jurídicas concedido na classe 45, vigente até 2035.",
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
    { title: "Entender o contexto", body: "Conversa sobre o negócio, a situação e o que precisa ser decidido." },
    { title: "Definir o escopo", body: "Delimitação do que será tratado, com linguagem direta sobre o trabalho envolvido." },
    { title: "Conduzir o trabalho jurídico", body: "Análise, elaboração, negociação ou atuação judicial conforme o escopo combinado." },
    { title: "Alinhar próximos passos", body: "Explicação clara do resultado e do que cabe à empresa decidir a seguir." },
  ],
} as const;

export const office = {
  eyebrow: "Escritório",
  title: "Direito sem armadura.",
  body: [
    "A Campos Visnadi nasceu para desmistificar o Direito e torná-lo compreensível e acessível. No lugar do latim e das expressões difíceis, conversa franca e explicação clara.",
    "O escritório atende empresas tradicionais e de tecnologia — negócios que precisam de orientação jurídica no ritmo das suas decisões.",
  ],
} as const;

export const engagement = {
  eyebrow: "Formas de atuação",
  title: "O escopo começa pela compreensão da sua necessidade.",
  body: "Cada demanda tem tamanho, prazo e contexto próprios. Por isso, a definição do trabalho parte de uma conversa sobre a situação da sua empresa — sem pacotes prontos.",
  cta: { href: "#contato", label: "Conversar sobre uma demanda" },
} as const;

/** Apenas respostas sustentadas por fatos disponíveis/confirmados. */
export const faq = {
  eyebrow: "Perguntas frequentes",
  title: "Antes de conversar.",
  items: [
    {
      q: "Em quais áreas o escritório atua?",
      a: "Compliance empresarial e prevenção de fraudes, contratos e negociações, ações judiciais e processo civil, registro de marca e propriedade intelectual, direito digital e proteção de dados, além de consultoria jurídica empresarial.",
    },
    {
      q: "O escritório atua em ações judiciais?",
      a: "Sim. O escritório conduz ações judiciais e acompanha processos na área cível, além de atuar de forma preventiva e extrajudicial.",
    },
    {
      q: "O escritório atende apenas empresas de tecnologia?",
      a: "Não. O atendimento é full service para empresas tradicionais e startups. A experiência com tecnologia, dados e inovação é um diferencial, não um limite.",
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
