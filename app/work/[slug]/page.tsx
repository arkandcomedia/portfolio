import type { Metadata } from "next";
import Photo from "@/components/ui/Photo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WORK } from "@/lib/content";
import SplitReveal from "@/components/ui/SplitReveal";
import CtaBlock from "@/components/sections/CtaBlock";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const w = WORK.find((x) => x.slug === slug);
  return w ? { title: w.title, description: w.summary } : {};
}

export default async function WorkDetail({ params }: Params) {
  const { slug } = await params;
  const i = WORK.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const w = WORK[i];
  const next = WORK[(i + 1) % WORK.length];
  const portrait = w.gallery[0].includes("slide");

  return (
    <>
      <section className="case-head">
        <div className="container case-head__grid">
          <div>
            <SplitReveal as="h1" className="case-head__title">{w.title}</SplitReveal>
            <div className="case-head__tags fx-up">{w.services.map((s) => <span key={s}>{s}</span>)}</div>
          </div>
          <p className="fx-up">{w.summary}</p>
        </div>
        <div className="container">
          <div className="case-cover fx-clip">
            <Photo src={w.cover} alt={w.title} fill priority sizes="(max-width: 1360px) 100vw, 1300px" />
          </div>
        </div>
      </section>

      <section className="case-body">
        <div className="container case-body__in">
          <div className="case-facts">
            {w.facts.map((f) => (
              <div className="fx-up" key={f.label}><b>{f.value}</b><span>{f.label}</span></div>
            ))}
          </div>

          <dl className="case-info">
            {[
              ["Client", w.client],
              ["Category", w.category],
              ["Period", w.period],
              ["Industry", "Hospitality"],
            ].map(([k, v]) => (
              <div className="fx-up" key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>

          <div className="case-text fx-up">
            <h2>The Challenge</h2>
            {w.challenge.map((p) => <p key={p}>{p}</p>)}
          </div>

          <div className="case-box fx-up">
            <h2>Our Approach</h2>
            {w.approach.map((p) => {
              const [k, ...rest] = p.split(": ");
              return <p key={p}>{rest.length ? <><strong>{k}:</strong> {rest.join(": ")}</> : p}</p>;
            })}
          </div>

          <div className={`case-gallery${portrait ? " case-gallery--portrait" : ""}`}>
            {w.gallery.map((g) => (
              <div className="case-gallery__item fx-scale" key={g}>
                <Photo src={g} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
            ))}
          </div>

          <div className="case-text fx-up">
            <h2>The Outcome</h2>
            {w.outcome.map((p) => <p key={p}>{p}</p>)}
          </div>

          <Link href={`/work/${next.slug}`} className="case-next fx-up" data-cursor="Next">
            <span>Next project</span>
            <b>{next.title} ↗</b>
          </Link>
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
