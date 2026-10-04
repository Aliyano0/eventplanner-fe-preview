---
title: Tailwind v4 Compatibility Layer
tags: [tailwind, styling, migration]
---

# Tailwind v4 Compatibility Layer

Part of [[00-Home]]. Lives in `src/app/globals.css`. Related: [[Design-System]], [[Verification-Report]],
[[Vite-to-Next-Migration]].

The PRD baseline is **Tailwind CSS v4** ([[PRD-Alignment]]); the original UI was built on **v3.4**. The official
upgrade tool (`@tailwindcss/upgrade`) converted the config and renamed utilities, but a v4 build with only
those changes did **not** render the same: the first full comparison against the original showed
~16,600 style/geometry differences (different default font, line-height inheritance, spacing, colours).
Each rule below exists because the comparison caught a concrete difference. All of them are re-checked by the
parity harness described in [[Verification-Report]].

> These are scaffolding. When screens are rebuilt from Figma (PRD F1) delete the rules one at a time and
> re-run the comparison.

## What the upgrade tool changed

- `tailwind.config.ts` → CSS-first `@theme` block (colours, radii, accordion keyframes) in `globals.css`;
  the config file was deleted. Colours are still `hsl(var(--token))`, and the HSL channel variables in `:root`
  are unchanged (see [[Design-System]]).
- `postcss.config.mjs` → `@tailwindcss/postcss` only (autoprefixing is built in).
- Utility renames in app and kit code: `backdrop-blur-sm → backdrop-blur-xs` (same 4px blur),
  `outline-none → outline-hidden`, `bg-gradient-to-b → bg-linear-to-b`, `shadow-sm → shadow-xs`,
  `rounded-sm → rounded-xs` (kit only), etc.
- `@utility container` and a `border-color` default shim.
- One **false positive** was reverted by hand: it renamed a button *variant name* `"outline"` to
  `"outline-solid"` in `components/ui/pagination.tsx` (a TypeScript error caught it).

## v3-compatibility rules and why

| Rule in `globals.css` | v4 behaviour it neutralises | What it would have broken |
| --- | --- | --- |
| `--font-sans/serif/mono` in `@theme` | v4.3 ships a different default sans stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto…`) | different system font on every screen → text widths and wrapping change |
| `--text-*--line-height` (`xs`…`9xl`) | v4 expresses line-height as a unitless ratio; v3 used fixed rem values. A child with a different font size inherits a ratio differently | line boxes of nested text (e.g. the "DAYS" badge on the dashboard) change height |
| `@utility space-y-*` / `space-x-*` + zero-specificity reset in the last `@layer utilities` block | v4 moved the gap from `margin-top` of later siblings to `margin-bottom` of earlier ones, and a child's own `mb-*` now overrides it | gap disappears between an inline `<label>` and its input; dialog headers lose 6px; flex/grid stacks get the gap twice |
| `--color-red-50/300/400`, `--color-amber-500/600`, `--color-gray-200/400` | v4's palette is new OKLCH values, slightly different from v3 hex | task priority colours, progress bar, placeholder text colour shift |
| `button:not(:disabled) { cursor: pointer }` | v4 buttons use the default cursor | pointer cursor lost on every button |
| `input/textarea::placeholder { color: gray-400 }` | v4 placeholder is `currentColor` at 50% | search/plain inputs change placeholder tone |
| `option { padding: 0 2px 1px }` | v4 resets all padding to 0, including native `<option>` | native city `<select>` list spacing |
| `::-webkit-datetime-edit* { padding-block: revert-layer }` | v4 preflight strips Chrome's built-in padding in date inputs | the planner **date input is 2px shorter** than before |

## Differences that are *equivalent* (no rule needed)

These show up in raw computed styles but not on screen, and are whitelisted in the comparison:

- `rounded-full` → `calc(infinity * 1px)` instead of `9999px`.
- `-translate-*` → the standalone CSS `translate` property (computed `transform` reads `none`; element boxes
  are identical).
- Gradient stops are serialised with explicit percentages; box-shadows carry two extra fully-transparent
  layers; `outline-hidden` is `outline-style: none` instead of a transparent 2px outline.

## Known, intentional v4 difference

- **`hover:` only applies on hover-capable devices** (`@media (hover: hover)`). In v3 a tap on a touch device
  left the element in its hover state until the next tap. v4's behaviour is the better one and is not
  restored. If exact parity is wanted, add `@custom-variant hover (&:hover);` to `globals.css`.
  Listed in [[Follow-ups]].

## When adding new components

- Prefer `flex`/`grid` + `gap-*` over `space-*` in new code; the shim exists only for the legacy markup.
- Use design tokens (`bg-primary`, `text-muted-foreground`, …), not palette colours — only tokens are guaranteed
  stable across Tailwind versions.
