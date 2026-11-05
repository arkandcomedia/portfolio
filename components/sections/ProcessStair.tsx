"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import { PROCESS } from "@/lib/content";
import SplitReveal from "../ui/SplitReveal";

/** Dark pinned section — process cards rise one by one into a descending staircase. */
export default function ProcessStair() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".stair__card");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=220%", pin: true, scrub: 0.8 },
        });
        cards.forEach((c, i) => {
          tl.fromTo(
            c,
            { y: () => window.innerHeight, rotate: 8, opacity: 0 },
            { y: 0, rotate: 0, opacity: 1, duration: 1, ease: "power3.out" },
            i * 0.8
          ).fromTo(c.querySelector(".stair__num"), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6 }, i * 0.8 + 0.4);
        });
        tl.to({}, { duration: 0.6 });
      });
      mm.add("(max-width: 900px)", () => {
        gsap.utils.toArray<HTMLElement>(".stair__card").forEach((c) =>
          gsap.from(c, { y: 80, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: c, start: "top 90%", once: true } })
        );
      });
    },
    { scope: root }
  );

  return (
    <section className="stair" ref={root} data-theme="dark">
      <div className="container stair__in">
        <div className="stair__head">
          <SplitReveal className="h2">Our <br />Process</SplitReveal>
          <p className="fx-fade">A four-step framework that takes the guesswork out of hospitality marketing and turns your venue&apos;s details into growth.</p>
        </div>
        <div className="stair__grid">
          {PROCESS.map((p, i) => (
            <article className="stair__card" key={p.n} style={{ ["--i" as string]: i }}>
              <Image src={p.img} alt="" fill sizes="(max-width: 900px) 100vw, 25vw" />
              <div className="stair__shade" />
              <span className="stair__num">{p.n}</span>
              <div className="stair__body">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
