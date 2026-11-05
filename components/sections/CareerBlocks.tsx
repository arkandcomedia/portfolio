"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import { JOBS } from "@/lib/content";
import { SectionHead } from "../ui/PageHeader";
import Btn from "../ui/Btn";

export function Positions() {
  return (
    <section className="jobs" id="positions">
      <div className="container">
        <SectionHead title="Open Positions" sub="Find a role where your skills create real impact on the floor and on the feed." />
        <div className="jobs__list">
          {JOBS.map((j) => (
            <div className="job fx-up" key={j.title}>
              <div>
                <h3>{j.title}</h3>
                <p>{j.meta}</p>
              </div>
              <Btn href={`/contact?service=${encodeURIComponent("Career / Join the team")}&role=${encodeURIComponent(j.title)}`} variant="pink" size="sm" arrow>Apply now</Btn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const LIFE = [
  { img: "/img/crop-06.jpg", title: "On the floor", text: "We set up what we design. You'll be there when the lights go on." },
  { img: "/img/crop-02.jpg", title: "Ideas first", text: "Every project starts with imagination, a laptop and a good view." },
  { img: "/img/crop-07.jpg", title: "Close to guests", text: "We talk to the people we're designing for, not just about them." },
];

export function LifeAtArk() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".life__card").forEach((c, i) =>
        gsap.from(c, { y: 120, rotate: i % 2 ? 4 : -4, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: c, start: "top 92%", once: true } })
      );
    },
    { scope: root }
  );
  return (
    <section className="life" ref={root}>
      <div className="container life__grid">
        <div className="life__sticky">
          <SectionHead title={<>Life at <em>ARK</em></>} align="split" sub="A small team that plans, builds and shoots, then does it all again sharper." />
          <ul className="life__perks fx-up">
            <li>Real venues, real launches</li>
            <li>Learn strategy, design and production</li>
            <li>A team that shows up on set-up day</li>
          </ul>
        </div>
        <div className="life__cards">
          {LIFE.map((l) => (
            <figure className="life__card" key={l.title}>
              <div className="life__img"><Image src={l.img} alt={l.title} fill sizes="(max-width: 900px) 100vw, 45vw" /></div>
              <figcaption><b>{l.title}</b><span>{l.text}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
