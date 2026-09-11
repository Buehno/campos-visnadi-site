/** Limites e mensagens compartilhados entre cliente e servidor (sem dependências). */
export const LIMITS = {
  name: 120,
  email: 160,
  company: 120,
  messageMin: 20,
  messageMax: 1500,
} as const;

export const MESSAGES = {
  nameMin: "Informe seu nome.",
  nameMax: `Use até ${LIMITS.name} caracteres.`,
  emailRequired: "Informe seu e-mail.",
  emailMax: `Use até ${LIMITS.email} caracteres.`,
  emailInvalid: "Informe um e-mail válido, como nome@empresa.com.br.",
  companyMax: `Use até ${LIMITS.company} caracteres.`,
  messageMin: `Descreva a necessidade em pelo menos ${LIMITS.messageMin} caracteres.`,
  messageMax: "Use até 1.500 caracteres — os detalhes podem ficar para a conversa.",
} as const;
