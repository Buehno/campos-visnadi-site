"use server";

import { headers } from "next/headers";
import { handleContact, type ContactState } from "@/lib/contact/handle";
import { sendWithResend } from "@/lib/contact/provider";
import { allow, remember, seen } from "@/lib/contact/memory-guards";

export async function submitContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  const h = await headers();
  const clientKey = (h.get("x-forwarded-for")?.split(",")[0] ?? h.get("x-real-ip") ?? "local").trim();
  return handleContact(form, clientKey, {
    send: sendWithResend,
    allow,
    seen,
    remember,
    now: Date.now,
  });
}
