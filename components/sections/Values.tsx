import Image from "next/image";
import { VALUES } from "@/lib/content";
import { SectionHead } from "../ui/PageHeader";

const ICONS: Record<string, React.ReactNode> = {
  detail: <><circle cx="16" cy="16" r="9" /><path d="M23 23l7 7" /><path d="M12 16h8M16 12v8" /></>,
  guest: <><circle cx="18" cy="11" r="5" /><path d="M8 30c0-6 4.5-10 10-10s10 4 10 10" /></>,
  measure: <><path d="M6 28l8-9 6 5 10-13" /><path d="M24 11h6v6" /></>,
};

export default function Values() {
  return (
    <section className="values">
      <div className="container">
        <SectionHead title="Our Values" align="split" sub="We fuel bold ideas and drive them forward with sharp strategy." />
        <div className="values__grid">
          <div className="values__img fx-clip">
            <Image src="/img/crop-06.jpg" alt="The ARK team setting up a venue" fill sizes="(max-width: 900px) 100vw, 45vw" data-parallax="6" />
          </div>
          {VALUES.map((v) => (
            <div className="value fx-up" key={v.title}>
              <svg viewBox="0 0 36 36" className="value__ic" aria-hidden="true">{ICONS[v.icon]}</svg>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
