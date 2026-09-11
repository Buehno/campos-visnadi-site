import { z } from "zod";
import { LIMITS, MESSAGES } from "./rules";

export { LIMITS };

/** Validação de integridade no servidor. O cliente usa ./validate (sem zod). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, MESSAGES.nameMin).max(LIMITS.name, MESSAGES.nameMax),
  email: z
    .string()
    .trim()
    .min(1, MESSAGES.emailRequired)
    .max(LIMITS.email, MESSAGES.emailMax)
    .pipe(z.email(MESSAGES.emailInvalid)),
  company: z.string().trim().max(LIMITS.company, MESSAGES.companyMax).optional().default(""),
  message: z
    .string()
    .trim()
    .min(LIMITS.messageMin, MESSAGES.messageMin)
    .max(LIMITS.messageMax, MESSAGES.messageMax),
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
