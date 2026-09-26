# Backup de DNS — camposvisnadi.com.br

Registrado em: 26/09/2026. Zona hospedada no Cloudflare.

## Registros AAAA removidos do apex (`@`)

Removidos para liberar o CNAME do apex (um CNAME não pode coexistir com A/AAAA no mesmo nome).
Valores informados pelo cliente:

```
2606:4700:3035::ac43:d5b4
2606:4700:3035::ac43:d5b4
2606:4700:3035::ac43:d5b4
2606:4700:3035::6815:5db6
2606:4700:3035::ac43:d5b    <- valor truncado no envio; provavelmente ...d5b4
```

Observações:

- São endereços da própria rede do Cloudflare (bloco `2606:4700::/32`) — ou seja, endereços de borda do proxy, não o IP do servidor de origem. Restaurá-los tende a não recuperar o site antigo; serviriam apenas para voltar ao estado anterior da zona.
- Três linhas repetem o mesmo valor, o que sugere duplicidade na zona.
- **Não** foram tocados MX, TXT (SPF/DKIM/DMARC) nem registros de e-mail.

## Configuração de destino

| Tipo | Nome | Conteúdo | Proxy |
|---|---|---|---|
| CNAME | `@` | `camposvisnadi.netlify.app` | ver abaixo |
| CNAME | `www` | `camposvisnadi.netlify.app` | ver abaixo |

- **Netlify:** proxy desligado (DNS only) até o certificado ser emitido.
- **Railway:** proxy ligado e SSL/TLS em **Full** (não Full strict).

## Recomendação

Exportar a zona completa pelo Cloudflare (DNS → Records → Export) e guardar o arquivo junto deste documento.
