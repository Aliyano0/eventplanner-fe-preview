import { BackLink } from "@/components/layout/BackLink";
import { Container } from "@/components/layout/Container";
import type { LegalBlock, LegalDocument, LegalSection } from "@/content/legal/types";
import { RichText } from "./RichText";

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        if (block.type === "list") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-6 text-[15px] leading-7 text-foreground marker:text-primary md:text-base">
              {block.items.map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote key={index} className="border-l-4 border-primary/40 pl-4 text-base font-semibold leading-7 text-foreground">
              <RichText text={block.text} />
            </blockquote>
          );
        }
        return (
          <p key={index} className="text-[15px] leading-7 text-foreground md:text-base">
            <RichText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}

function TableOfContents({ sections }: { sections: LegalSection[] }) {
  return (
    <ol className="space-y-1 text-sm">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="block rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * Shared layout for long-form policy pages (Terms, Cookie Policy, …): title, a table of contents
 * (collapsible below `lg`, sticky sidebar from `lg`) and numbered sections with anchor links.
 * Server component: no client JavaScript.
 */
export function LegalDocumentView({ doc }: { doc: LegalDocument }) {
  return (
    <div className="bg-background">
      <Container className="pt-4 pb-10 md:pt-6">
        <BackLink href="/">Back to Home</BackLink>
        <h1 className="mt-4 mb-6 text-2xl font-bold text-foreground md:mb-8 md:text-4xl">{doc.title}</h1>

        <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start lg:gap-12">
          {/* Table of contents */}
          <details className="mb-6 rounded-xl border border-border bg-card lg:hidden">
            <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-foreground">
              On this page
            </summary>
            <nav aria-label="On this page" className="border-t border-border p-2">
              <TableOfContents sections={doc.sections} />
            </nav>
          </details>
          <nav aria-label="On this page" className="sticky top-24 hidden lg:block">
            <p className="mb-2 px-2 text-xs font-semibold tracking-widest text-muted-foreground">ON THIS PAGE</p>
            <TableOfContents sections={doc.sections} />
          </nav>

          {/* Document */}
          <article className="rounded-2xl border border-border bg-card p-5 md:p-8 lg:max-w-3xl lg:p-10">
            <Blocks blocks={doc.intro} />
            {doc.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24 pt-8">
                <h2 className="text-xl font-bold text-foreground md:text-2xl">{section.title}</h2>
                <div className="mt-3">
                  <Blocks blocks={section.blocks} />
                </div>
                {section.subsections?.map((subsection) => (
                  <div key={subsection.title} className="mt-6">
                    <h3 className="text-base font-semibold text-foreground md:text-lg">{subsection.title}</h3>
                    <div className="mt-2">
                      <Blocks blocks={subsection.blocks} />
                    </div>
                  </div>
                ))}
              </section>
            ))}
          </article>
        </div>
      </Container>
    </div>
  );
}
