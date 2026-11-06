import type { Metadata } from "next";
import Photo from "@/components/ui/Photo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS } from "@/lib/content";
import SplitReveal from "@/components/ui/SplitReveal";
import EnquiryInline from "@/components/ui/EnquiryInline";
import CtaBlock from "@/components/sections/CtaBlock";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = POSTS.find((x) => x.slug === slug);
  if (!post) notFound();
  const more = POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <section className="post-head">
        <div className="container">
          <SplitReveal as="h1" className="post-head__title">{post.title}</SplitReveal>
          <p className="post-head__sub fx-up">{post.excerpt}</p>
          <div className="post-head__img fx-clip">
            <Photo src={post.img} alt="" fill priority sizes="(max-width: 1360px) 100vw, 1300px" data-parallax="6" />
          </div>
          <div className="post-head__meta fx-up">
            <span>{post.read}</span>
            <span>{post.category}</span>
            <span>ARK Hospitality</span>
          </div>
        </div>
      </section>

      <section className="article">
        <div className="container article__grid">
          <article className="article__body">
            {post.body.map((s) => (
              <div className="fx-up" key={s.h}>
                <h2>{s.h}</h2>
                {s.p.map((p) => <p key={p}>{p}</p>)}
              </div>
            ))}
          </article>
          <aside className="article__side">
            <div className="article__sub">
              <h4>Subscribe to get interesting updates</h4>
              <p>No spam. Just hospitality growth notes.</p>
              <EnquiryInline kind="newsletter" placeholder="Enter your email" cta="Go" light />
            </div>
            <div className="article__more">
              <h5>Keep reading</h5>
              {more.map((m) => (
                <Link key={m.slug} href={`/blog/${m.slug}`} className="ulink">{m.title}</Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
