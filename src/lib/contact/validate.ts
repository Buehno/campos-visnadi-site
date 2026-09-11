import { LIMITS, MESSAGES } from "./rules";
import type { ContactField, FieldErrors } from "./schema";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validação de usabilidade no cliente, sem dependências (mantém o zod fora do
 * bundle do navegador). O servidor revalida com o schema zod.
 */
export function validateContact(
  v: Partial<Record<ContactField, string>>,
): { ok: true } | { ok: false; errors: FieldErrors } {
  const name = (v.name ?? "").trim();
  const email = (v.email ?? "").trim();
  const company = (v.company ?? "").trim();
  const message = (v.message ?? "").trim();
  const errors: FieldErrors = {};

  if (name.length < 2) errors.name = MESSAGES.nameMin;
  else if (name.length > LIMITS.name) errors.name = MESSAGES.nameMax;

  if (!email) errors.email = MESSAGES.emailRequired;
  else if (email.length > LIMITS.email) errors.email = MESSAGES.emailMax;
  else if (!EMAIL.test(email)) errors.email = MESSAGES.emailInvalid;

  if (company.length > LIMITS.company) errors.company = MESSAGES.companyMax;

  if (message.length < LIMITS.messageMin) errors.message = MESSAGES.messageMin;
  else if (message.length > LIMITS.messageMax) errors.message = MESSAGES.messageMax;

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true };
}
