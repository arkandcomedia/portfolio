"use client";

import { useState, type FormEvent } from "react";
import Photo from "@/components/ui/Photo";
import { useSearchParams } from "next/navigation";
import { CONTACT, SERVICE_OPTIONS } from "@/lib/content";
import { useEnquiry, formFields } from "@/lib/use-enquiry";
import { SectionHead } from "../ui/PageHeader";
import Btn from "../ui/Btn";

export function ContactForm() {
  const params = useSearchParams();
  const preService = params.get("service") ?? "";
  const role = params.get("role");
  const isCareer = preService.startsWith("Career");
  const [service, setService] = useState(SERVICE_OPTIONS.includes(preService) ? preService : preService ? "Something else" : "");
  const { status, error, send } = useEnquiry(service.startsWith("Career") ? "career" : "contact");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (await send(formFields(form))) form.reset();
  };

  return (
    <section className="contact">
      <div className="container contact__grid">
        <form className="cform fx-up" onSubmit={submit}>
          <div className="cform__row">
            <label>First name<input name="firstName" required placeholder="Please enter your name" /></label>
            <label>Last name<input name="lastName" placeholder="Please enter your last name" /></label>
          </div>
          <div className="cform__row">
            <label>Email<input name="email" type="email" required placeholder="you@venue.com" /></label>
            <label>Phone<input name="phone" type="tel" placeholder="+91 ..." /></label>
          </div>
          <label>Venue name<input name="venue" placeholder="Your café, restaurant or hotel" /></label>
          <label>
            Select service
            <span className="cform__select">
              <select name="service" value={service} onChange={(e) => setService(e.target.value)} required>
                <option value="" disabled>Select service…</option>
                {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                {preService && !SERVICE_OPTIONS.includes(preService) && <option value={preService}>{preService}</option>}
              </select>
            </span>
          </label>
          <label>
            Message
            <textarea
              name="message"
              required
              rows={5}
              placeholder={isCareer ? "Tell us about yourself and share a portfolio link…" : "Tell us about your venue and what you'd like to achieve…"}
              defaultValue={role ? `I'd like to apply for: ${role}\n\n` : ""}
            />
          </label>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
          <Btn type="submit" variant="pink" block disabled={status === "sending"} magnetic={false}>
            {status === "sending" ? "Sending…" : status === "sent" ? "Sent — thank you!" : "Submit"}
          </Btn>
          {status === "error" && <p className="form-msg form-msg--err">{error}</p>}
          {status === "sent" && <p className="form-msg">Thanks! Your message reached ARK. We reply within 24 hours.</p>}
        </form>
        <div className="contact__img fx-clip">
          <Photo src="/img/photo-08.jpg" alt="ARK briefing a chef before a theme night" fill priority sizes="(max-width: 900px) 100vw, 45vw" data-parallax="6" />
        </div>
      </div>
    </section>
  );
}

const CARDS = [
  {
    href: `mailto:${CONTACT.email}`,
    title: CONTACT.email,
    text: "Enquiries, quotes and collaborations",
    icon: <><rect x="5" y="9" width="26" height="18" rx="3" /><path d="M6 11l12 9 12-9" /></>,
  },
  {
    href: CONTACT.phoneHref,
    title: CONTACT.phoneDisplay,
    text: "Speak directly with a real person",
    icon: <path d="M10 6h5l2 6-3 2a16 16 0 007 7l2-3 6 2v5a3 3 0 01-3 3A21 21 0 017 9a3 3 0 013-3z" />,
  },
  {
    href: CONTACT.whatsapp,
    title: "WhatsApp us",
    text: "Quick questions, quick answers",
    icon: <><path d="M7 29l2-6a11 11 0 114 4z" /><path d="M14 14c0 4 3 7 7 7l2-2-3-2-1 1c-2-1-3-2-4-4l1-1-2-3z" /></>,
  },
  {
    href: undefined,
    title: CONTACT.hours,
    text: "We reply to every message within a day",
    icon: <><circle cx="18" cy="18" r="12" /><path d="M18 11v8l5 3" /></>,
  },
];

export function ContactCards() {
  return (
    <section className="ccards">
      <div className="container">
        <SectionHead title={<>We&apos;d love to hear <br />from you</>} />
        <div className="ccards__grid">
          {CARDS.map((c) => {
            const inner = (
              <>
                <span className="ccard__ic"><svg viewBox="0 0 36 36" aria-hidden="true">{c.icon}</svg></span>
                <b>{c.title}</b>
                <span>{c.text}</span>
              </>
            );
            return c.href ? (
              <a key={c.title} href={c.href} className="ccard tilt fx-up" target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a>
            ) : (
              <div key={c.title} className="ccard tilt fx-up">{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
