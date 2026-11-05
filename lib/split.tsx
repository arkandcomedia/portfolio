import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

type Mode = "mask" | "plain";

/**
 * Splits text inside a React tree into per-word spans while keeping
 * inline elements (<em>, <br>, <strong>) intact.
 * "mask" → <span.w><span.wi>word</span></span> for slide-up reveals.
 * "plain" → <span.hw>word</span> for scroll-highlight paragraphs.
 */
export function splitWords(node: ReactNode, mode: Mode = "mask"): ReactNode {
  const walk = (n: ReactNode, kp: string): ReactNode => {
    if (typeof n === "string" || typeof n === "number") {
      return String(n)
        .split(/(\s+)/)
        .map((part, i) => {
          if (part === "") return null;
          if (/^\s+$/.test(part)) return " ";
          const key = `${kp}-${i}`;
          return mode === "mask" ? (
            <span className="w" key={key}>
              <span className="wi">{part}</span>
            </span>
          ) : (
            <span className="hw" key={key}>
              {part}
            </span>
          );
        });
    }
    if (Array.isArray(n)) return n.map((c, i) => walk(c, `${kp}.${i}`));
    if (isValidElement(n)) {
      const el = n as ReactElement<{ children?: ReactNode }>;
      if (el.type === "br") return cloneElement(el, { key: kp });
      return cloneElement(el, { key: kp }, walk(el.props.children, kp));
    }
    return n;
  };
  return walk(node, "s");
}
