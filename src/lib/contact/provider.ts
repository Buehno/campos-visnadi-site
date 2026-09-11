import "server-only";
import type { ContactInput } from "./schema";
import type { SendResult } from "./handle";

/**
 * Provedor de envio: Resend (API REST, sem SDK).
 * Variáveis: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
 * Sem elas, o formulário opera em modo de demonstração e NÃO confirma envio.
 */
export function isContactConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL,
  );
}

export async function sendWithResend(data: ContactInput, submissionId: string): Promise<SendResult> {
  // Apenas fora de produção: força falha para testar o estado de erro.
  if (process.env.NODE_ENV !== "production" && process.env.CONTACT_FORCE_FAILURE === "true") {
    return { ok: false, reason: "provider_error" };
  }
  if (!isContactConfigured()) return { ok: false, reason: "not_configured" };

  const text = [
    `Nome: ${data.name}`,
    `E-mail: ${data.email}`,
    `Empresa: ${data.company || "—"}`,
    "",
    data.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        ...(submissionId ? { "Idempotency-Key": `contato-${submissionId}` } : {}),
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: data.email,
        subject: `Novo contato pelo site — ${data.name}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    // Não registra o conteúdo da mensagem; apenas o status.
    if (!res.ok) console.error(`[contato] provedor respondeu ${res.status}`);
    return res.ok ? { ok: true } : { ok: false, reason: "provider_error" };
  } catch {
    console.error("[contato] falha de rede ao chamar o provedor");
    return { ok: false, reason: "provider_error" };
  }
}
