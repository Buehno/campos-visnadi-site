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
    registration: "Advogado inscrito na OAB/SP 424.849",
    specialty: "Especialista em Direito Digital e Proteção de Dados",
  },
  // Endereço confirmado pelo cliente em 14/09/2026 (substitui o da skill).
  address: {
    street: "Rua Barão de Teffé, 160 · Sala 505",
    neighborhood: "Jardim Ana Maria",
    city: "Jundiaí",
    state: "SP",
    postalCode: "13208-760",
  },
  trademark: {
    office: "INPI",
    process: "933204183",
    niceClass: "45",
    grantedAt: "09/09/2025",
    validUntil: "09/09/2035",
  },
  values: ["Transparência", "Comunicação", "Qualidade", "Agilidade", "Gestão", "Estratégia"],
} as const;

/** Missão, visão e valores confirmados pelo escritório em 14/09/2026. */
export const identity = {
  mission:
    "Revolucionar a prestação de serviços jurídicos para impactar e transformar negócios de forma ativa.",
  vision:
    "Ser reconhecido como um escritório inovador, através de visão estratégica jurídica e comercial, com entrega ágil, transparente e clareza na comunicação.",
  values: [
    { name: "Transparência", text: "falamos a verdade sem medo" },
    { name: "Comunicação", text: "somos acessíveis" },
    { name: "Qualidade", text: "evolução é um reflexo da vida" },
    { name: "Agilidade", text: "tempo é o bem mais precioso" },
    { name: "Gestão", text: "focamos no resultado" },
    { name: "Estratégia", text: "vamos além do óbvio" },
  ],
} as const;

/** Canais oficiais confirmados pelo cliente em 14/09/2026. */
export const channels = {
  email: "contato@camposvisnadi.com.br",
  phoneDisplay: "+55 11 94133-2481",
  phoneHref: "tel:+5511941332481",
  // Mesmo número atende o WhatsApp (Chatguru).
  whatsappHref: "https://wa.me/5511941332481",
  social: [
    { label: "Instagram", handle: "@campos_visnadi", href: "https://www.instagram.com/campos_visnadi/" },
    { label: "LinkedIn", handle: "Campos Visnadi", href: "https://www.linkedin.com/company/campos-visnadi-solucoes-juridicas/" },
    { label: "Facebook", handle: "@camposvisnadi", href: "https://www.facebook.com/camposvisnadi" },
  ],
  founderLinkedin: "https://www.linkedin.com/in/thiago-de-campos-visnadi-81439234/",
} as const;

/** Indicadores informados pelo escritório em 14/09/2026. */
export const stats = {
  eyebrow: "Em números",
  title: "O trabalho, em números.",
  primary: {
    value: 150,
    prefix: "+ de",
    label: "Empresas assessoradas",
    body: "Negócios tradicionais e startups atendidos em diferentes áreas do Direito.",
  },
  secondary: {
    value: 700,
    prefix: "+ de",
    label: "Processos geridos",
    body: "Ações judiciais e procedimentos conduzidos e acompanhados pelo escritório.",
  },
  since: { value: 2019, label: "Desde" },
  coffee: { label: "Cafés compartilhados", body: "Toda boa estratégia começa com uma boa conversa." },
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

/** Áreas confirmadas pelo cliente e alinhadas ao registro INPI. Redação proposta. */
export const practice = {
  eyebrow: "Atuação",
  title: "Compliance e soluções jurídicas para toda a operação.",
  intro: "Atendimento personalizado — da prevenção ao contencioso.",
  areas: [
    {
      id: "compliance",
      title: "Compliance empresarial e prevenção de fraudes",
      body: "Diagnóstico, estruturação, implementação e manutenção do programa de compliance, programas de integridade, políticas e controles internos e treinamentos.",
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
      title: "Contencioso judicial",
      body: "Gestão de processos, análise de riscos, definição de estratégia, participação de audiências e negociações.",
      topics: ["Cível", "Trabalhista", "Cobranças"],
    },
    {
      id: "marcas",
      title: "Propriedade Intelectual e Industrial",
      body: "Registro de marcas e patentes, contratos de tecnologia, licenciamentos e acompanhamento.",
      topics: ["Pesquisa prévia", "Protocolo do registro", "Acompanhamento"],
    },
    {
      id: "digital",
      title: "Direito digital e proteção de dados",
      body: "Adequação de práticas e documentos ao tratamento de dados pessoais e aos desafios do ambiente digital.",
      topics: ["Proteção de dados", "Termos e políticas"],
    },
    {
      id: "consultoria",
      title: "Assessoria e Consultoria Jurídica Empresarial",
      body: "Orientação estratégica jurídica e comercial para decisões simples e complexas do dia a dia.",
      topics: ["Assessoria", "Consultoria", "Advocacia Ativa"],
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
    "Advogado inscrito na OAB/SP 424.849",
    "MBA em Compliance",
    "Especialista em Direito Digital e Proteção de Dados",
    "Mentor Jurídico de Startups",
    "Professor e Palestrante",
  ],
  milestones: [
    {
      period: "2014 — 2018",
      title: "Bacharelado em Direito",
      place: "Centro Universitário Padre Anchieta",
      body: "Formação jurídica em Jundiaí/SP.",
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
      period: "2026 — 2027",
      title: "MBA em Compliance",
      place: "LEC — Legal, Ethics and Compliance",
      body: "Formação abrangente para o setor privado, público e terceiro setor.",
    },
  ],
} as const;

/** Proposta editorial de apresentação do atendimento — validar com o escritório. */
export const approach = {
  eyebrow: "Abordagem",
  title: "Clareza para entender. Estratégia para decidir.",
  intro:
    "A proposta do escritório é tornar o Direito compreensível, útil e prático para quem decide. Somos o seu sócio jurídico para:",
  steps: [
    { title: "Entender o contexto", body: "Entender sobre o negócio de acordo com o momento e aonde quer chegar." },
    { title: "Definir o escopo", body: "Alinhar a estratégia de aplicação dos serviços com base em necessidade e análise de risco." },
    { title: "Condução dos trabalhos", body: "Aplicação dos serviços lado a lado com a empresa, de ponta a ponta." },
    { title: "Alinhamento e correção de rota", body: "Acompanhamento ativo para manutenção e correção, rumo ao alcance dos resultados." },
  ],
} as const;

export const office = {
  eyebrow: "Escritório",
  // Filosofia confirmada pelo escritório em 14/09/2026.
  philosophy: [
    "Nossa motivação é descobrir o mundo de possibilidades. Desafios e pedras no caminho só deixam tudo mais motivador.",
    "Queremos deixar nossa marca entregando excelência. Se a realidade não for adaptável, criamos uma nova.",
  ],
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
      a: "Pelo formulário nesta página, pelo WhatsApp +55 11 94133-2481 ou pelo e-mail contato@camposvisnadi.com.br.",
    },
    {
      q: "Quais informações apresentar no primeiro contato?",
      a: "Um resumo do contexto basta: o que sua empresa faz, qual é a situação e o que precisa ser decidido. Não envie documentos nem informações confidenciais nesse primeiro momento.",
    },
    {
      q: "Onde o escritório está localizado?",
      a: "A sede fica na Rua Barão de Teffé, 160, sala 505, Jardim Ana Maria, em Jundiaí/SP, CEP 13208-760.",
    },
  ],
} as const;

export const contact = {
  eyebrow: "Contato",
  title: "Vamos conversar sobre o contexto do seu negócio?",
  body: "Apresente brevemente sua necessidade para iniciar o contato com o escritório.",
  note: "Não inclua documentos ou informações confidenciais nesta mensagem.",
} as const;
