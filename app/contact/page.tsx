import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/ui/PageHeader";
import FaqBlock from "@/components/sections/FaqBlock";
import CtaBlock from "@/components/sections/CtaBlock";
import { ContactForm, ContactCards } from "@/components/sections/ContactBlocks";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        align="split"
        title="Contact Us Today"
        sub="Tell us about your venue. We're thrilled you're here, and we'll make this smooth and enjoyable."
      />
      <Suspense fallback={<div className="contact-fallback" />}>
        <ContactForm />
      </Suspense>
      <ContactCards />
      <FaqBlock />
      <CtaBlock />
    </>
  );
}
