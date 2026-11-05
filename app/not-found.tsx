import Btn from "@/components/ui/Btn";
import SplitReveal from "@/components/ui/SplitReveal";
import CtaBlock from "@/components/sections/CtaBlock";

export default function NotFound() {
  return (
    <>
      <section className="util">
        <div className="container util__in">
          <div className="util__art fx-scale" aria-hidden="true">
            <span className="util__404">4</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/bamboo.png" alt="" className="util__leaf" />
            <span className="util__404">4</span>
            <i className="util__tag">ERROR</i>
          </div>
          <SplitReveal as="h1" className="util__title">Oops! This table isn&apos;t set.</SplitReveal>
          <p className="fx-up">The page you&apos;re looking for can&apos;t be found right now. It may have moved or been removed. Head back home and keep exploring.</p>
          <div className="fx-up"><Btn href="/" variant="pink" arrow>Back to Home</Btn></div>
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
