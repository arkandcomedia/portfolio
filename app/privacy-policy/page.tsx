import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";
import { CONTACT } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy Policy" };

// Template copy — have it reviewed before launch.
export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 2026"
      sections={[
        { h: "Who we are", p: [`ARK Hospitality ("ARK", "we", "us") is a hospitality marketing and experience studio. This policy explains how we handle information you share with us through this website. You can reach us at ${CONTACT.email}.`] },
        { h: "What we collect", p: ["When you fill in a form on this site we collect the details you choose to give us: typically your name, email address, phone number, venue name and message.", "We do not use advertising trackers on this site."] },
        { h: "How we use it", p: ["We use your details only to reply to your enquiry, send the updates you asked for (for example our newsletter) and to provide our services if we work together. We never sell your information."] },
        { h: "How long we keep it", p: ["Enquiries are kept for as long as needed to respond and, if we work together, for the length of our engagement and any legal record-keeping period. Newsletter subscribers can unsubscribe at any time."] },
        { h: "Your rights", p: [`You can ask us to see, correct or delete the information we hold about you by emailing ${CONTACT.email}.`] },
        { h: "Changes", p: ["We may update this policy from time to time. The latest version will always be on this page."] },
      ]}
    />
  );
}
