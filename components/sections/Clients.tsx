import { VENUE_TYPES } from "@/lib/content";
import { SectionHead } from "../ui/PageHeader";

/** "Who we work with" — logo-card marquee (CSS-driven so it never stalls). */
export default function Clients() {
  const cards = VENUE_TYPES.map((v, i) => (
    <div className={`client${i === 0 ? " client--feat" : ""}`} key={v}>
      <span className="client__ic" aria-hidden="true">{i === 0 ? "✦" : v[0]}</span>
      {v}
      {i === 0 && <small>Featured client</small>}
    </div>
  ));
  return (
    <section className="clients">
      <div className="container">
        <SectionHead title="Who We Work With" align="split" sub="Built for hospitality only: cafés, restaurants, stays, lounges and the people who run them." />
      </div>
      <div className="clients__rail fx-fade">
        <div className="clients__track">
          {cards}
          {cards.map((c, i) => <div key={`d${i}`} aria-hidden="true" style={{ display: "contents" }}>{c}</div>)}
        </div>
      </div>
    </section>
  );
}
