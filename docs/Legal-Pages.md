---
title: Legal and Company Pages
tags: [legal, content, about, terms, cookies]
---

# Legal and Company Pages

Part of [[00-Home]]. Related: [[Layout-and-Responsive-Design]], [[Routing-Map]], [[Follow-ups]].

Three pages are built from the client's own text in `marketplace-client-docs-and-proposals/EventPlan Documentation.pdf`
and linked from the footer's **COMPANY** column.

| URL | Page | Source in the PDF | View | Content |
| --- | --- | --- | --- | --- |
| `/about` | About EventPlan | pp. 3–4 ("About EventPlan") | `views/AboutPage` | `content/about.ts` |
| `/terms` | Terms & Conditions | pp. 4–7 (intro paragraph + sections 1–12) | `views/TermsPage` | `content/legal/terms.ts` |
| `/cookie-policy` | Cookie Policy & Consent | pp. 13–15 | `views/CookiePolicyPage` | `content/legal/cookie-policy.ts` |

Page titles are `About | EventPlan`, `Terms & Conditions | EventPlan`, `Cookie Policy | EventPlan`; each route file in
`app/(site)/` exports its own `metadata`.

## How it is built

```
src/content/
  about.ts                    About text (plain data)
  legal/types.ts              LegalDocument / LegalSection / LegalBlock
  legal/terms.ts              Terms text
  legal/cookie-policy.ts      Cookie Policy text
src/components/legal/
  LegalDocumentView.tsx       shared layout for policy pages (server component)
  RichText.tsx                renders **bold** inside strings
src/views/
  AboutPage.tsx, TermsPage.tsx, CookiePolicyPage.tsx
```

**The wording lives in `src/content/`, not in the components.** To change legal text, edit the content file; the layout,
table of contents and anchors follow automatically. Adding another policy is one new content file + one route.

`LegalDocumentView` gives every policy page: a back link, the title, a numbered table of contents ("On this page" —
a collapsible card below `lg`, a sticky sidebar from `lg`), anchor-linked sections (`#using-eventplan`, …, offset below
the sticky header with `scroll-mt-24`), lists with brand-coloured bullets, and one `<h1>` per page.
The About page is a custom layout (capability cards, two-column "event professionals / our role", highlighted goal) over
the same kind of data.

## Fidelity to the client text

The text is checked **word for word against the PDF**: the PDF is read with its glyph positions (it has no space
characters, so word gaps are reconstructed from x-positions), bullet glyphs and line-break hyphenation are
normalised, and the rendered page text must be identical.

| Page | Words compared | Result |
| --- | --- | --- |
| About | 274 | identical |
| Terms & Conditions | 769 | identical |
| Cookie Policy & Consent | 332 | identical |

Editorial choices (everything else is verbatim, including the British spelling):

- **Terms title.** The PDF has no heading before "By accessing or using EventPlan, you agree to these Terms…"; the page is
  titled *Terms & Conditions*.
- **Bold.** Emphasis follows the PDF's bold font: "not the event vendor, venue, organiser, contractor or service provider"
  (Terms §1), the About capability labels, the cookie choices and the "Our goal" line.
- **Cookie Settings.** The PDF's "Cookie Settings [link/button]" is a design note; the page shows **Cookie Settings** (no
  bracket, not a link) because no settings tool exists yet.
- **Full stop.** The PDF's last Cookie Policy sentence ("The latest version will always be posted on this page") has no
  full stop; one is added.
- **UI text that is *not* from the PDF:** "Back to Home", "On this page", the page titles' browser-tab form, and the footer
  link labels.
- **Nothing was invented:** no effective/"last updated" date, company name, address or contact details appear, because
  the PDF has none.

## Before these can be relied on

1. **Legal review / sign-off** by the client — this is their draft text, published as written.
2. **An effective date and a way to contact the company** are customary for Terms and a Cookie Policy; neither is in the
   PDF (the Terms say "contact us" without saying how).
3. **The Cookie Policy describes a consent banner, a "cookie preference tool" and Cookie Settings that do not exist
   yet.** Until they are built the policy describes behaviour the site doesn't have. See [[Follow-ups]].
4. The Terms refer to "Review Guidelines" (§7); those guidelines are in the PDF but not published yet — see below.

## In the PDF but not built

The same document contains three more policy texts. They would reuse `LegalDocumentView` with one content file each:

| Document | PDF pages | Referenced by |
| --- | --- | --- |
| EventPlan Vendor Guidelines (12 sections) | 7–10 | vendor onboarding (PRD F5) |
| EventPlan Review Guidelines | 10–11 | Terms §7 ("its Review Guidelines") |
| EventPlan Marketplace Rules (10 sections) | 11–13 | — |

Pages 1–2 of the PDF are an internal feature/usability description (not public copy) and were not used.

## Tests

- `src/content/legal/legal-content.test.tsx` — each policy has the expected number of sections, unique URL-safe anchor
  ids, sections numbered 1…n in order, balanced `**bold**` markers, and no empty text; `RichText` renders bold correctly.
- The word-for-word comparison against the PDF is a script (Playwright + the PDF's positioned glyphs), not part of the
  repo yet — see [[Verification-Report]].
