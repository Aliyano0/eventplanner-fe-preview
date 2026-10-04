import { Fragment, type ReactNode } from "react";

/** Renders `**bold**` markers inside a plain string (the only inline markup the legal content uses). */
export function RichText({ text }: { text: string }): ReactNode {
  return text.split("**").map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
