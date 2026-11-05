import { COMPARE, PLANS } from "@/lib/content";
import { SectionHead } from "../ui/PageHeader";

const cell = (v: string | boolean) =>
  v === true ? <span className="tick">✓</span> : v === false ? <span className="cross">✕</span> : v === "double" ? <span className="tick">✓✓</span> : v;

export default function Compare() {
  return (
    <section className="compare">
      <div className="container">
        <SectionHead title="Compare Engagements" sub="Clear options to help you choose the right level of strategy, experience and content support." />
        <div className="compare__wrap fx-up">
          <table className="compare__table">
            <thead>
              <tr><th>Features</th>{PLANS.map((p) => <th key={p.name}>{p.name}</th>)}</tr>
            </thead>
            <tbody>
              {COMPARE.map((r) => (
                <tr key={r.feature} className="fx-fade">
                  <td>{r.feature}</td>
                  {r.values.map((v, i) => <td key={i}>{cell(v)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
