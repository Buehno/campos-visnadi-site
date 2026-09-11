# Validação — 11/09/2026

Ambiente: Windows 11, Node 24.13.1, npm 11.8.0, Next.js 16.3.4 (Turbopack), Chrome estável local. Commit de referência: ver `git log` (medições feitas sobre o working tree do commit seguinte a `ba2e928`).

## Estado

| Item | Estado |
|------|--------|
| Build de produção (`next build`) | ✅ sem erros nem avisos; página estática |
| TypeScript (`tsc --noEmit`, strict) | ✅ |
| ESLint | ✅ |
| Testes (`vitest run`) | ✅ 18/18 — regras do envio (sucesso só com resposta válida do provedor, modo demo, falha recuperável, validação por campo, honeypot, tempo mínimo, duplicidade, limite de tentativas) + paridade cliente × servidor da validação |
| Envio real do formulário | ⛔ **não verificável** — sem credenciais do provedor. Caminho de sucesso coberto só por teste unitário com provedor simulado |

## Fluxos testados no navegador (dev server, Browser pane)

| Fluxo | Resultado |
|-------|-----------|
| Menu mobile (360 px) | abre, foco no 1º link, rolagem travada, `Esc` fecha e devolve foco ao botão |
| Âncoras | compensação do header via `scroll-padding-top`; `#trajetoria`, `#perguntas` etc. |
| FAQ | `aria-expanded`/`aria-controls`, painel fechado `inert`, abre/fecha |
| Validação do formulário | envio vazio → erros por campo, `aria-invalid`, foco no 1º inválido |
| Envio sem integração | exibe "Modo de demonstração… não foi enviada"; **não** mostra sucesso; valores preservados |
| Abertura em cursiva | aparece em sessão nova, sobe e revela header e hero; some sozinha (CSS) |
| Rolagem horizontal | 0 px em 360 e 390 px |
| Primeira dobra mobile | CTA principal termina a 508 px de 780 px |
| Hierarquia | 1 × H1; H2 por seção; H3 nos itens |

## Contraste (WCAG 2.2 AA) — calculado

ink/paper 15,7 · muted/paper 5,9 · muted/branco 6,3 · magenta-600/paper 6,4 · magenta-300/roxo 6,95 · on-dark-muted/roxo 10,0 · roxo-700/roxo-100 12,1 · erro/branco 6,5 · aviso 8,3 · borda de campo/paper 3,7 (≥ 3:1, 1.4.11) · foco magenta/paper 5,1.

## Lighthouse — mobile, build de produção

Configuração: Lighthouse 12.8.2, `--form-factor=mobile` (412×823, DPR 1,75, throttling simulado padrão 4× CPU / 150 ms RTT), Chrome headless, `next start` local, benchmarkIndex ≈ 2400.

**Antes das correções** (shader carregado no load, zod no cliente, GSAP no mount): performance 46 / 53 / 51 → **mediana 51**; TBT 1,3–1,9 s; LCP ~4,6 s. Causa: tarefa longa de 1,3 s na compilação do shader WebGL.

**Depois** (shader só com ponteiro fino após 1ª interação, validação do cliente sem zod, GSAP sob demanda):

| Execução | Perf | A11y | BP | SEO | LCP | TBT | CLS | FCP |
|----------|------|------|----|-----|-----|-----|-----|-----|
| 1 | 91 | 100 | 100 | 66 | 3,15 s | 49 ms | 0 | 1,05 s |
| 2 | 94 | 100 | 100 | 66 | 3,14 s | 38 ms | 0 | 0,91 s |
| 3 | 91 | 100 | 100 | 66 | 3,26 s | 149 ms | 0 | 1,03 s |
| (4, extra) | 91 | 100 | 100 | 66 | 3,11 s | 25 ms | 0 | 1,00 s |

**Mediana (1–3): performance 91 · LCP 3,15 s · TBT 49 ms · CLS 0.**

- **LCP acima da meta de 2,5 s**: a abertura em cursiva (pedido do cliente) segura a entrada do conteúdo por ~1,75 s. Sem a abertura, o LCP medido antes estava limitado por JS, não pela cortina. Opções: encurtar a abertura para ~1 s, ou exibi-la só na primeira visita (já é 1× por sessão).
- **SEO 66**: única falha é `is-crawlable` — o preview está com `noindex` de propósito. Com `SITE_INDEXABLE=true` em produção esse item passa.
- Resultados de laboratório. **INP e dados de campo não validados** (exigem usuários reais — CrUX/RUM após publicação).

## Não verificável neste ambiente

- Envio real de e-mail (sem credenciais).
- Zoom 200 % e leitor de tela (NVDA/VoiceOver) — reflow em 320 px foi coberto pela lógica de layout e teste em 360 px, mas leitura com leitor de tela não foi feita.
- `prefers-reduced-motion`: implementado em CSS/JS e revisado no código; não emulado no Browser pane.
- Foto do fundador: pipeline pronto, arquivo não fornecido.
