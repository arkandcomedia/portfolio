"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import { useLoader } from "@/lib/loader-context";
import { splitWords } from "@/lib/split";

type Props = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  delay?: number;
  start?: string;
};

/** Heading whose words slide up out of a mask — waits for the preloader on first visit. */
export default function SplitReveal({ as: Tag = "h2", className, children, delay = 0, start = "top 88%" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { loaded } = useLoader();

  useGSAP(
    () => {
      if (reducedMotion()) return;
      if (!loaded) {
        gsap.set(".wi", { yPercent: 115, rotate: 5 });
        return;
      }
      gsap.fromTo(
        ".wi",
        { yPercent: 115, rotate: 5 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.05,
          delay: delay + 0.15,
          scrollTrigger: { trigger: ref.current, start, once: true },
        }
      );
    },
    { scope: ref, dependencies: [loaded] }
  );

  return (
    <Tag ref={ref} className={className}>
      {splitWords(children)}
    </Tag>
  );
}
