"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Info, Loader2 } from "lucide-react";
import { submitContact } from "@/app/actions/contact";
import type { ContactState } from "@/lib/contact/handle";
import { LIMITS } from "@/lib/contact/rules";
import { validateContact } from "@/lib/contact/validate";
import type { ContactField, FieldErrors } from "@/lib/contact/schema";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { cn } from "@/lib/utils";

const initial: ContactState = { status: "idle" };
const empty = { name: "", email: "", company: "", message: "" };
const order: ContactField[] = ["name", "email", "company", "message"];

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function ContactForm({ demo }: { demo: boolean }) {
  const [state, formAction, pending] = useActionState(submitContact, initial);
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [done, setDone] = useState(false);
  const [prevState, setPrevState] = useState(state);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  // Mesmo id em novas tentativas da mesma mensagem: o servidor deduplica.
  const submissionId = useRef<string | null>(null);
  const startedAt = useRef<number>(0);

  // Ajuste de estado derivado da resposta do servidor (durante o render).
  if (state !== prevState) {
    setPrevState(state);
    if (state.status === "invalid" && state.fieldErrors) setErrors(state.fieldErrors);
    if (state.status === "success") {
      setDone(true);
      setValues(empty);
      setErrors({});
    }
  }

  // Foco após cada resposta: campo inválido ou mensagem de status.
  useEffect(() => {
    if (state.status === "idle") return;
    if (state.status === "success") submissionId.current = null;
    if (state.status === "invalid" && state.fieldErrors) {
      focusFirst(state.fieldErrors);
      return;
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }, [state]);

  function focusFirst(errs: FieldErrors) {
    const first = order.find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const check = validateContact(values);
    if (!check.ok) {
      e.preventDefault();
      setErrors(check.errors);
      focusFirst(check.errors);
      return;
    }
    setErrors({});
    submissionId.current ??= newId();
    const form = e.currentTarget;
    (form.elements.namedItem("submissionId") as HTMLInputElement).value = submissionId.current;
    (form.elements.namedItem("startedAt") as HTMLInputElement).value = String(startedAt.current || "");
  }

  function update(field: ContactField, value: string) {
    if (!startedAt.current) startedAt.current = Date.now();
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) {
      const check = validateContact({ ...values, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: check.ok ? undefined : check.errors[field] }));
    }
  }

  function restart() {
    setDone(false);
    startedAt.current = 0;
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus());
  }

  if (done) {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-line bg-surface p-8 shadow-[var(--shadow-rest)] outline-none sm:p-10"
      >
        <CheckCircle2 aria-hidden className="size-8 text-success" />
        <h3 className="type-h3 mt-5 text-roxo-900">Mensagem enviada.</h3>
        <p className="mt-3 max-w-[48ch] text-muted-ink">
          {state.message ?? "O escritório recebeu seu contato."}
        </p>
        <button type="button" onClick={restart} className="btn btn-outline mt-8 text-roxo-900">
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  const showBanner = state.status === "error" || state.status === "demo" || state.status === "rate_limited";

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-describedby={demo ? "contato-demo" : undefined}
      className="rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-rest)] sm:p-10"
    >
      {demo && (
        <p
          id="contato-demo"
          className="mb-8 flex gap-3 rounded-lg border border-[#e7c9a4] bg-[#fdf3e7] p-4 text-[0.9375rem] leading-snug text-[#6b3d0f]"
        >
          <Info aria-hidden className="mt-0.5 size-5 shrink-0" />
          <span>
            <strong className="font-semibold">Pré-visualização:</strong> o envio ainda não está configurado neste
            ambiente. Nenhuma mensagem será enviada.
          </span>
        </p>
      )}

      <div
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        className="outline-none"
      >
        {showBanner && (
          <p
            role="alert"
            className={cn(
              "mb-8 flex gap-3 rounded-lg border p-4 text-[0.9375rem] leading-snug",
              state.status === "demo"
                ? "border-[#e7c9a4] bg-[#fdf3e7] text-[#6b3d0f]"
                : "border-[#efc2bf] bg-[#fdf0ef] text-error",
            )}
          >
            <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
            <span>{state.message}</span>
          </p>
        )}
      </div>

      <input type="hidden" name="submissionId" defaultValue="" />
      <input type="hidden" name="startedAt" defaultValue="" />
      {/* Honeypot: invisível para pessoas, preenchido por robôs. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          name="name"
          label="Nome"
          autoComplete="name"
          value={values.name}
          error={errors.name}
          maxLength={LIMITS.name}
          onChange={update}
          required
        />
        <Field
          name="email"
          label="E-mail"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          error={errors.email}
          maxLength={LIMITS.email}
          onChange={update}
          required
        />
        <Field
          name="company"
          label="Empresa"
          hint="Opcional"
          autoComplete="organization"
          value={values.company}
          error={errors.company}
          maxLength={LIMITS.company}
          onChange={update}
          className="sm:col-span-2"
        />
        <Field
          name="message"
          label="Mensagem"
          hint={`Descreva brevemente o contexto e a necessidade (até ${LIMITS.messageMax.toLocaleString("pt-BR")} caracteres).`}
          multiline
          value={values.message}
          error={errors.message}
          maxLength={LIMITS.messageMax}
          onChange={update}
          className="sm:col-span-2"
          required
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-ink">Todos os campos, exceto Empresa, são obrigatórios.</p>
        <LiquidMetalButton type="submit" disabled={pending} aria-disabled={pending} tint={[0.95, 0.72, 0.86, 1]}>
          {pending ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin motion-reduce:animate-none" />
              Enviando…
            </>
          ) : (
            <>
              {state.status === "error" ? "Tentar novamente" : "Enviar mensagem"}
              <ArrowRight aria-hidden className="btn-arrow size-4" />
            </>
          )}
        </LiquidMetalButton>
      </div>
    </form>
  );
}

type FieldProps = {
  name: ContactField;
  label: string;
  value: string;
  onChange: (f: ContactField, v: string) => void;
  error?: string;
  hint?: string;
  multiline?: boolean;
  className?: string;
  required?: boolean;
  maxLength?: number;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
};

function Field({ name, label, value, onChange, error, hint, multiline, className, required, ...rest }: FieldProps) {
  const id = `f-${name}`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;
  const control = cn(
    "block w-full rounded-lg border bg-paper px-4 text-base text-ink transition-[border-color,box-shadow] duration-150 placeholder:text-muted-ink/70 focus:border-roxo-500 focus:outline-none focus:ring-2 focus:ring-magenta-500/60",
    error ? "border-error" : "border-input-line",
  );
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-[0.9375rem] font-semibold text-roxo-900">
        {label}
        {name === "company" && <span className="text-sm font-normal text-muted-ink">Opcional</span>}
      </label>
      {hint && name !== "company" && (
        <p id={hintId} className="mt-1 text-sm text-muted-ink">
          {hint}
        </p>
      )}
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          aria-required={required}
          className={cn(control, "mt-2 min-h-36 resize-y py-3 leading-relaxed")}
          maxLength={rest.maxLength}
        />
      ) : (
        <input
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          aria-required={required}
          className={cn(control, "mt-2 h-12")}
          {...rest}
          type={rest.type ?? "text"}
        />
      )}
      {error && (
        <p id={errId} className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-error">
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
