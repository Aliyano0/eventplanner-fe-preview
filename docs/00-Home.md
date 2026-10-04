---
title: EventPlan Frontend — Documentation Home
tags: [index, moc, frontend]
aliases: [Home, Index, MOC]
---

# EventPlan Frontend — Documentation Home

Map of content for the EventPlan web frontend (Next.js 16 App Router). Open this folder as an
[Obsidian](https://obsidian.md) vault; every note links to its neighbours with double-bracket wikilinks.

## Start here

- [[Dev-Guide]] — install, run, build, test (Node lives in WSL on this machine)
- [[Architecture]] — stack, folder layout, how a request becomes a screen
- [[Routing-Map]] — every URL, the file that serves it, and how it renders

## How it is built

- [[Layout-and-Responsive-Design]] — header, footer, breakpoints, containers and every page's layout
- [[Legal-Pages]] — About, Terms & Conditions and Cookie Policy built from the client PDF (and how fidelity is checked)
- [[Server-vs-Client-Components]] — what runs where and why
- [[State-and-Storage]] — `localStorage` keys and the SSR-safe `useStoredValue` hook
- [[Design-System]] — tokens, shadcn/ui kit, shared components
- [[Tailwind-v4-Compatibility]] — the v3-parity layer in `globals.css` and why each rule exists
- [[Dependencies]] — what changed from the original Vite project and what each package is for

## The Vite → Next.js migration

- [[Vite-to-Next-Migration]] — what changed, file by file, and the intentional deviations
- [[Verification-Report]] — how "no UI/UX breakage" was measured, and the results
- [[Follow-ups]] — open questions and items that need a decision

## Product context

- [[PRD-Alignment]] — how this codebase maps onto the PRD frontend stack and phases

> Conventions: UI must stay responsive on all devices; production-grade structure; docs live here.
> See `Frontend/CLAUDE.md` and the repo-root `CLAUDE.md`.
