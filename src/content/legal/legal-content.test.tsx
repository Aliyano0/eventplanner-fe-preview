import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RichText } from "@/components/legal/RichText";
import { cookiePolicy } from "./cookie-policy";
import { terms } from "./terms";
import type { LegalBlock, LegalDocument } from "./types";

const documents: [string, LegalDocument, number][] = [
  ["Terms & Conditions", terms, 12],
  ["Cookie Policy & Consent", cookiePolicy, 6],
];

const textsOf = (blocks: LegalBlock[]) =>
  blocks.flatMap((block) => (block.type === "list" ? block.items : [block.text]));

describe.each(documents)("%s content", (_name, doc, sectionCount) => {
  it(`has ${sectionCount} sections`, () => {
    expect(doc.sections).toHaveLength(sectionCount);
  });

  it("uses unique, URL-safe section ids (they are the anchor links)", () => {
    const ids = doc.sections.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("numbers its sections 1..n in order, as in the source document", () => {
    doc.sections.forEach((section, index) => {
      expect(section.title.startsWith(`${index + 1}. `)).toBe(true);
    });
  });

  it("has balanced **bold** markers and no empty text", () => {
    const all = [
      ...doc.intro,
      ...doc.sections.flatMap((section) => [...section.blocks, ...(section.subsections ?? []).flatMap((s) => s.blocks)]),
    ].flatMap((block) => textsOf([block]));
    for (const text of all) {
      expect(text.trim().length).toBeGreaterThan(0);
      expect((text.match(/\*\*/g) ?? []).length % 2).toBe(0);
    }
  });
});

describe("RichText", () => {
  it("renders **bold** segments as <strong> and leaves the rest plain", () => {
    const html = renderToStaticMarkup(<RichText text="EventPlan is **not the vendor**, only the platform." />);
    expect(html).toContain("<strong");
    expect(html).toContain("not the vendor</strong>");
    expect(html).toContain("only the platform.");
    expect(html).not.toContain("**");
  });

  it("returns plain text unchanged when there is no markup", () => {
    expect(renderToStaticMarkup(<RichText text="Plain sentence." />)).toBe("Plain sentence.");
  });
});
