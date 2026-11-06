"use client";

import { useRef } from "react";
import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { usePathname } from "next/navigation";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import { CONTACT, NAV, ALL_PAGES } from "@/lib/content";
import EnquiryInline from "../ui/EnquiryInline";

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.fromTo(
        ".footer__giant span",
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.05, ease: "none", scrollTrigger: { trigger: ".footer__giant", start: "top bottom", end: "bottom bottom", scrub: 1 } }
      );
    },
    { scope: root, dependencies: [pathname], revertOnUpdate: true }
  );

  return (
    <footer className="footer" ref={root} data-theme="dark">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" className="footer__logo">
              ARK<Photo src="/img/bamboo.png" alt="" width={143} height={258} /><small>Hospitality</small>
            </Link>
            <p>ARK is a hospitality marketing & experience studio. We analyse every detail, find your USP and build the brand, the moments and the content that sell it.</p>
          </div>
          <div className="footer__news">
            <h4>Subscribe to our newsletter</h4>
            <EnquiryInline kind="newsletter" placeholder="Enter your email" cta="Subscribe" />
            <small>No spam. Just hospitality growth notes.</small>
          </div>
        </div>

        <div className="footer__cols">
          <div>
            <h5>Main Pages</h5>
            {NAV.slice(1).map((l) => <Link key={l.href} href={l.href} className="ulink">{l.label}</Link>)}
            <Link href="/contact" className="ulink">Contact</Link>
          </div>
          <div>
            <h5>Detail Pages</h5>
            <Link href={ALL_PAGES[1].href} className="ulink">Work Details</Link>
            <Link href={ALL_PAGES[2].href} className="ulink">Blog Details</Link>
          </div>
          <div>
            <h5>Utility Pages</h5>
            <Link href="/404" className="ulink" prefetch={false}>404</Link>
            <Link href="/coming-soon" className="ulink">Coming Soon</Link>
          </div>
          <div>
            <h5>Legal</h5>
            <Link href="/privacy-policy" className="ulink">Privacy Policy</Link>
            <Link href="/terms-condition" className="ulink">Terms & Conditions</Link>
          </div>
          <div>
            <h5>Social</h5>
            <a href={CONTACT.instagram} className="ulink">Instagram</a>
            <a href={CONTACT.facebook} className="ulink">Facebook</a>
            <a href={CONTACT.linkedin} className="ulink">LinkedIn</a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="ulink">WhatsApp</a>
          </div>
          <div className="footer__contact">
            <h5>Have a question?</h5>
            <a href={CONTACT.phoneHref}><b>{CONTACT.phoneDisplay}</b><small>{CONTACT.hours}</small></a>
            <a href={`mailto:${CONTACT.email}`}><b>{CONTACT.email}</b><small>We reply within 24 hours</small></a>
          </div>
        </div>

        <div className="footer__giant" aria-hidden="true">
          {"ARK Hospitality".split("").map((c, i) => <span key={i}>{c === " " ? " " : c}</span>)}
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} ARK Hospitality. All rights reserved.</span>
          <span>Hospitality • Branding • Experiences</span>
        </div>
      </div>
    </footer>
  );
}
