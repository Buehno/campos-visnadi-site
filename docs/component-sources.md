# Referências e origem dos componentes

Consulta ao 21st.dev feita em 11/09/2026. As páginas de categoria listam componentes, mas o código-fonte de vários deles não é exposto sem login/instalação via CLI — onde não foi possível inspecionar o código, isso está dito abaixo e a implementação é original.

## Incorporados (código adaptado)

### Motion Footer — rodapé em cortina
- Página: https://21st.dev/community/components/easemize/motion-footer/default
- Autor: Hossain Jahed (@jahed), publicado em 30/03/2026. **Licença não informada na página** — confirmar com o autor antes da publicação comercial ou manter apenas a técnica (curtain reveal com `clip-path` + `position: fixed`), que é de domínio comum.
- Código recebido do cliente na conversa; dependência `gsap`.
- Arquivo: `src/components/ui/motion-footer.tsx`
- Adaptações: conteúdo real do escritório; removidos marquee infinito, aurora pulsante, grid de fundo, batimento e `backdrop-filter` (loops contínuos e glassmorphism conflitam com o briefing); `@import` de Google Fonts removido (fontes via `next/font`); magnetismo limitado a 6 px, só com ponteiro fino e sem reduced motion; cortina e *scrub* só em viewport ≥ 768×700 — em telas menores, zoom 200% ou reduced motion o rodapé volta ao fluxo normal (sem conteúdo cortado); GSAP carregado sob demanda (`import()`), `gsap.matchMedia` para reverter.

### Liquid Metal Button — borda metálica
- Código recebido do cliente na conversa (origem v0/21st, sem página específica informada). Shader: `@paper-design/shaders` (MIT? — verificar `node_modules/@paper-design/shaders/LICENSE` antes de publicar; pacote público no npm).
- Arquivo: `src/components/ui/liquid-metal-button.tsx`
- Adaptações: API atual da lib (0.0.80: `dispose()` no lugar de `destroy()`, `u_image` vazio, uniforms de dimensionamento); dimensões fluidas (envolve qualquer botão/link); shader importado depois da hidratação via `requestIdleCallback` (não compete com o LCP); fallback metálico em CSS; parado em reduced motion; rótulo com contraste AA (o original usava #666 sobre preto, ~3:1); foco visível; removidos ripple e camadas 3D. Usado em **dois** pontos: CTA principal do hero e envio do formulário.

## Referências consultadas (sem código incorporado)

| Papel | Componente | Endereço | Autor / licença | Uso |
|-------|-----------|----------|-----------------|-----|
| Hero (referência principal de composição) | Animated hero | https://21st.dev/@tommyjepsen/components/animated-hero | Tommy Jepsen · MIT | Estrutura texto + dois CTAs com entrada animada. Não incorporado: depende de `framer-motion` e anima palavras em loop; o projeto usa GSAP e entrada CSS única. |
| Navegação | Header | https://21st.dev/@tommyjepsen/components/header | Tommy Jepsen · MIT | Referência de header com CTA à direita. Código não exposto na página; implementação própria em `site-header.tsx` (menu mobile com foco preso, Escape, restauração de foco). |
| FAQ | Shadcn Accordion | https://21st.dev/community/components/shadcnspace/shadcn-accordion | ShadcnSpace · licença não informada | Referência de accordion com divisórias. Implementação própria leve (`ui/accordion.tsx`) no padrão WAI-ARIA, sem Radix — FAQ é puramente apresentacional. |
| Cards / painéis | Categoria "card" | https://21st.dev/community/components/s/card | — | A página de categoria não retornou componentes específicos inspecionáveis. Painéis de Atuação são originais (grid assimétrico 7/5). |
| CTA final | — | — | — | O rodapé em cortina cumpre o papel de CTA final. |

## Primitivas e bibliotecas

| Pacote | Versão | Licença | Por quê |
|--------|--------|---------|---------|
| next | 16.3.4 | MIT | App Router, `next/font`, `next/image`, Server Actions |
| react / react-dom | 19.2.8 | MIT | — |
| tailwindcss | 4.x | MIT | Tokens via `@theme` |
| shadcn (CLI) + cn | 4.21 / 0.2.6 | MIT | Estrutura `components/ui`, utilitário `cn` |
| gsap | 3.15.0 | Licença padrão GSAP (gratuita, inclusive uso comercial) | **Única biblioteca de animação JS** (ver design-direction.md) |
| @paper-design/shaders | 0.0.80 | ver LICENSE do pacote | Shader liquid metal |
| zod | 4.6.2 | MIT | Validação cliente/servidor |
| lucide-react | 1.44.0 | ISC | Ícones importados individualmente |
| vitest | 5.0.0 (dev) | MIT | Testes de comportamento do contato |
