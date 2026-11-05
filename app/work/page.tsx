import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import WorkStack from "@/components/sections/WorkStack";
import Moments from "@/components/sections/Moments";
import CtaBlock from "@/components/sections/CtaBlock";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="Work That Delivers Results"
        sub="A closer look at how we turn a venue's details into experiences guests talk about, and content that brings them back."
      />
      <WorkStack heading={false} />
      <Moments />
      <CtaBlock />
    </>
  );
}
