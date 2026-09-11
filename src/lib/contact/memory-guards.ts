import "server-only";

/**
 * Proteções em memória do processo. Adequadas a uma instância única; em
 * ambiente serverless com várias instâncias, trocar por armazenamento
 * compartilhado (ex.: Upstash/Redis) — ver docs/validation.md.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
const sent = new Map<string, number>();

export function allow(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

export function seen(id: string, now = Date.now()) {
  for (const [k, t] of sent) if (now - t > WINDOW_MS) sent.delete(k);
  return sent.has(id);
}

export function remember(id: string, now = Date.now()) {
  sent.set(id, now);
}
