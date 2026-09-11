/**
 * Executa `cb` uma vez, em momento ocioso, depois da primeira interação real
 * (rolagem, ponteiro, toque ou teclado). Mantém bibliotecas de efeito fora da
 * janela de carregamento (LCP/TBT). Retorna a função de cancelamento.
 */
export function onFirstInteraction(cb: () => void, timeout = 1200) {
  const events = ["scroll", "wheel", "pointermove", "pointerdown", "touchstart", "keydown"] as const;
  const w = window as Window & {
    requestIdleCallback?: (fn: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  let fired = false;
  let handle: number | undefined;

  const remove = () => events.forEach((e) => window.removeEventListener(e, fire));
  function fire() {
    if (fired) return;
    fired = true;
    remove();
    handle = w.requestIdleCallback ? w.requestIdleCallback(cb, { timeout }) : window.setTimeout(cb, 1);
  }
  events.forEach((e) => window.addEventListener(e, fire, { passive: true }));

  return () => {
    remove();
    if (handle === undefined) return;
    if (w.cancelIdleCallback) w.cancelIdleCallback(handle);
    else window.clearTimeout(handle);
  };
}
