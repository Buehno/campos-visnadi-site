import { describe, expect, it } from "vitest";
import { validateContact as client } from "./validate";
import { validateContact as server } from "./schema";

const ok = {
  name: "Ana Souza",
  email: "ana@empresa.com.br",
  company: "",
  message: "Precisamos revisar um contrato de licenciamento de software.",
};

const cases: Array<[string, Partial<typeof ok>]> = [
  ["válido", {}],
  ["nome vazio", { name: " " }],
  ["e-mail vazio", { email: "" }],
  ["e-mail sem domínio", { email: "ana@" }],
  ["e-mail sem arroba", { email: "ana.empresa.com" }],
  ["mensagem curta", { message: "curta" }],
  ["mensagem longa", { message: "a".repeat(1501) }],
  ["empresa longa", { company: "x".repeat(121) }],
];

describe("validação cliente × servidor", () => {
  it.each(cases)("mesmo resultado e mensagens: %s", (_label, patch) => {
    const input = { ...ok, ...patch };
    const c = client(input);
    const s = server(input);
    expect(c.ok).toBe(s.ok);
    if (!c.ok && !s.ok) expect(c.errors).toEqual(s.errors);
  });
});
