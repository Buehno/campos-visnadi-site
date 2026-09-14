# Pendências de conteúdo e informação

Tudo que depende do escritório antes da publicação. Nada disto aparece na interface como placeholder.

## Impeditivas para publicação

| # | Item | Situação atual no site |
|---|------|------------------------|
| 1 | **Integração de envio do formulário** — conta Resend (ou outro provedor), domínio remetente verificado, caixa de destino | Sem credenciais o formulário exibe "Pré-visualização: o envio ainda não está configurado" e **nunca** confirma envio. |
| 2 | **Número de inscrição na OAB/SP** e demais dados de identificação profissional exigidos na publicidade | Site diz apenas "advogado inscrito na OAB/SP". Número não publicado. |
| 3 | **Revisão do conteúdo pelo escritório**, incluindo adequação às regras de publicidade da advocacia (Código de Ética e Disciplina da OAB e provimento do CFOAB vigente) | Sem parecer de conformidade — responsabilidade do escritório. |
| 4 | **Política de privacidade** real (destinatário dos dados, guarda, base legal, canal do titular) | Sem link de privacidade até existir texto revisado. |
| 5 | **Domínio definitivo** | `NEXT_PUBLIC_SITE_URL` vazio: sem canonical, sitemap vazio, `noindex`. |
| 6 | **Foto oficial do fundador em arquivo** + autorização de uso de imagem | A foto foi enviada colada no chat e não existe como arquivo acessível. Rodar `python scripts/process-photo.py <arquivo>`; até lá o cartão usa o símbolo. |

## Informações confirmadas pelo cliente (11/09/2026)

- A atuação **não é restrita a software/tecnologia**: compliance para empresas, contratos, ações judiciais, registro de marca, processo civil, prevenção de fraudes — atendimento full service.
- Foto de Thiago de Campos Visnadi autorizada para o hero ("em relevo") e seção de trajetória.
- Trajetória extraída do perfil profissional (Profile.pdf / LinkedIn), **somente marcos jurídicos**: Bacharelado em Direito (Centro Universitário Padre Anchieta, 2014–2018); estágio na Del Pra Sociedade de Advogados (2018–2019, área cível); fundação do escritório (2019); sócio da Polinário & Visnadi Advogados Associados (2020–2021, não exibido); pós-graduação lato sensu em Direito, Tecnologia e Inovação com ênfase em Proteção de Dados (Instituto New Law, 2020–2021); mentor jurídico (Inovenow 2022–, eMentor 2023–); membro da ANPPD; professor e palestrante.
- Excluídos por não serem jurídicos: carreira em educação física/karatê, MBA em gestão de pessoas, pós em psicologia do esporte, certificações G4.

## Informações confirmadas pelo cliente (14/09/2026)

- Endereço: Rua Barão de Teffé, 160, Sala 505, Jardim Ana Maria, Jundiaí/SP, CEP 13208-760 (substitui o endereço da skill).
- Telefone e WhatsApp (Chatguru): +55 11 94133-2481 · E-mail: contato@camposvisnadi.com.br.
- Redes: Instagram @campos_visnadi, LinkedIn do escritório, LinkedIn pessoal do fundador (só no JSON-LD), Facebook @camposvisnadi.
- Indicadores exibidos na seção "Em números": + de 150 empresas assessoradas, + de 700 processos geridos, "infinitos cafés"; "Desde 2019" vem do perfil profissional.
- **Validar:** a divulgação de quantidade de processos/clientes deve ser conferida pelo escritório frente às regras de publicidade da OAB (Provimento CFOAB vigente) antes da publicação.
- Pendência 6 (foto) continua aberta; itens de contato/WhatsApp deixam de ser pendência.

## Validar com o escritório

| Seção | Texto | Tipo |
|-------|-------|------|
| Atuação | Os 6 núcleos e descrições (compliance e prevenção de fraudes, contratos, ações judiciais e processo civil, registro de marca e PI, direito digital e proteção de dados, consultoria) | Redação proposta a partir das áreas confirmadas + INPI |
| Contexto | As 4 situações | Proposta editorial ilustrativa |
| Abordagem | As 4 etapas | **Proposta editorial, não processo operacional confirmado** |
| Trajetória | Datas e redação dos marcos; se deve citar a Polinário & Visnadi | Extraído do perfil público |
| Escritório | "Direito sem armadura." e parágrafos | Parafraseado do documento de marca |
| Abertura | Cursiva "Campos Visnadi" (fonte Great Vibes) | Não é o logotipo; recurso de animação pedido pelo cliente |

## Dados presentes no perfil, **não publicados** (aguardam confirmação de uso no site)

- Telefone celular, e-mail `thiago.adv@…`, LinkedIn e blog `consultoriajuridica.thiagovisnadi.com` — contatos pessoais; o site só usa o formulário até o escritório confirmar canais públicos. WhatsApp só com número confirmado.

## Perguntas sem resposta confirmada (não publicadas)

- Formato de cobrança e modalidades (pontual, projeto, recorrente)?
- Área geográfica de atendimento; atendimento remoto?
- Prazo de retorno após o contato?
- Outros advogados, associados ou parceiros a apresentar?

## Ainda ausentes (não inventados)

- Clientes, depoimentos, casos, prêmios, números — nenhum exibido.
- Versão negativa oficial do wordmark (o site aplica o wordmark oficial vetorizado com `currentColor`).
- Manual de marca com cores certificadas (tokens amostrados do logo).
