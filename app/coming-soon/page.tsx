import type { Metadata } from "next";
import SplitReveal from "@/components/ui/SplitReveal";
import EnquiryInline from "@/components/ui/EnquiryInline";
import CtaBlock from "@/components/sections/CtaBlock";

export const metadata: Metadata = { title: "Coming Soon" };

export default function ComingSoon() {
  return (
    <>
      <section className="util">
        <div className="container util__in">
          <div className="util__badge fx-scale" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="util__ring">
              <defs><path id="cs-circ" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" /></defs>
              <text><textPath href="#cs-circ">COMING SOON • COMING SOON • COMING SOON • </textPath></text>
            </svg>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/bamboo.png" alt="" />
          </div>
          <SplitReveal as="h1" className="util__title">We are coming soon!</SplitReveal>
          <p className="fx-up">We&apos;re bringing something fresh, exciting and completely unforgettable to the table. Be the first to experience it.</p>
          <div className="fx-up util__form">
            <EnquiryInline kind="notify" placeholder="Please enter your email" cta="Notify me" light />
          </div>
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
