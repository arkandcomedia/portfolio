import ScrollFill from "../ui/ScrollFill";

type Props = { meta: string[]; children: React.ReactNode };

/** Small meta column + big scroll-filled statement (home, services, career). */
export default function Intro({ meta, children }: Props) {
  return (
    <section className="intro">
      <div className="container intro__grid">
        <ul className="intro__meta fx-up">
          {meta.map((m) => <li key={m}>{m}</li>)}
        </ul>
        <ScrollFill className="intro__text">{children}</ScrollFill>
      </div>
    </section>
  );
}
