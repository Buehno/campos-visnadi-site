/**
 * Configuração dependente de ambiente.
 * NEXT_PUBLIC_SITE_URL só deve ser definido com o domínio confirmado.
 * A indexação fica desligada até que SITE_INDEXABLE=true seja definido em produção.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null;

export const isIndexable = process.env.SITE_INDEXABLE === "true" && Boolean(siteUrl);
