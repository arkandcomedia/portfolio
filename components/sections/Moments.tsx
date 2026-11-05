"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import { MOMENTS } from "@/lib/content";
import SplitReveal from "../ui/SplitReveal";

/** Dark section: campaign cards flip in (3D) and drift in two parallax columns over a moving backdrop. */
export default function Moments() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".mcard").forEach((c) => {
        gsap.fromTo(
          c,
          { rotateY: 180, opacity: 0.2 },
          { rotateY: 0, opacity: 1, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: c, start: "top 88%", once: true } }
        );
      });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        gsap.to(".moments__col--a", { yPercent: -18, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.to(".moments__col--b", { yPercent: 10, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(".moments__center", { y: -40 }, { y: 120, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: true } });
      });
      gsap.fromTo(".moments__bg", { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    },
    { scope: root }
  );

  const card = (m: (typeof MOMENTS)[number], i: number) => (
    <figure className="mcard" key={m.line}>
      <div className="mcard__img"><Image src={m.img} alt={m.line} fill sizes="(max-width: 900px) 80vw, 320px" /></div>
      <figcaption>
        <span className="mcard__stars" aria-hidden="true">✦ ✦ ✦ ✦ ✦</span>
        <b>{m.line}</b>
        <small>{String(i + 1).padStart(2, "0")} / 07 · {m.kicker}</small>
      </figcaption>
    </figure>
  );

  return (
    <section className="moments" ref={root} data-theme="dark">
      <div className="moments__bg"><Image src="/img/crop-04.jpg" alt="" fill sizes="100vw" /></div>
      <div className="container moments__grid">
        <div className="moments__col moments__col--a">{MOMENTS.filter((_, i) => i % 2 === 0).map((m) => card(m, MOMENTS.indexOf(m)))}</div>
        <div className="moments__center">
          <SplitReveal className="h2">Moments Guests <em>Remember</em></SplitReveal>
          <p className="fx-fade">Seven frames from our Vayu Halloween takeover, each one a moment we designed on the floor and then told on the feed.</p>
        </div>
        <div className="moments__col moments__col--b">{MOMENTS.filter((_, i) => i % 2 === 1).map((m) => card(m, MOMENTS.indexOf(m)))}</div>
      </div>
    </section>
  );
}
