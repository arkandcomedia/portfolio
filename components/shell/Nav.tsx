"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { usePathname } from "next/navigation";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useLoader } from "@/lib/loader-context";
import { NAV, ALL_PAGES } from "@/lib/content";
import Btn from "../ui/Btn";

export default function Nav() {
  const nav = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const { loaded, lenis } = useLoader();

  useEffect(() => {
    setOpen(false);
    setDrop(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (open) lenis.current?.stop();
    else if (loaded) lenis.current?.start();
  }, [open, loaded, lenis]);

  // intro once
  useGSAP(() => {
    if (!loaded) {
      gsap.set(nav.current, { yPercent: -160, opacity: 0 });
      return;
    }
    gsap.to(nav.current, { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.4 });
  }, { dependencies: [loaded] });

  // scrolled / hide-on-down / dark sections — rebuilt per page
  useGSAP(
    () => {
      if (!loaded) return;
      const el = nav.current!;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          el.classList.toggle("is-scrolled", y > 30);
          el.classList.toggle("is-hidden", self.direction === 1 && y > 500 && !document.documentElement.classList.contains("menu-open"));
        },
      });
      const darks = gsap.utils.toArray<HTMLElement>("[data-theme='dark']");
      const triggers = darks.map((s) => {
        const target = s.parentElement?.classList.contains("pin-spacer") ? s.parentElement : s;
        return ScrollTrigger.create({ trigger: target, start: "top 44px", end: "bottom 44px", onToggle: () => update() });
      });
      const update = () => document.documentElement.classList.toggle("on-dark", triggers.some((t) => t.isActive));
      update();
      return () => document.documentElement.classList.remove("on-dark");
    },
    { dependencies: [loaded, pathname], revertOnUpdate: true }
  );

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="nav" ref={nav}>
        <Link href="/" className="nav__logo" aria-label="ARK Hospitality home">
          <span className="nav__ark">ARK</span>
          <Photo src="/img/bamboo.png" alt="" width={143} height={258} className="nav__bamboo" priority />
          <span className="nav__hosp">Hospitality</span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className={`nav__link roll${isActive(l.href) ? " is-active" : ""}`}>
              <span data-text={l.label}>{l.label}</span>
            </Link>
          ))}
          <div className={`nav__drop${drop ? " is-open" : ""}`} onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
            <button className="nav__link nav__drop-btn" aria-expanded={drop} onClick={() => setDrop((d) => !d)}>
              All Pages <i aria-hidden="true" />
            </button>
            <div className="nav__menu">
              {ALL_PAGES.map((p) => (
                <Link key={p.href} href={p.href} className="nav__menu-item" prefetch={p.href === "/404" ? false : undefined}>
                  {p.label}<span>↗</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <Btn href="/contact" variant="pink" arrow className="nav__cta">Contact Us</Btn>
        <button className="nav__burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span /><span />
        </button>
      </header>

      <div className="menu" aria-hidden={!open}>
        <nav className="menu__links">
          {[...NAV, { href: "/contact", label: "Contact" }].map((l, i) => (
            <Link key={l.href} href={l.href} tabIndex={open ? 0 : -1} className={isActive(l.href) ? "is-active" : ""}>
              <span>0{i + 1}</span>{l.label}
            </Link>
          ))}
        </nav>
        <div className="menu__foot">
          {ALL_PAGES.slice(1).map((p) => (
            <Link key={p.href} href={p.href} tabIndex={open ? 0 : -1} prefetch={p.href === "/404" ? false : undefined}>{p.label}</Link>
          ))}
        </div>
      </div>
    </>
  );
}
