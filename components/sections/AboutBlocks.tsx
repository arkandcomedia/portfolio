"use client";

import { useRef } from "react";
import Photo from "@/components/ui/Photo";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import { BELIEFS } from "@/lib/content";
import { SectionHead } from "../ui/PageHeader";
import Btn from "../ui/Btn";

const IMPACT = [
  { n: 100, suf: "%", label: "Hospitality-only focus" },
  { n: 360, suf: "°", label: "Floor-to-feed coverage" },
  { n: 4, suf: "-step", label: "Analyse → Amplify method" },
  { n: 1, suf: " team", label: "From setup to final touch" },
];

export function Impact() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const o = { v: 0 };
        gsap.to(o, {
          v: Number(el.dataset.count),
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => { el.textContent = String(Math.round(o.v)); },
        });
      });
    },
    { scope: root }
  );
  return (
    <section className="impact" ref={root}>
      <div className="container">
        <SectionHead title="Our Impact" sub="What every ARK engagement is built on, from the first audit to the final post." />
        <div className="impact__grid">
          <blockquote className="impact__quote fx-scale">
            <span aria-hidden="true">&ldquo;</span>
            <p>We see every venue as more than a marketing account. It&apos;s a partnership built on trust, shaped by detail and powered by guests who keep coming back.</p>
            <footer>ARK Hospitality · Founding team</footer>
          </blockquote>
          {IMPACT.map((s) => (
            <div className="impact__card fx-up" key={s.label}>
              <b><span data-count={s.n}>0</span>{s.suf}</b>
              <span>{s.label}</span>
            </div>
          ))}
          <div className="impact__glass fx-up">
            <Photo src="/img/scene-07.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 30vw" />
            <div><b>Floor to feed</b><span>We build the moment, then we make it famous.</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TEAM = [
  { img: "/img/scene-02.jpg", role: "Strategy & planning" },
  { img: "/img/scene-06.jpg", role: "Experience & set-up" },
  { img: "/img/photo-09.jpg", role: "Guest moments" },
  { img: "/img/scene-03.jpg", role: "Styling & details" },
];

export function Team() {
  return (
    <section className="team">
      <div className="container">
        <SectionHead title="The People Behind the Work" sub="Strategists, designers, creators and planners working together to move venues forward." />
        <div className="team__grid">
          <div className="team__join fx-up">
            <small>Join the team</small>
            <h3>Want to shape the future of hospitality marketing?</h3>
            <p>Join us and create experiences that guests remember.</p>
            <Btn href="/career" variant="pink" size="sm" arrow>See open positions</Btn>
          </div>
          {TEAM.map((t) => (
            <figure className="team__card fx-up" key={t.role}>
              <div className="team__img"><Photo src={t.img} alt={t.role} fill sizes="(max-width: 900px) 50vw, 20vw" /></div>
              <figcaption><b>Team ARK</b><span>{t.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Beliefs() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".belief").forEach((row) =>
        gsap.from(row, { x: -80, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 90%", once: true } })
      );
      gsap.fromTo(".beliefs__bg", { scale: 1.25, rotate: -4 }, { scale: 1, rotate: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    },
    { scope: root }
  );
  return (
    <section className="beliefs" ref={root} data-theme="dark">
      <div className="beliefs__bg"><Photo src="/img/scene-05.jpg" alt="" fill sizes="100vw" /></div>
      <div className="container beliefs__in">
        <div className="beliefs__head">
          <SectionHead title="What We Believe" align="split" sub="Five principles behind every venue we work with." />
        </div>
        <div className="beliefs__list">
          {BELIEFS.map((b) => (
            <div className="belief" key={b.n}>
              <span>[{b.n}]</span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
