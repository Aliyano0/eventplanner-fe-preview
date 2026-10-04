import { MessageSquare, Scale, Search, ShieldCheck, ClipboardList, Sparkles } from "lucide-react";
import { BackLink } from "@/components/layout/BackLink";
import { Container } from "@/components/layout/Container";
import { about } from "@/content/about";

// One icon per capability, in the same order as `about.capabilities`.
const capabilityIcons = [Search, ClipboardList, Scale, MessageSquare, ShieldCheck];

const AboutPage = () => {
  return (
    <div className="bg-background">
      <Container size="medium" className="pt-4 pb-10 md:pt-6">
        <BackLink href="/">Back to Home</BackLink>

        {/* Intro */}
        <header className="mt-6 flex flex-col items-center text-center md:mt-10">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
            <Sparkles className="h-7 w-7 text-accent-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground md:text-4xl">{about.title}</h1>
        </header>
        <div className="mx-auto mt-6 max-w-2xl space-y-4 text-center md:mt-8">
          {about.intro.map((paragraph) => (
            <p key={paragraph} className="text-[15px] leading-7 text-foreground md:text-lg md:leading-8">
              {paragraph}
            </p>
          ))}
        </div>

        {/* What you can do */}
        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-xl font-bold text-foreground md:mb-6 md:text-2xl">{about.capabilitiesTitle}</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {about.capabilities.map((item, index) => {
              const Icon = capabilityIcons[index];
              return (
                <div key={item.title} className="rounded-xl border border-border bg-card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                    <Icon className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* For event professionals + Our role */}
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-10">
          <section>
            <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">{about.professionals.title}</h2>
            <div className="space-y-4">
              {about.professionals.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-7 text-foreground md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">{about.role.title}</h2>
            <div className="space-y-4">
              {about.role.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-7 text-foreground md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </div>

        {/* Goal */}
        <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center md:mt-14 md:p-10">
          <p className="text-sm font-medium text-muted-foreground md:text-base">{about.role.goalLead}</p>
          <p className="mx-auto mt-2 max-w-2xl text-lg font-semibold leading-8 text-foreground md:text-2xl md:leading-10">
            {about.role.goal}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
