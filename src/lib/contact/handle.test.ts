import { describe, expect, it, vi } from "vitest";
import { handleContact, type ContactDeps } from "./handle";

const NOW = 1_000_000;

function form(overrides: Record<string, string> = {}) {
  const fd = new FormData();
  const base = {
    name: "Ana Souza",
    email: "ana@empresa.com.br",
    company: "Empresa X",
    message: "Precisamos revisar um contrato de licenciamento de software com um cliente.",
    submissionId: "sub-1",
    startedAt: String(NOW - 10_000),
    website: "",
    ...overrides,
  };
  for (const [k, v] of Object.entries(base)) fd.set(k, v);
  return fd;
}

function deps(overrides: Partial<ContactDeps> = {}): ContactDeps {
  const sent = new Set<string>();
  return {
    send: vi.fn(async () => ({ ok: true as const })),
    allow: () => true,
    seen: (id) => sent.has(id),
    remember: (id) => void sent.add(id),
    now: () => NOW,
    ...overrides,
  };
}

describe("handleContact", () => {
  it("confirma envio somente quando o provedor responde com sucesso", async () => {
    const d = deps();
    const res = await handleContact(form(), "ip", d);
    expect(res.status).toBe("success");
    expect(d.send).toHaveBeenCalledOnce();
  });

  it("não confirma envio quando a integração não está configurada (modo demonstração)", async () => {
    const res = await handleContact(form(), "ip", deps({ send: async () => ({ ok: false, reason: "not_configured" }) }));
    expect(res.status).toBe("demo");
    expect(res.message).toMatch(/não foi enviada/);
  });

  it("retorna erro recuperável quando o provedor falha", async () => {
    const res = await handleContact(form(), "ip", deps({ send: async () => ({ ok: false, reason: "provider_error" }) }));
    expect(res.status).toBe("error");
    expect(res.message).toMatch(/tente novamente/);
  });

  it("valida no servidor e devolve erro por campo, sem chamar o provedor", async () => {
    const d = deps();
    const res = await handleContact(form({ email: "sem-arroba", message: "curta" }), "ip", d);
    expect(res.status).toBe("invalid");
    expect(res.fieldErrors?.email).toMatch(/e-mail válido/);
    expect(res.fieldErrors?.message).toMatch(/pelo menos 20/);
    expect(res.fieldErrors?.name).toBeUndefined();
    expect(d.send).not.toHaveBeenCalled();
  });

  it("aceita empresa vazia (campo opcional)", async () => {
    const res = await handleContact(form({ company: "" }), "ip", deps());
    expect(res.status).toBe("success");
  });

  it("rejeita mensagens acima do limite", async () => {
    const res = await handleContact(form({ message: "a".repeat(1501) }), "ip", deps());
    expect(res.status).toBe("invalid");
    expect(res.fieldErrors?.message).toBeDefined();
  });

  it("descarta silenciosamente honeypot preenchido", async () => {
    const d = deps();
    const res = await handleContact(form({ website: "http://spam" }), "ip", d);
    expect(res.status).toBe("success");
    expect(d.send).not.toHaveBeenCalled();
  });

  it("descarta envio rápido demais (robô)", async () => {
    const d = deps();
    await handleContact(form({ startedAt: String(NOW - 500) }), "ip", d);
    expect(d.send).not.toHaveBeenCalled();
  });

  it("não reenvia a mesma submissão (duplicidade)", async () => {
    const d = deps();
    await handleContact(form(), "ip", d);
    const again = await handleContact(form(), "ip", d);
    expect(again.status).toBe("success");
    expect(d.send).toHaveBeenCalledOnce();
  });

  it("aplica limite de tentativas", async () => {
    const d = deps({ allow: () => false });
    const res = await handleContact(form(), "ip", d);
    expect(res.status).toBe("rate_limited");
    expect(d.send).not.toHaveBeenCalled();
  });
});
