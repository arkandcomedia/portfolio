"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, finePointer } from "@/lib/gsap";
import { SERVICES } from "@/lib/content";
import { SectionHead } from "../ui/PageHeader";
import Btn from "../ui/Btn";

/** Service rows — the active row expands into a dark panel with image and sub-cards. */
export default function ServicesList({ heading = true }: { heading?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    const panels = root.current!.querySelectorAll<HTMLElement>(".srv__panel");
    panels.forEach((p, i) => {
      const open = i === active;
      if (first.current) {
        gsap.set(p, { height: open ? "auto" : 0 });
        return;
      }
      gsap.to(p, { height: open ? "auto" : 0, duration: 0.8, ease: "expo.inOut", onComplete: () => ScrollTrigger.refresh() });
      if (open) {
        gsap.fromTo(p.querySelectorAll(".srv__sub"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.8, ease: "expo.out", delay: 0.25 });
        gsap.fromTo(p.querySelector(".srv__img img"), { scale: 1.25 }, { scale: 1, duration: 1.2, ease: "expo.out" });
      }
    });
    first.current = false;
  }, [active]);

  const hover = (i: number) => {
    if (finePointer()) setActive(i);
  };

  return (
    <section className="srv" ref={root}>
      {heading && (
        <div className="container">
          <SectionHead title={<>What We Offer <em>/ Services</em></>} sub="End-to-end solutions to grow your venue, from the first brand idea to the last lantern on the wall." />
        </div>
      )}
      <div className="srv__list">
        {SERVICES.map((s, i) => (
          <div className={`srv__row fx-up${i === active ? " is-active" : ""}`} key={s.slug} onMouseEnter={() => hover(i)}>
            <div className="container">
              <button className="srv__head" onClick={() => setActive(i)} aria-expanded={i === active}>
                <span className="srv__n">0{i + 1}</span>
                <span className="srv__titles">
                  <small>{s.category}</small>
                  <span className="srv__title">{s.title}</span>
                </span>
              </button>
              <Btn href={`/contact?service=${encodeURIComponent(s.title)}`} variant="pink" size="sm" arrow className="srv__cta">Start your project</Btn>
              <div className="srv__panel">
                <div className="srv__panel-in">
                  <div className="srv__img">
                    <Image src={s.img} alt="" fill sizes="(max-width: 900px) 100vw, 300px" />
                  </div>
                  <div className="srv__info">
                    <h4>{s.lead}</h4>
                    <p>{s.text}</p>
                    <div className="srv__subs">
                      {s.items.map((it) => <span className="srv__sub" key={it}>{it}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
