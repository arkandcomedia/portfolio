import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";
import { CONTACT } from "@/lib/content";

export const metadata: Metadata = { title: "Terms & Conditions" };

// Template copy — have it reviewed before launch.
export default function Terms() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="October 2026"
      sections={[
        { h: "Using this website", p: ["By using this website you agree to these terms. The content is provided for general information about ARK Hospitality and our services."] },
        { h: "Our work", p: ["Case studies, images and campaign material shown on this site belong to ARK Hospitality or our clients and are shown with permission. Please don't reuse them without asking."] },
        { h: "Quotes and engagements", p: ["Any project or retainer is agreed in a separate written proposal that sets out scope, timelines and fees. Those terms take priority over anything on this site."] },
        { h: "Enquiries", p: ["Sending an enquiry through this website does not create a contract. We aim to reply to every message within one working day."] },
        { h: "Liability", p: ["We work hard to keep this site accurate and available, but we can't guarantee it will always be error-free or uninterrupted."] },
        { h: "Contact", p: [`Questions about these terms? Email ${CONTACT.email} or call ${CONTACT.phoneDisplay}.`] },
      ]}
    />
  );
}
