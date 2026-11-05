import type { Metadata } from "next";
import ScrollFill from "@/components/ui/ScrollFill";
import Clients from "@/components/sections/Clients";
import Values from "@/components/sections/Values";
import FaqBlock from "@/components/sections/FaqBlock";
import CtaBlock from "@/components/sections/CtaBlock";
import { Impact, Team, Beliefs } from "@/components/sections/AboutBlocks";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="about-head">
        <div className="container about-head__grid">
          <span className="about-head__label fx-up">About us</span>
          <ScrollFill as="h1" className="about-head__text" start="top 75%" end="bottom 35%">
            We&apos;re not just a marketing agency, we&apos;re a growth partner for hospitality. We help venues find their USP,
            build experiences around it and tell the story so well that guests keep coming back. Every decision is rooted in
            detail, driven by data and designed for real impact.
          </ScrollFill>
        </div>
      </section>
      <Impact />
      <Clients />
      <Values />
      <Team />
      <Beliefs />
      <FaqBlock />
      <CtaBlock />
    </>
  );
}
