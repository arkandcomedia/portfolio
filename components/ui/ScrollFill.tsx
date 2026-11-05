"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import { splitWords } from "@/lib/split";

type Props = { as?: ElementType; className?: string; children: ReactNode; start?: string; end?: string };

/** Paragraph whose words fill from muted to ink as it scrolls through the viewport. */
export default function ScrollFill({ as: Tag = "p", className = "", children, start = "top 85%", end = "bottom 50%" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.fromTo(
        ".hw",
        { opacity: 0.18 },
        { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: ref.current, start, end, scrub: true } }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={`scroll-fill ${className}`}>
      {splitWords(children, "plain")}
    </Tag>
  );
}
