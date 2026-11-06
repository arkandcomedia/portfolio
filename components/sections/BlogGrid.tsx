import Photo from "@/components/ui/Photo";
import Link from "next/link";
import { POSTS } from "@/lib/content";
import { SectionHead } from "../ui/PageHeader";
import Btn from "../ui/Btn";

/** variant "home": featured post + 2 cards with side heading. "all": full grid. */
export default function BlogGrid({ variant = "home" }: { variant?: "home" | "all" }) {
  if (variant === "all") {
    return (
      <section className="blog blog--all">
        <div className="container blog__grid">
          {POSTS.map((p) => <Card key={p.slug} p={p} />)}
        </div>
      </section>
    );
  }
  const [feat, ...rest] = POSTS;
  return (
    <section className="blog">
      <div className="container">
        <SectionHead title={<>Insights That <br />Drive Growth</>} align="split" sub="Hospitality marketing trends, strategies and practical tips to help your venue grow.">
          <Btn href="/blog" variant="pink" size="sm" arrow>See all articles</Btn>
        </SectionHead>
        <Link href={`/blog/${feat.slug}`} className="post-feat fx-up" data-cursor="Read">
          <div className="post-feat__img"><Photo src={feat.img} alt="" fill sizes="(max-width: 900px) 100vw, 45vw" /></div>
          <div className="post-feat__body">
            <span className="chip"><i />{feat.category}</span>
            <h3>{feat.title}</h3>
            <p>{feat.excerpt}</p>
            <span className="post-feat__more">Read article ↗</span>
          </div>
        </Link>
        <div className="blog__grid blog__grid--2">
          {rest.slice(0, 2).map((p) => <Card key={p.slug} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function Card({ p }: { p: (typeof POSTS)[number] }) {
  return (
    <Link href={`/blog/${p.slug}`} className="post fx-up" data-cursor="Read">
      <div className="post__img">
        <Photo src={p.img} alt="" fill sizes="(max-width: 900px) 100vw, 40vw" />
        <span className="chip"><i />{p.category}</span>
      </div>
      <h3>{p.title}</h3>
      <p>{p.excerpt}</p>
    </Link>
  );
}
