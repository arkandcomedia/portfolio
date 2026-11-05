"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { PLANS } from "@/lib/content";
import { SectionHead } from "../ui/PageHeader";
import Btn from "../ui/Btn";

type Mode = "project" | "monthly";

/** Plan cards with a sliding monthly/project switch; prices roll when it flips. */
export default function Plans({ heading = true }: { heading?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("project");

  useGSAP(
    () => {
      gsap.fromTo(".plan__price b, .plan__price small", { yPercent: 80, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: "expo.out", stagger: 0.04 });
    },
    { scope: root, dependencies: [mode], revertOnUpdate: true }
  );

  return (
    <section className="plans" ref={root}>
      <div className="container">
        {heading && (
          <SectionHead
            title="Simple, Transparent Engagements"
            sub="Pick the shape that fits your venue. Every engagement starts with a free discovery call and a clear quote."
          />
        )}
        <div className="switch fx-up">
          <button className={mode === "project" ? "is-on" : ""} onClick={() => setMode("project")}>Per project</button>
          <button
            className={`switch__track${mode === "monthly" ? " is-right" : ""}`}
            aria-label="Toggle billing"
            onClick={() => setMode((m) => (m === "project" ? "monthly" : "project"))}
          >
            <i />
          </button>
          <button className={mode === "monthly" ? "is-on" : ""} onClick={() => setMode("monthly")}>Monthly</button>
          <span className="switch__badge">Best value</span>
        </div>

        <div className="plans__grid">
          {PLANS.map((p) => (
            <article className={`plan tilt fx-up${p.hot ? " plan--hot" : ""}`} key={p.name}>
              <div className="plan__top">
                <div className="plan__name">
                  <h3>{p.name}</h3>
                  {p.hot && <span className="plan__badge">Popular</span>}
                </div>
                <p>{p.for}</p>
                <div className="plan__price"><b>{p.price[mode]}</b><small>{p.unit[mode]}</small></div>
                <Btn href={`/contact?service=${encodeURIComponent(`${p.name} engagement`)}`} variant={p.hot ? "pink" : "outline"} block magnetic={false}>Get a quote</Btn>
              </div>
              <div className="plan__feat">
                <h4>Features:</h4>
                <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
