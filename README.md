# Campos Visnadi Soluções Jurídicas — landing page

Landing page institucional em Next.js 16 (App Router), React 19, Tailwind CSS 4 e GSAP.

## Requisitos

- Node.js 20+ (testado com 24.13.1) e npm 11 — **npm é o único gerenciador** (há `package-lock.json`).
- Python 3 + `rembg` apenas para processar a foto do fundador (opcional).

## Instalação e execução

```bash
npm install
cp .env.example .env.local   # preencha as variáveis (ver abaixo)
npm run dev                  # http://localhost:3000
```

Produção:

```bash
npm run build
npm run start
```

Verificações:

```bash
npx tsc --noEmit
npm run lint
npx vitest run
```

## Variáveis de ambiente

| Variável | Obrigatória para publicar | Uso |
|----------|---------------------------|-----|
| `NEXT_PUBLIC_SITE_URL` | sim | Domínio confirmado; habilita canonical, sitemap e `url` no JSON-LD |
| `SITE_INDEXABLE` | sim (`true` só em produção) | Qualquer outro valor mantém `noindex` e `robots: Disallow /` |
| `RESEND_API_KEY` | sim | Chave da conta Resend do escritório |
| `CONTACT_TO_EMAIL` | sim | Caixa que recebe os contatos |
| `CONTACT_FROM_EMAIL` | sim | Remetente em domínio verificado no Resend |
| `CONTACT_FORCE_FAILURE` | não | Só desenvolvimento: simula falha do provedor |

Sem as três variáveis do Resend o formulário entra em **modo de demonstração**: exibe o aviso e nunca confirma envio.

### Dados enviados pelo formulário

Nome, e-mail, empresa (opcional) e mensagem → Server Action (`src/app/actions/contact.ts`) → validação zod → API do Resend → e-mail para `CONTACT_TO_EMAIL`, com `reply_to` do remetente. Nada é gravado em banco nem registrado em log (apenas o status HTTP em caso de falha). Finalidade: responder ao contato. A política de privacidade precisa ser redigida pelo escritório.

## Foto do fundador

```bash
python scripts/process-photo.py "C:/caminho/foto-original.jpg"
```

Gera `public/brand/thiago-visnadi.png` (fundo removido). O cartão do hero detecta o arquivo no build; sem ele, usa o símbolo da marca.

## Estrutura

```
src/app            layout, página, Server Action, robots/sitemap, ícones
src/components     layout/ (header, abertura), sections/, ui/ (shadcn + adaptados), motion/, brand/, seo/
src/content        todo o texto institucional (site.ts)
src/lib            contato (regras, validação, provedor, proteções), interação, config
public/brand       logo oficial, símbolo, foto
docs/              direção de design, fontes dos componentes, validação, pendências
scripts/           processamento da foto
```

## Documentação

- `docs/design-direction.md` — conceito, tokens, tipografia, movimento
- `docs/component-sources.md` — referências do 21st.dev, licenças, adaptações
- `docs/validation.md` — testes, acessibilidade, Lighthouse
- `docs/content-pending.md` — o que depende do escritório antes de publicar
