import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import Intro from "@/components/sections/Intro";
import ServicesList from "@/components/sections/ServicesList";
import FaqBlock from "@/components/sections/FaqBlock";
import Plans from "@/components/sections/Plans";
import CtaBlock from "@/components/sections/CtaBlock";
import { HERO_PILLS } from "@/lib/content";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title={<>Drive measurable growth through smart, <em>guest-first</em> hospitality marketing</>}
        sub="Bringing clarity, character and long-term growth to your venue."
      />
      <Intro meta={["Opportunity"]}>
        Turn your venue&apos;s details into measurable growth with a clear plan, experiences built on the floor and
        content designed so every action strengthens your positioning, fills more tables and brings guests back.
      </Intro>
      <section className="bento">
        <div className="container bento__grid">
          <article className="bento__card bento__card--img fx-up tilt">
            <Image src="/img/crop-04.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 33vw" />
            <div className="bento__shade" />
            <span className="bento__tag">Experience insight <i>↗</i></span>
            <div className="bento__bottom"><b>Floor to feed</b><span>Moments designed on site, then told online.</span></div>
          </article>
          <article className="bento__card bento__card--img fx-up tilt">
            <Image src="/img/crop-02.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 33vw" />
            <div className="bento__shade" />
            <span className="bento__tag">Strategy <i>↗</i></span>
            <div className="bento__bottom"><b>Brand & venue growth</b><span>Discover the details, insights and USP that drive real bookings.</span></div>
          </article>
          <article className="bento__card bento__card--pills fx-up tilt">
            <h3>Creating alignment between your venue, your brand and your guests</h3>
            <div className="bento__pills">
              {HERO_PILLS.map((p) => <span key={p}>{p}</span>)}
            </div>
          </article>
        </div>
      </section>
      <ServicesList />
      <FaqBlock />
      <Plans />
      <CtaBlock />
    </>
  );
}
