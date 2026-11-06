"use client";

import { useRef } from "react";
import Photo from "@/components/ui/Photo";
import { gsap, useGSAP, reducedMotion, finePointer } from "@/lib/gsap";
import { useLoader } from "@/lib/loader-context";
import { HERO_PILLS, HERO_STATS, TICKER } from "@/lib/content";
import Btn from "../ui/Btn";
import Ticker from "../ui/Ticker";

const WORD = "HOSPITALITY";

export default function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const { loaded } = useLoader();

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      if (reducedMotion()) return;
      if (!loaded) {
        gsap.set(q(".giant__l"), { yPercent: 105 });
        gsap.set(q(".hero-top > *"), { opacity: 0, y: 16 });
        gsap.set(q(".banner"), { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(q(".banner__img"), { scale: 1.35 });
        gsap.set(q(".banner__in > *"), { opacity: 0, y: 30 });
        gsap.set(q(".ticker"), { opacity: 0 });
        return;
      }

      gsap
        .timeline({ delay: 0.15 })
        .to(q(".hero-top > *"), { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 })
        .to(q(".giant__l"), { yPercent: 0, duration: 1.3, ease: "expo.out", stagger: 0.05 }, 0.05)
        .to(q(".banner"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" }, 0.45)
        .to(q(".banner__img"), { scale: 1, duration: 2, ease: "expo.out" }, 0.6)
        .to(q(".banner__in > *"), { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, 1.1)
        .to(q(".ticker"), { opacity: 1, duration: 1 }, 1.3);

      // scroll: banner image drifts, giant word lifts away
      gsap.to(q(".banner__img"), { yPercent: 12, ease: "none", scrollTrigger: { trigger: q(".banner")[0], start: "top 60%", end: "bottom top", scrub: true } });
      gsap.to(q(".giant"), { yPercent: -18, opacity: 0.35, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "45% top", scrub: true } });

      // letters lean towards the cursor
      if (!finePointer()) return;
      const letters = q(".giant__l");
      const move = (e: MouseEvent) => {
        letters.forEach((l) => {
          const r = l.getBoundingClientRect();
          const d = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
          gsap.to(l, { skewX: -d * 8, duration: 0.8, ease: "power3.out" });
        });
      };
      const giant = q(".giant")[0] as HTMLElement;
      giant.addEventListener("mousemove", move);
      giant.addEventListener("mouseleave", () => gsap.to(letters, { skewX: 0, duration: 1, ease: "elastic.out(1,0.4)" }));
    },
    { scope: root, dependencies: [loaded] }
  );

  return (
    <section className="home-hero" ref={root}>
      <div className="container">
        <div className="hero-top">
          <span>©{new Date().getFullYear()}</span>
          <span>Marketing · Experiences · Growth</span>
          <span>Studio</span>
        </div>
        <h1 className="giant" aria-label="Hospitality">
          {WORD.split("").map((c, i) => (
            <span className="giant__m" key={i} aria-hidden="true">
              <span className="giant__l" style={{ ["--a" as string]: `${(i * 47) % 180}deg` }}>{c}</span>
            </span>
          ))}
        </h1>
      </div>

      <div className="banner">
        <div className="banner__img">
          <Photo src="/img/photo-08.jpg" alt="ARK briefing a chef in the lantern courtyard before a theme night" fill priority sizes="100vw" />
        </div>
        <div className="banner__shade" />
        <div className="banner__in">
          <div className="banner__stats">
            {HERO_STATS.map((s) => (
              <div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
            ))}
          </div>
          <div className="banner__bottom">
            <div className="banner__copy">
              <p>Hospitality marketing, brand identity and on-ground experiences, built around the one thing only your venue offers.</p>
              <div className="banner__ctas">
                <Btn href="/contact" variant="light" arrow>Start your project</Btn>
                <Btn href="/work" variant="ghost" arrow>See our work</Btn>
              </div>
            </div>
            <div className="banner__pills">
              {HERO_PILLS.map((p) => <span key={p}>{p}</span>)}
            </div>
          </div>
        </div>
      </div>

      <Ticker items={TICKER} />
    </section>
  );
}
