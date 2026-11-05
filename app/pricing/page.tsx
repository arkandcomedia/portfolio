import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Plans from "@/components/sections/Plans";
import Compare from "@/components/sections/Compare";
import FaqBlock from "@/components/sections/FaqBlock";
import CtaBlock from "@/components/sections/CtaBlock";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Simple, Transparent Engagements"
        sub="Choose the engagement that fits your venue. Flexible, clear and packed with what you need to grow."
      />
      <Plans heading={false} />
      <Compare />
      <FaqBlock />
      <CtaBlock />
    </>
  );
}
