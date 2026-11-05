"use client";

import { useEffect, useRef, type Ref } from "react";
import Link from "next/link";
import { gsap, finePointer } from "@/lib/gsap";

type Props = {
  children: string;
  href?: string;
  variant?: "pink" | "dark" | "light" | "outline" | "ghost";
  size?: "sm" | "lg";
  block?: boolean;
  arrow?: boolean;
  magnetic?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function Btn({
  children,
  href,
  variant = "pink",
  size,
  block,
  arrow,
  magnetic = true,
  type = "button",
  disabled,
  className = "",
  onClick,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !magnetic || !finePointer()) return;
    const label = el.querySelector(".btn__roll");
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: x * 0.25, y: y * 0.35, duration: 0.6, ease: "power3.out" });
      gsap.to(label, { x: x * 0.1, y: y * 0.12, duration: 0.6, ease: "power3.out" });
    };
    const leave = () => gsap.to([el, label], { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.35)" });
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [magnetic]);

  const cls = ["btn", `btn--${variant}`, size && `btn--${size}`, block && "btn--block", className].filter(Boolean).join(" ");
  const inner = (
    <>
      <span className="btn__roll"><span data-text={children}>{children}</span></span>
      {arrow && (
        <span className="btn__arrow" aria-hidden="true">
          <svg viewBox="0 0 16 16"><path d="M4 12L12 4M5 4h7v7" /></svg>
          <svg viewBox="0 0 16 16"><path d="M4 12L12 4M5 4h7v7" /></svg>
        </span>
      )}
    </>
  );

  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href);
    return external ? (
      <a href={href} className={cls} ref={ref as Ref<HTMLAnchorElement>} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls} ref={ref as Ref<HTMLAnchorElement>}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} ref={ref as Ref<HTMLButtonElement>} disabled={disabled} onClick={onClick}>
      {inner}
    </button>
  );
}
