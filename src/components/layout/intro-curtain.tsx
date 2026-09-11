/**
 * Abertura: tela na cor do fundo com "Campos Visnadi" em cursiva, que sobe e
 * revela a página. 100% CSS (não depende de JS e se remove sozinha); exibida
 * uma vez por sessão (script em layout.tsx) e desativada em reduced motion.
 */
export function IntroCurtain() {
  return (
    <div className="cv-intro" aria-hidden="true">
      <div className="cv-intro-inner">
        <span className="cv-intro-script">Campos Visnadi</span>
        <span className="cv-intro-line" />
        <span className="cv-intro-sub">soluções jurídicas</span>
      </div>
    </div>
  );
}
