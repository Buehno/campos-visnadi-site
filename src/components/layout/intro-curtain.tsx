import { Wordmark } from "@/components/brand/wordmark";

/**
 * Abertura: tela na cor do fundo com o wordmark oficial "CAMPOS VISNADI"
 * (vetor extraído do arquivo de logo), que é revelado da esquerda para a
 * direita e sobe, liberando a página. 100% CSS (não depende de JS e se remove
 * sozinha); exibida uma vez por sessão (script em layout.tsx) e desativada em
 * reduced motion.
 */
export function IntroCurtain() {
  return (
    <div className="cv-intro" aria-hidden="true">
      <div className="cv-intro-inner">
        <Wordmark className="cv-intro-mark" />
        <span className="cv-intro-line" />
        <span className="cv-intro-sub">soluções jurídicas</span>
      </div>
    </div>
  );
}
