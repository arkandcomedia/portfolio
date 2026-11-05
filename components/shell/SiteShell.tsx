"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, useGSAP, finePointer, reducedMotion } from "@/lib/gsap";
import { LoaderContext } from "@/lib/loader-context";
import Preloader from "./Preloader";
import Cursor from "./Cursor";
import Nav from "./Nav";
import Footer from "./Footer";

// curtain edge: flat ↔ bulging
const FLAT = "M0 100 L100 100 L100 100 Q50 100 0 100 Z";
const BULGE = "M0 100 L100 100 L100 100 Q50 0 0 100 Z";

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [preGone, setPreGone] = useState(false);
  const lenis = useRef<Lenis | null>(null);
  const main = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const covering = useRef(false);

  // ---------- smooth scroll ----------
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    if (reducedMotion()) return;
    const l = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.current = l;
    l.stop();
    l.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      l.destroy();
      lenis.current = null;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    document.documentElement.classList.remove("is-loading");
    lenis.current?.start();
    ScrollTrigger.refresh();
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [loaded]);

  // ---------- page transitions ----------
  const cover = useCallback(
    (href: string) => {
      const el = curtain.current;
      if (!el || covering.current) return;
      covering.current = true;
      lenis.current?.stop();
      gsap
        .timeline({ onComplete: () => router.push(href) })
        .set(el, { y: 0, yPercent: 100, visibility: "visible" })
        .set(el.querySelector(".pt__mark"), { opacity: 0, y: 30 })
        .to(el, { yPercent: 0, duration: 0.75, ease: "power4.inOut" })
        .fromTo(el.querySelector(".pt__edge path"), { attr: { d: FLAT } }, { attr: { d: BULGE }, duration: 0.38, ease: "power2.in" }, 0)
        .to(el.querySelector(".pt__edge path"), { attr: { d: FLAT }, duration: 0.38, ease: "power2.out" }, 0.38)
        .to(el.querySelector(".pt__mark"), { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.45);
    },
    [router]
  );

  // new route rendered → jump to top, lift the curtain
  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    requestAnimationFrame(() => ScrollTrigger.refresh());
    const el = curtain.current;
    if (!el || !covering.current) return;
    gsap
      .timeline({
        delay: 0.1,
        onComplete: () => {
          covering.current = false;
          gsap.set(el, { visibility: "hidden" });
        },
      })
      .to(el.querySelector(".pt__mark"), { opacity: 0, y: -30, duration: 0.35, ease: "power2.in" })
      .to(el, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, 0.15)
      .add(() => {
        if (loaded) lenis.current?.start();
      }, 0.5);
  }, [pathname, loaded]);

  // intercept internal link clicks (capture phase runs before next/link)
  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const raw = a.getAttribute("href")!;
      const url = new URL(a.href, location.href); // mailto:/tel: get origin "null" and fall through
      if (url.origin !== location.origin) return;

      // same-page anchors glide through Lenis
      if (url.pathname === location.pathname && (url.hash || raw === "#")) {
        e.preventDefault();
        const target = url.hash ? document.querySelector<HTMLElement>(url.hash) : null;
        if (target) lenis.current ? lenis.current.scrollTo(target, { duration: 1.4 }) : target.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (url.pathname === location.pathname) {
        e.preventDefault();
        lenis.current ? lenis.current.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (reducedMotion()) return;
      e.preventDefault();
      e.stopPropagation();
      document.documentElement.classList.remove("menu-open");
      cover(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", click, true);
    return () => document.removeEventListener("click", click, true);
  }, [cover]);

  // ---------- reveals that re-run on every page ----------
  useGSAP(
    () => {
      gsap.fromTo(
        document.querySelector(".progress span"),
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 } }
      );
      if (reducedMotion()) return;

      // [selector, hidden state, start] — fade-up is the reference's 60px rise
      const reveals: [string, gsap.TweenVars, string][] = [
        [".fx-up", { opacity: 0, y: 60 }, "top 92%"],
        [".fx-fade", { opacity: 0 }, "top 94%"],
        [".fx-scale", { opacity: 0, scale: 0.92 }, "top 90%"],
      ];
      reveals.forEach(([sel, from, start]) => {
        const els = gsap.utils.toArray<HTMLElement>(sel, main.current);
        if (!els.length) return;
        gsap.set(els, from);
        ScrollTrigger.batch(els, {
          start,
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "expo.out", stagger: 0.09, overwrite: true }),
        });
      });

      // clip-reveal images
      gsap.utils.toArray<HTMLElement>(".fx-clip").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(14% 10% 14% 10% round 24px)" },
          { clipPath: "inset(0% 0% 0% 0% round 24px)", ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 40%", scrub: true } }
        );
      });
      // parallax images
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = Number(el.dataset.parallax || 12);
        gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
      });

      if (!finePointer()) return;
      gsap.utils.toArray<HTMLElement>(".tilt").forEach((el) => {
        el.addEventListener("mousemove", (e) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          el.style.setProperty("--mx", `${px * 100}%`);
          el.style.setProperty("--my", `${py * 100}%`);
          gsap.to(el, { rotateY: (px - 0.5) * 8, rotateX: (0.5 - py) * 8, transformPerspective: 900, duration: 0.6, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1,0.5)" }));
      });
    },
    { scope: main, dependencies: [pathname, loaded], revertOnUpdate: true }
  );

  return (
    <LoaderContext.Provider value={{ loaded, lenis }}>
      {!preGone && <Preloader onReveal={() => setLoaded(true)} onDone={() => setPreGone(true)} />}
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <div className="progress" aria-hidden="true"><span /></div>
      <Nav />
      <div ref={main} className="site">
        <main id="top">{children}</main>
        <Footer />
      </div>
      <div className="pt" ref={curtain} aria-hidden="true">
        <svg className="pt__edge" viewBox="0 0 100 100" preserveAspectRatio="none"><path d={FLAT} /></svg>
        <div className="pt__mark">
          <span>ARK</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/bamboo.png" alt="" />
        </div>
      </div>
    </LoaderContext.Provider>
  );
}
