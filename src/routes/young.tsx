import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, Store, Megaphone, Package, Globe2, Wallet, UserRoundCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell, PageHero, Section } from "@/components/site/SiteShell";
import { JourneyStrip } from "@/components/site/JourneyStrip";
import youngImage from "@/assets/young-embryo.jpg";

export const Route = createFileRoute("/young")({
  head: () => ({
    meta: [
      { title: "Young Embryo (Ages 16–22) | Student Entrepreneurship" },
      {
        name: "description",
        content:
          "Young Embryo gives students aged 16 to 22 entrepreneurship training, real business projects, sales and marketing skills, digital business and income opportunities.",
      },
      { property: "og:title", content: "Young Embryo · Ages 16–22" },
      {
        property: "og:description",
        content: "Entrepreneurship training and real income opportunities for young people in Kerala.",
      },
    ],
  }),
  component: Young,
});

const FEATURES = [
  { icon: Briefcase, title: "Entrepreneurship training", text: "Business basics, costing, pricing and planning." },
  { icon: Store, title: "Real business projects", text: "Work inside live e-life Society ventures and student teams." },
  { icon: Megaphone, title: "Sales & marketing", text: "Field selling, customer handling and campaign practice." },
  { icon: Package, title: "Product development", text: "Turn an idea into a packaged, sellable product." },
  { icon: Globe2, title: "Digital business", text: "Online storefronts, content, design and social selling." },
  { icon: Wallet, title: "Income opportunities", text: "Commission, project work and a habit of regular income." },
  { icon: UserRoundCheck, title: "Mentorship", text: "One-to-one guidance from working entrepreneurs." },
];

const EARN_STEPS = [
  { step: "Discover", detail: "Find your business strength." },
  { step: "Learn", detail: "Business, sales and digital fundamentals." },
  { step: "Practice", detail: "Live projects with a mentor." },
  { step: "Create", detail: "Launch your own product or service." },
  { step: "Sell", detail: "Markets, expos and online channels." },
  { step: "Earn", detail: "Track earnings and build the habit." },
];

function Young() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Young Embryo · Age 16–22"
        title="Learn business by doing real business"
        description="Young Embryo turns students into founders — with training, mentorship, live projects and genuine income opportunities."
      >
        <Button asChild size="lg" className="mt-8 rounded-full bg-brand-gradient shadow-soft">
          <Link to="/join">Start your journey</Link>
        </Button>
      </PageHero>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <img
            src={youngImage}
            alt="Young entrepreneurs in Kerala packing products and working on laptops"
            loading="lazy"
            width={1280}
            height={853}
            className="w-full rounded-[2rem] object-cover shadow-lift"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent-soft text-accent">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="bg-soft-gradient">
        <Section title="From idea to income">
          <JourneyStrip steps={EARN_STEPS} />
        </Section>
      </div>
    </SiteShell>
  );
}
