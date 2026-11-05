"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, reducedMotion } from "@/lib/gsap";
import SplitReveal from "../ui/SplitReveal";
import Btn from "../ui/Btn";

const LEAVES = 12;

/** "Ready to grow?" block with a spinning 3D ring of bamboo that speeds up with scroll. */
export default function CtaBlock() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const ring = root.current!.querySelector<HTMLElement>(".ring")!;
      let rot = 0;
      let boost = 0;
      ScrollTrigger.create({ trigger: root.current, start: "top bottom", end: "bottom top", onUpdate: (s) => { boost = Math.abs(s.getVelocity()) / 60; } });
      const tick = () => {
        boost *= 0.94;
        rot += 0.35 + boost * 0.05;
        gsap.set(ring, { rotateZ: rot, rotateY: Math.sin(rot * 0.025) * 38, rotateX: Math.cos(rot * 0.018) * 14 });
      };
      gsap.ticker.add(tick);
      gsap.from(".ring-wrap", { scale: 0.4, opacity: 0, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 80%", once: true } });
      return () => gsap.ticker.remove(tick);
    },
    { scope: root }
  );

  return (
    <section className="cta" ref={root}>
      <div className="ring-wrap" aria-hidden="true">
        <div className="ring-glow" />
        <div className="ring-tilt">
          <div className="ring">
            {Array.from({ length: LEAVES }).map((_, i) => (
              <span key={i} style={{ transform: `rotateZ(${(360 / LEAVES) * i}deg) translateY(calc(var(--rz) * -1))` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/bamboo.png" alt="" />
              </span>
            ))}
          </div>
        </div>
      </div>
      <SplitReveal className="cta__title">Ready to Grow Your Venue?</SplitReveal>
      <p className="fx-up">Let&apos;s build something guests actually remember.</p>
      <div className="fx-up"><Btn href="/contact" variant="pink" arrow>Contact Us</Btn></div>
    </section>
  );
}
