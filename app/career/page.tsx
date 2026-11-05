import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Intro from "@/components/sections/Intro";
import Btn from "@/components/ui/Btn";
import CtaBlock from "@/components/sections/CtaBlock";
import { Positions, LifeAtArk } from "@/components/sections/CareerBlocks";

export const metadata: Metadata = { title: "Career" };

export default function CareerPage() {
  return (
    <>
      <PageHeader title="Build Work That Actually Matters" sub="Join a team focused on strategy, creativity and real impact for hospitality brands.">
        <Btn href="#positions" variant="pink" arrow>View open positions</Btn>
      </PageHeader>
      <Intro meta={["Career at ARK"]}>
        At ARK, we believe the best work happens when creativity meets the guest. We&apos;re a hospitality marketing and
        experience studio where planning, design and production sit at the same table, and every team member plays a part in
        helping venues grow with intention and impact.
      </Intro>
      <Positions />
      <LifeAtArk />
      <CtaBlock />
    </>
  );
}
