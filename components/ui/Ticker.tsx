"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, reducedMotion } from "@/lib/gsap";

type Props = { items: string[]; className?: string; speed?: number };

/** Endless "/ ITEM" ticker that speeds up and flips direction with scroll velocity. */
export default function Ticker({ items, className = "", speed = 0.8 }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const track = root.current!.querySelector<HTMLElement>(".ticker__track")!;
      const group = track.firstElementChild as HTMLElement;
      let x = 0;
      let dir = 1;
      let vel = 0;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          dir = self.direction;
          vel = Math.abs(self.getVelocity());
        },
      });
      const tick = () => {
        const w = group.offsetWidth;
        vel *= 0.92;
        x -= (speed + vel / 300) * dir;
        if (x <= -w) x += w;
        if (x > 0) x -= w;
        gsap.set(track, { x });
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: root }
  );

  const group = (hidden?: boolean) => (
    <div className="ticker__group" aria-hidden={hidden}>
      {items.map((t) => (
        <span className="ticker__item" key={t}><b>/</b>{t}</span>
      ))}
    </div>
  );

  return (
    <div className={`ticker ${className}`} ref={root}>
      <div className="ticker__track">
        {group()}
        {group(true)}
      </div>
    </div>
  );
}
