"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FAQS } from "@/lib/content";
import { SectionHead } from "../ui/PageHeader";

const TABS = Object.keys(FAQS);

export default function FaqBlock() {
  const list = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState(TABS[0]);
  const [open, setOpen] = useState<number | null>(0);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) return;
    gsap.fromTo(list.current!.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", stagger: 0.06 });
  }, [tab]);

  useEffect(() => {
    list.current!.querySelectorAll<HTMLElement>(".qa__a").forEach((a, i) => {
      if (!mounted.current) gsap.set(a, { height: i === open ? "auto" : 0 });
      else gsap.to(a, { height: i === open ? "auto" : 0, duration: 0.6, ease: "expo.inOut", onComplete: () => ScrollTrigger.refresh() });
    });
    mounted.current = true;
  }, [open, tab]);

  return (
    <section className="faq">
      <div className="container faq__in">
        <SectionHead title="Frequently Asked Questions" sub="Everything venues usually ask before working with ARK." />
        <div className="faq__tabs fx-up" role="tablist">
          {TABS.map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "is-on" : ""} onClick={() => { setTab(t); setOpen(0); }}>
              {t}
            </button>
          ))}
        </div>
        <div className="faq__list fx-up" ref={list}>
          {FAQS[tab].map((f, i) => (
            <div className={`qa${open === i ? " is-open" : ""}`} key={f.q}>
              <button className="qa__q" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                {f.q}<i aria-hidden="true" />
              </button>
              <div className="qa__a"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
