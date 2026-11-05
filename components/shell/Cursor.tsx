"use client";

import { useEffect, useRef } from "react";
import { gsap, finePointer } from "@/lib/gsap";

export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !finePointer()) return;
    const dot = el.querySelector(".cursor__dot")!;
    const ring = el.querySelector(".cursor__ring")!;
    const label = el.querySelector(".cursor__label")!;
    const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });

    const move = (e: MouseEvent) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      el.classList.add("is-on");
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const hot = t.closest("a, button, .chip, input, label");
      el.classList.toggle("is-label", !!labelled);
      el.classList.toggle("is-hover", !labelled && !!hot);
      label.textContent = labelled?.dataset.cursor ?? "";
    };
    const down = () => gsap.to(ring, { scale: 0.8, duration: 0.2 });
    const up = () => gsap.to(ring, { scale: 1, duration: 0.5, ease: "elastic.out(1,0.4)" });
    const leave = () => el.classList.remove("is-on");

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <div className="cursor__dot" />
      <div className="cursor__ring"><span className="cursor__label" /></div>
    </div>
  );
}
