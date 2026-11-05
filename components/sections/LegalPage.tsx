import PageHeader from "../ui/PageHeader";

type Props = { title: string; updated: string; sections: { h: string; p: string[] }[] };

export default function LegalPage({ title, updated, sections }: Props) {
  return (
    <>
      <PageHeader title={title} sub={`Last updated: ${updated}`} />
      <section className="legal">
        <div className="container legal__in">
          {sections.map((s) => (
            <div className="fx-up" key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((p) => <p key={p}>{p}</p>)}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
