"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { question: string; answer: string };

/**
 * Accordion acessível leve (padrão WAI-ARIA): botão semântico dentro de h3,
 * aria-expanded/aria-controls, região rotulada. Conteúdo presente no HTML
 * (bom para busca e para leitura sem JS no servidor).
 */
export function Accordion({ items }: { items: Item[] }) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const expanded = open === i;
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div key={item.question} className="border-b border-line">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left text-[1.1875rem] font-semibold leading-snug text-roxo-900 transition-colors hover:text-magenta-600"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong transition-[transform,background-color,border-color] duration-200 ease-brand",
                    expanded && "rotate-45 border-roxo-900 bg-roxo-900 text-on-dark",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!expanded}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-[240ms] ease-brand motion-reduce:transition-none",
                expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-7 pr-12 text-muted-ink">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
