"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { contactCta, firm, nav } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Menu mobile: Escape fecha, Tab circula dentro do painel, rolagem travada.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [toggleRef.current!, ...focusables()];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.documentElement.style.overflow = "";
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-200 ease-brand",
        solid
          ? "bg-paper/95 text-roxo-900 shadow-[0_1px_0_var(--cv-line)] backdrop-blur-sm"
          : "bg-transparent text-on-dark",
      )}
    >
      <div className="container-cv flex h-[var(--header-h)] items-center justify-between gap-6">
        <a
          href="#topo"
          className="shrink-0 rounded-md"
          aria-label={`${firm.fullName} — início`}
          onClick={() => open && close(false)}
        >
          <Logo priority size={36} />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative py-2 text-[0.9375rem] font-semibold after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-[image:var(--cv-gradient-accent)] after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contactCta.href}
            className={cn(
              "btn hidden sm:inline-flex",
              solid ? "btn-primary" : "btn-light",
            )}
          >
            {contactCta.label}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-12 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-paper text-roxo-900 lg:hidden"
      >
        <nav aria-label="Menu" className="container-cv flex min-h-[calc(100dvh-var(--header-h))] flex-col pb-8 pt-4">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.href} className="enter border-b border-line" style={{ "--i": i } as React.CSSProperties}>
                <a
                  href={item.href}
                  onClick={() => close(false)}
                  className="font-display flex min-h-16 items-center text-[2rem] font-semibold leading-none"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={contactCta.href}
            onClick={() => close(false)}
            className="btn btn-primary mt-8 w-full"
          >
            {contactCta.label}
          </a>
          <p className="mt-auto pt-8 text-sm text-muted-ink">{firm.tagline}</p>
        </nav>
      </div>
    </header>
  );
}
