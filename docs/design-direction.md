# Direção de design — Campos Visnadi

**Conceito editorial:** "Clareza jurídica para negócios em movimento." (proposto para o site; não substitui a tagline "O Direito pode ser inovador.")

## Assinatura

**A diagonal do "V" + o cartão do fundador.** O corte diagonal do símbolo oficial (≈62°) vira o eixo da página: atravessa o hero atrás do cartão e reaparece, discreto, na Abordagem e em Formas de atuação. É um gesto da marca, não um novo logo: símbolo e wordmark oficiais são usados sem alteração de forma.

A pedido do cliente, o hero apresenta **quem responde pela marca**: um cartão em relevo com a foto recortada de Thiago de Campos Visnadi saindo do topo (camadas em `translateZ`, inclinação ≤ 6° ao ponteiro), placa com nome, cargo e OAB/SP. Na abertura, uma tela roxa com "Campos Visnadi" em cursiva (Great Vibes) é "escrita" e sobe, revelando o header e depois o cartão. A primeira versão do hero (planos translúcidos abstratos) foi substituída.

## Paleta (tokens em `src/app/globals.css`)

| Token | Hex | Uso |
|-------|-----|-----|
| paper | #F8F6F3 | fundo predominante |
| surface | #FFFFFF | seções alternadas, painéis, formulário |
| roxo-900 | #1A0A24 | hero, Abordagem, rodapé, botão primário |
| magenta-600 | #A81D6C | texto de destaque sobre claro (6,4:1) |
| magenta-500 | #C0247E | foco, gradiente |
| magenta-300 | #E27BB5 | destaque sobre roxo (6,95:1) — ajuste de interface |
| laranja-500 | #E07B2E | só gráfico sobre claro; nó do hero |
| ink | #211A27 | texto principal (15,7:1) |
| muted | #645D6A | texto secundário (5,9:1) |
| line / input-line | #E6DFE8 / #857B8B | divisórias / borda de campo (3,7:1) |

Gradiente institucional apenas em: traço do hero, barras de 3 px (eyebrow, painel principal), sublinhado da navegação, diagonal decorativa.

**Ajuste em relação ao briefing:** magenta #C0247E sobre roxo cai para ~3,4:1 — por isso, sobre fundo escuro, o destaque usa magenta-300 (#E27BB5). Sobre claro, texto em magenta usa magenta-600.

## Tipografia — decisão de marca

O briefing propunha Manrope + Source Sans 3. O wordmark oficial é uma **sans condensada, pesada, caixa alta**, e o skill institucional recomenda títulos condensados. Conflito resolvido a favor da marca: **Barlow Condensed** (600/700) nos títulos — ecoa o logotipo — e **Source Sans 3** (400/600) no corpo. Duas famílias, quatro pesos, via `next/font` (auto-hospedadas, licença SIL OFL). Títulos fluidos com `clamp()`, corpo 17 px, entrelinha 1,6, texto corrido limitado a ~60–68 caracteres.

## Layout

Container 1240 px; grid de 12 colunas no desktop; laterais 20/32/48 px; seções 72 / 104 / 136 px. Raios 12–20 px nos painéis, pills (999) nos botões — dialogam com o círculo do símbolo. Sombras tingidas de roxo, dois níveis.

Ritmo: escuro (hero) → claro editorial (Contexto, lista numerada com divisórias) → branco (Atuação, grid assimétrico 7/5) → escuro (Abordagem, linha de progressão) → claro (Escritório, composição tipográfica + fatos) → bloco lilás (Formas de atuação) → branco (FAQ) → claro (Contato) → escuro (rodapé em cortina).

## Movimento

**Uma biblioteca JS de animação: GSAP.** O briefing pedia Motion; o cliente pediu depois a integração do Motion Footer (GSAP). Para não carregar duas bibliotecas, GSAP ficou como a única, e tudo o que não precisa de JS é CSS:

| Onde | Técnica | Parâmetros |
|------|---------|------------|
| Abertura (cortina cursiva) | CSS puro; 1× por sessão (`sessionStorage`) | escrita 900 ms → sobe 720 ms; página entra em 1,75 s; desligada em reduced motion |
| Header | CSS | desce 600 ms após a abertura |
| Entrada do hero | CSS keyframes (roda antes da hidratação) | 560 ms, Y 16 px, stagger 75 ms |
| Cartão do fundador | CSS (entrada) + variáveis CSS via `pointermove` (tilt) | 900 ms; tilt ≤ 6°, só ponteiro fino |
| Revelação de seções | GSAP ScrollTrigger.batch | Y 20 px, 450 ms, uma vez; só oculta o que está abaixo da dobra depois do JS |
| Botões | CSS | 180–200 ms, −1 px, seta +3 px |
| Cards | CSS | −4 px máx., borda/sombra |
| FAQ | CSS grid-rows | 240 ms |
| Rodapé | GSAP ScrollTrigger scrub + cortina CSS | só ≥ 768×700 |
| Liquid metal | WebGL (paper-design) | velocidade 0,45 → 1 no hover/foco |

`prefers-reduced-motion`: sem entrada, sem revelação, sem parallax, sem magnetismo, shader parado, rodapé estático. Sem scroll hijacking, sem smooth scroll forçado, sem loops de UI (o shader pausa fora da viewport).

## O que foi evitado

Martelos, balanças, colunas, apertos de mão, pessoas fictícias, dashboards falsos, partículas, glassmorphism, carrossel, cursor custom, três cards idênticos em linha.

**Exceção deliberada:** o briefing original vetava telas de carregamento decorativas; o cliente pediu depois a abertura em cursiva. Ela foi mantida curta (≈1,9 s), independente de JS, exibida uma vez por sessão e desativada em reduced motion. Custo: atrasa a primeira visão do conteúdo — ver docs/validation.md.

**Tipografia:** a abertura adiciona uma terceira família (Great Vibes, 1 peso, só na cortina). Exceção pedida pelo cliente à regra de duas famílias.
