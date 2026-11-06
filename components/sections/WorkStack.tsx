"use client";

import { useRef } from "react";
import Photo from "@/components/ui/Photo";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import { WORK } from "@/lib/content";
import { SectionHead } from "../ui/PageHeader";
import Btn from "../ui/Btn";

/** Case-study cards that stick and stack — each one settles back as the next slides over it. */
export default function WorkStack({ heading = true }: { heading?: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>(".wcard");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card.querySelector(".wcard__in"), {
          scale: 0.93,
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 18%", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="wstack" ref={root}>
      {heading && (
        <div className="container">
          <SectionHead title="Work That Delivers Results" sub="A closer look at how we turn a venue's details into experiences guests talk about." />
        </div>
      )}
      <div className="container wstack__list">
        {WORK.map((w, i) => (
          <article className="wcard" key={w.slug} style={{ top: `calc(110px + ${i * 22}px)` }}>
            <div className="wcard__in">
              <div className="wcard__text">
                <h3>{w.title}</h3>
                <p>{w.summary}</p>
                <dl>
                  <div><dt>Client:</dt><dd><i />{w.client}</dd></div>
                  <div><dt>Services:</dt><dd>{w.services.map((s) => <span key={s}><i />{s}</span>)}</dd></div>
                </dl>
                <Btn href={`/work/${w.slug}`} variant="pink" size="sm" arrow>See the case study</Btn>
              </div>
              <div className="wcard__img">
                <Photo src={w.img} alt={w.title} fill sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
