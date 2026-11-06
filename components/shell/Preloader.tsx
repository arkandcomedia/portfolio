"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const PRELOAD = [
  "/img/crop-07.jpg",
  "/img/crop-02.jpg",
  "/img/crop-05.jpg",
  "/img/bamboo.png",
  "/img/slide-01.jpg",
  "/img/slide-02.jpg",
  "/img/slide-03.jpg",
  "/img/logo.jpg",
];

const STATUS = [
  "Analysing every detail",
  "Reading the trends",
  "Finding the USP",
  "Designing the moment",
  "Making it famous",
];

// bottom edge of each curtain: flat ↔ bulging
const FLAT = "M0 0 L100 0 L100 0 Q50 0 0 0 Z";
const CURVE = "M0 0 L100 0 L100 0 Q50 100 0 0 Z";

type Props = { onReveal: () => void; onDone: () => void };

export default function Preloader({ onReveal, onDone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const cb = useRef({ onReveal, onDone });
  cb.current = { onReveal, onDone };

  useGSAP(
    (_, contextSafe) => {
      const q = gsap.utils.selector(root);
      const num = q(".pre__num")[0] as HTMLElement;
      const bar = q(".pre__bar span");
      const phrases = q(".pre__status span");
      let cancelled = false;
      let current = -1;

      gsap.set(phrases, { yPercent: 110, opacity: 0 });

      // only the outgoing and incoming phrase may move; a still-pending delayed slide-in
      // from an earlier phrase would otherwise land on top of the new one
      const showPhrase = (i: number) => {
        if (i === current) return;
        gsap.killTweensOf(phrases);
        phrases.forEach((p, k) => {
          if (k !== current && k !== i) gsap.set(p, { yPercent: 110, opacity: 0 });
        });
        if (current >= 0) gsap.to(phrases[current], { yPercent: -110, opacity: 0, duration: 0.28, ease: "power2.in" });
        gsap.fromTo(phrases[i], { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55, ease: "expo.out", delay: current >= 0 ? 0.3 : 0 });
        current = i;
      };

      const proxy = { v: 0 };
      const render = () => {
        num.textContent = String(Math.round(proxy.v)).padStart(3, "0");
        gsap.set(bar, { scaleX: proxy.v / 100 });
        showPhrase(Math.min(STATUS.length - 1, Math.floor((proxy.v / 100) * (STATUS.length - 0.01))));
      };

      // --- intro ---
      gsap
        .timeline()
        .from(q(".pre__top > *, .pre__foot"), { opacity: 0, y: 12, stagger: 0.08, duration: 0.7, ease: "power2.out" })
        .fromTo(q(".pre__l > span"), { y: 0, yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.1 }, 0.1)
        .to(q(".pre__bamboo"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power3.inOut" }, 0.45)
        .to(q(".pre__sub"), { opacity: 1, duration: 0.6 }, 0.9)
        .to(q(".pre__sub .rule"), { width: 60, duration: 1, ease: "expo.out" }, 0.9)
        .fromTo(q(".pre__sub b"), { letterSpacing: "1.1em" }, { letterSpacing: "0.5em", duration: 1.4, ease: "expo.out" }, 0.9);

      gsap.to(q(".pre__bamboo"), { rotate: -3, duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1.2 });

      // --- progress: glide to 86, wait for images, finish ---
      const toMost = gsap.to(proxy, { v: 86, duration: 2.3, ease: "power2.inOut", onUpdate: render });
      const images = Promise.all(
        PRELOAD.map(
          (src) =>
            new Promise<void>((res) => {
              const im = new Image();
              im.onload = im.onerror = () => res();
              im.src = src;
            })
        )
      );
      const timeout = new Promise<void>((res) => setTimeout(res, 6000));

      const exit = contextSafe!(() => {
        const tl = gsap.timeline({ onComplete: () => cb.current.onDone() });
        tl.to(q(".pre__top, .pre__foot, .pre__status, .pre__sub"), { opacity: 0, y: -16, duration: 0.5, ease: "power2.in", stagger: 0.04 })
          .to(q(".pre__l > span"), { yPercent: -110, duration: 0.8, ease: "expo.in", stagger: 0.06 }, 0.05)
          .to(q(".pre__bamboo"), { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "expo.in" }, 0.15)
          .to(q(".pre__count"), { yPercent: -40, opacity: 0, duration: 0.6, ease: "expo.in" }, 0.1)
          .addLabel("lift", 0.85)
          .to(q(".pre__panel"), { yPercent: -100, duration: 1.15, ease: "power4.inOut" }, "lift")
          .to(q(".pre__panel .pre__curve path"), { attr: { d: CURVE }, duration: 0.55, ease: "power2.in" }, "lift")
          .to(q(".pre__panel .pre__curve path"), { attr: { d: FLAT }, duration: 0.6, ease: "power2.out" }, "lift+=0.55")
          .to(q(".pre__layer--green"), { yPercent: -100, duration: 1.15, ease: "power4.inOut" }, "lift+=0.14")
          .to(q(".pre__layer--green .pre__curve path"), { attr: { d: CURVE }, duration: 0.55, ease: "power2.in" }, "lift+=0.14")
          .to(q(".pre__layer--green .pre__curve path"), { attr: { d: FLAT }, duration: 0.6, ease: "power2.out" }, "lift+=0.69")
          .call(() => cb.current.onReveal(), [], "lift+=0.55");
      });

      Promise.all([Promise.race([images, timeout]), toMost.then()]).then(() => {
        if (cancelled) return;
        gsap.to(proxy, { v: 100, duration: 0.7, ease: "power2.out", onUpdate: render, onComplete: () => { if (!cancelled) exit(); } });
      });

      return () => {
        cancelled = true;
      };
    },
    { scope: root }
  );

  return (
    <div className="pre" ref={root} aria-hidden="true">
      <div className="pre__layer pre__layer--green">
        <svg className="pre__curve" viewBox="0 0 100 100" preserveAspectRatio="none"><path d={FLAT} /></svg>
      </div>
      <div className="pre__layer pre__panel">
        <div className="pre__top">
          <span>ARK / Hospitality</span>
          <span>Growth studio for venues</span>
        </div>

        <div className="pre__center">
          <div className="pre__mark">
            <span className="pre__word">
              <span className="pre__l"><span>A</span></span>
              <span className="pre__l"><span>R</span></span>
              <span className="pre__l"><span>K</span></span>
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="pre__bamboo" src="/img/bamboo.png" alt="" />
          </div>
          <div className="pre__sub"><span className="rule" /><b>HOSPITALITY</b><span className="rule" /></div>
          <div className="pre__status">
            {STATUS.map((s, i) => (
              <span key={s}>{s}{i === STATUS.length - 1 ? "." : "…"}</span>
            ))}
          </div>
        </div>

        <div className="pre__bottom">
          <span className="pre__foot">Hospitality • Branding • Experiences</span>
          <div className="pre__bar"><span /></div>
          <div className="pre__count"><span className="pre__num">000</span><sup>%</sup></div>
        </div>
        <svg className="pre__curve" viewBox="0 0 100 100" preserveAspectRatio="none"><path d={FLAT} /></svg>
      </div>
    </div>
  );
}
