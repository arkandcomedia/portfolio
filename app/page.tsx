import HomeHero from "@/components/sections/HomeHero";
import Intro from "@/components/sections/Intro";
import Clients from "@/components/sections/Clients";
import ProcessStair from "@/components/sections/ProcessStair";
import Values from "@/components/sections/Values";
import ServicesList from "@/components/sections/ServicesList";
import WorkStack from "@/components/sections/WorkStack";
import Moments from "@/components/sections/Moments";
import Plans from "@/components/sections/Plans";
import FaqBlock from "@/components/sections/FaqBlock";
import BlogGrid from "@/components/sections/BlogGrid";
import CtaBlock from "@/components/sections/CtaBlock";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Intro meta={["Hospitality", "Branding", "Experiences", "Growth"]}>
        We don&apos;t do generic. Every venue we touch gets a strategy built from its own details, its view, its story, its
        people, and an experience designed so well that guests can&apos;t help but talk about it.
      </Intro>
      <Clients />
      <ProcessStair />
      <Values />
      <ServicesList />
      <WorkStack />
      <Moments />
      <Plans />
      <FaqBlock />
      <BlogGrid />
      <CtaBlock />
    </>
  );
}
