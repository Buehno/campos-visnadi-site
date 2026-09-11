import { validateContact, type ContactInput, type FieldErrors } from "./schema";

export type ContactStatus =
  | "idle"
  | "success"
  | "invalid"
  | "error"
  | "demo"
  | "rate_limited";

export type ContactState = {
  status: ContactStatus;
  message?: string;
  fieldErrors?: FieldErrors;
  /** Identificador da submissão, devolvido para evitar reenvio duplicado. */
  submissionId?: string;
};

export type SendResult = { ok: true } | { ok: false; reason: "not_configured" | "provider_error" };

export type ContactDeps = {
  send: (data: ContactInput, submissionId: string) => Promise<SendResult>;
  allow: (key: string) => boolean;
  seen: (submissionId: string) => boolean;
  remember: (submissionId: string) => void;
  now: () => number;
};

const MIN_FILL_MS = 2500;

/** Regras de negócio do envio, isoladas para teste (sem Next/servidor). */
export async function handleContact(
  form: FormData,
  clientKey: string,
  deps: ContactDeps,
): Promise<ContactState> {
  const submissionId = String(form.get("submissionId") ?? "").slice(0, 64);

  // Anti-spam silencioso: honeypot preenchido ou envio rápido demais.
  const honeypot = String(form.get("website") ?? "");
  const startedAt = Number(form.get("startedAt") ?? 0);
  if (honeypot || (startedAt && deps.now() - startedAt < MIN_FILL_MS)) {
    return { status: "success", message: "Mensagem enviada.", submissionId };
  }

  if (submissionId && deps.seen(submissionId)) {
    return {
      status: "success",
      message: "Esta mensagem já foi enviada. O escritório recebeu seu contato.",
      submissionId,
    };
  }

  const parsed = validateContact({
    name: form.get("name") ?? "",
    email: form.get("email") ?? "",
    company: form.get("company") ?? "",
    message: form.get("message") ?? "",
  });
  if (!parsed.ok) {
    return {
      status: "invalid",
      message: "Revise os campos indicados.",
      fieldErrors: parsed.errors,
      submissionId,
    };
  }

  if (!deps.allow(clientKey)) {
    return {
      status: "rate_limited",
      message: "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.",
      submissionId,
    };
  }

  const result = await deps.send(parsed.data, submissionId);
  if (result.ok) {
    if (submissionId) deps.remember(submissionId);
    return {
      status: "success",
      message: "Mensagem enviada. O escritório recebeu seu contato.",
      submissionId,
    };
  }
  if (result.reason === "not_configured") {
    return {
      status: "demo",
      message:
        "Modo de demonstração: a integração de envio ainda não está configurada. Sua mensagem não foi enviada.",
      submissionId,
    };
  }
  return {
    status: "error",
    message: "Não foi possível enviar agora. Seus dados continuam no formulário — tente novamente.",
    submissionId,
  };
}
