import type { CSSProperties, ReactNode } from "react";

type HighlightedHeadline = {
  text: string;
  goldPhrase?: string;
};

/** Renders headline text with an optional gold italic phrase and line breaks. */
export function HighlightedHeadlineText({
  headline,
  className,
  style,
  goldClassName = "display-serif-italic text-gold",
}: {
  headline: HighlightedHeadline;
  className?: string;
  style?: CSSProperties;
  goldClassName?: string;
}) {
  const text = headline?.text || "";
  const gold = headline?.goldPhrase?.trim();

  const renderWithBreaks = (value: string, keyPrefix: string): ReactNode[] =>
    value.split("\n").map((line, i, arr) => (
      <span key={`${keyPrefix}-${i}`}>
        {line}
        {i < arr.length - 1 ? <br /> : null}
      </span>
    ));

  if (!gold || !text.includes(gold)) {
    return (
      <span className={className} style={style}>
        {renderWithBreaks(text, "full")}
      </span>
    );
  }

  const [before, ...rest] = text.split(gold);
  const after = rest.join(gold);

  return (
    <span className={className} style={style}>
      {renderWithBreaks(before, "before")}
      <span className={goldClassName}>{gold}</span>
      {renderWithBreaks(after, "after")}
    </span>
  );
}
