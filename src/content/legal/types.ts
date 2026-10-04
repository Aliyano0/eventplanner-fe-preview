/**
 * Content model for long-form legal documents (Terms, Cookie Policy, …).
 *
 * Text is stored as data and rendered by `components/legal/LegalDocumentView`, so every policy page shares the
 * same layout, table of contents and typography. Inline emphasis uses `**bold**` markers.
 */

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export interface LegalSubsection {
  title: string;
  blocks: LegalBlock[];
}

export interface LegalSection {
  /** URL fragment and table-of-contents anchor, e.g. `using-eventplan`. */
  id: string;
  /** Heading exactly as written in the source document (numbering included). */
  title: string;
  blocks: LegalBlock[];
  subsections?: LegalSubsection[];
}

export interface LegalDocument {
  title: string;
  intro: LegalBlock[];
  sections: LegalSection[];
}
