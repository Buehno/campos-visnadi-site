import { z } from "zod";

export const LIMITS = {
  name: 120,
  email: 160,
  company: 120,
  messageMin: 20,
  messageMax: 1500,
} as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome.")
    .max(LIMITS.name, `Use até ${LIMITS.name} caracteres.`),
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail.")
    .max(LIMITS.email, `Use até ${LIMITS.email} caracteres.`)
    .pipe(z.email("Informe um e-mail válido, como nome@empresa.com.br.")),
  company: z
    .string()
    .trim()
    .max(LIMITS.company, `Use até ${LIMITS.company} caracteres.`)
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .min(LIMITS.messageMin, `Descreva a necessidade em pelo menos ${LIMITS.messageMin} caracteres.`)
    .max(LIMITS.messageMax, "Use até 1.500 caracteres — os detalhes podem ficar para a conversa."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type FieldErrors = Partial<Record<ContactField, string>>;

export function validateContact(raw: Record<string, unknown>):
  | { ok: true; data: ContactInput }
  | { ok: false; errors: FieldErrors } {
  const result = contactSchema.safeParse(raw);
  if (result.success) return { ok: true, data: result.data };
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as ContactField;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}
