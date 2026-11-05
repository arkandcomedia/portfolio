"use client";

import type { FormEvent } from "react";
import { useEnquiry, formFields, type EnquiryKind } from "@/lib/use-enquiry";

type Props = { kind: EnquiryKind; placeholder: string; cta: string; light?: boolean };

/** Single email field + button (newsletter, coming-soon, blog sidebar). */
export default function EnquiryInline({ kind, placeholder, cta, light }: Props) {
  const { status, error, send } = useEnquiry(kind);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (await send(formFields(form))) form.reset();
  };

  return (
    <form className={`inline-form${light ? " inline-form--light" : ""}`} onSubmit={submit}>
      <input type="email" name="email" required placeholder={placeholder} aria-label={placeholder} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <button type="submit" disabled={status === "sending"}>
        <span>{status === "sending" ? "Sending…" : status === "sent" ? "Done ✓" : cta}</span>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12L12 4M5 4h7v7" /></svg>
      </button>
      {status === "error" && <p className="form-msg form-msg--err">{error}</p>}
      {status === "sent" && <p className="form-msg">Thank you! You&apos;re on the list.</p>}
    </form>
  );
}
