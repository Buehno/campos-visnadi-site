# Pendências de conteúdo e informação

Tudo que depende do escritório antes da publicação. Nada disto aparece na interface como placeholder.

## Impeditivas para publicação

| # | Item | Situação atual no site |
|---|------|------------------------|
| 1 | **Integração de envio do formulário** — conta Resend (ou provedor escolhido), domínio remetente verificado, caixa de destino (`CONTACT_TO_EMAIL`) | Sem credenciais o formulário exibe "Pré-visualização: o envio ainda não está configurado" e **nunca** confirma envio. |
| 2 | **Número de inscrição na OAB/SP** de Thiago de Campos Visnadi e demais dados de identificação profissional exigidos para publicidade | Site diz apenas "advogado inscrito na OAB/SP" (fato da skill). Número não publicado. |
| 3 | **Revisão do conteúdo pelo escritório**, incluindo adequação às regras de publicidade da advocacia (Código de Ética e Disciplina da OAB e Provimento CFOAB sobre publicidade vigente) | Não há parecer de conformidade — precisa ser feito pelo responsável. |
| 4 | **Política de privacidade** refletindo a operação real (quem recebe os dados, prazo de guarda, base legal, canal do titular) | Não há link de privacidade; o rodapé só ganha o link quando o texto revisado existir. |
| 5 | **Domínio definitivo** | `NEXT_PUBLIC_SITE_URL` vazio: sem canonical, sitemap vazio, `robots` com `Disallow: /` e `noindex`. |

## Textos propostos que precisam de validação

| Seção | Texto | Tipo |
|-------|-------|------|
| Contexto | As três situações e seus exemplos | Proposta editorial ilustrativa |
| Atuação | Descrições dos três núcleos e os temas listados em cada um | Redação institucional proposta (base: áreas do registro INPI) |
| Abordagem | As 4 etapas (entender, definir escopo, conduzir, alinhar) | **Proposta editorial, não processo operacional confirmado** |
| Escritório | Título "Direito sem armadura." e os dois parágrafos | Parafraseado do documento de marca (Bossa Nova Brands) |
| Formas de atuação | Bloco único "O escopo começa pela compreensão da sua necessidade." | Usado por falta de confirmação das modalidades |
| FAQ | "Quais informações apresentar no primeiro contato?" | Orientação editorial (não pedir documentos) |

## Perguntas sem resposta confirmada (não publicadas)

- Como é definido o escopo e o formato de cobrança?
- O escritório oferece assessoria recorrente/mensal? (se sim, a seção "Formas de atuação" pode diferenciar: demanda pontual · projeto com escopo definido · assessoria recorrente)
- Atende apenas Jundiaí/região ou todo o Brasil? Atendimento remoto?
- Qual o prazo de retorno após o contato?
- Há outros advogados, associados ou parceiros a apresentar?

## Informações ausentes (não inventadas)

- Telefone, WhatsApp, e-mail público, redes sociais — nenhum exibido. WhatsApp só entra com número confirmado.
- Fotografia real do fundador — sem autorização/arquivo, a seção Escritório usa composição tipográfica.
- Clientes, depoimentos, casos, prêmios, anos de experiência, números — nenhum exibido.
- **Versão negativa (wordmark branco) do logotipo** — o skill cita sua existência, mas o arquivo não foi fornecido. O site aplica o wordmark oficial vetorizado com cor via `currentColor` (branco sobre roxo). Validar com o escritório ou substituir pelo arquivo oficial.
- Manual de marca com valores de cor certificados — os tokens vêm de amostragem dos arquivos de logo.

## Fatos usados (fonte: skill institucional + certificado INPI)

Nome, razão social, CNPJ 42.107.312/0001-49, sede (Rua Francisco Lopes, 144, Jundiaí/SP, CEP 13212-651), fundador e sócio-titular, missão, filosofia, tagline, público-alvo, valores, áreas de atuação e registro de marca INPI nº 933204183 (classe 45, vigente até 09/09/2035).
