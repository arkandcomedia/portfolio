import type { ReactNode } from "react";
import SplitReveal from "./SplitReveal";

type Props = { title: ReactNode; sub?: string; children?: ReactNode; align?: "center" | "split" };

/** Title block at the top of every inner page. */
export default function PageHeader({ title, sub, children, align = "center" }: Props) {
  return (
    <section className={`page-head page-head--${align}`}>
      <div className="container">
        <SplitReveal as="h1" className="page-head__title">{title}</SplitReveal>
        {sub && <p className="page-head__sub fx-up">{sub}</p>}
        {children && <div className="page-head__extra fx-up">{children}</div>}
      </div>
    </section>
  );
}

/** Centered or split section heading used across pages. */
export function SectionHead({ title, sub, align = "center", children }: { title: ReactNode; sub?: string; align?: "center" | "split"; children?: ReactNode }) {
  return (
    <div className={`sec-head sec-head--${align}`}>
      <SplitReveal className="h2">{title}</SplitReveal>
      {(sub || children) && (
        <div className="sec-head__side fx-up">
          {sub && <p>{sub}</p>}
          {children}
        </div>
      )}
    </div>
  );
}
