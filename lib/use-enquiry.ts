"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export type EnquiryKind = "contact" | "career" | "newsletter" | "notify";
type Status = "idle" | "sending" | "sent" | "error";

/** Posts any site form to /api/enquiry, which emails ARK's inbox. */
export function useEnquiry(kind: EnquiryKind) {
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const send = async (fields: Record<string, string>) => {
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, page: pathname, ...fields }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("sent");
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setStatus("error");
      return false;
    }
  };

  return { status, error, send, reset: () => setStatus("idle") };
}

/** Collects named inputs from a form element into a plain object. */
export const formFields = (form: HTMLFormElement) =>
  Object.fromEntries(
    [...new FormData(form).entries()].filter(([, v]) => typeof v === "string") as [string, string][]
  );
