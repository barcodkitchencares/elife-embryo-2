import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Target, Users2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell, PageHero, Section } from "@/components/site/SiteShell";
import { JourneyStrip } from "@/components/site/JourneyStrip";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Embryo | e-life Society Student Initiative" },
      {
        name: "description",
        content:
          "Embryo is an initiative of e-life Society designed to identify, develop and transform students' skills into practical opportunities and entrepreneurial experiences.",
      },
      { property: "og:title", content: "About e-life Embryo" },
      {
        property: "og:description",
        content:
          "How Embryo turns student talent into real skills, products and income — Discover, Learn, Practice, Create, Sell, Earn.",
      },
    ],
  }),
  component: About,
});

const VALUES = [
  {
    icon: Target,
    title: "Purpose",
    text: "Identify hidden abilities early and give them a structured path to grow.",
  },
  {
    icon: Heart,
    title: "Approach",
    text: "Friendly, practical training led by real practitioners and entrepreneurs.",
  },
  {
    icon: Users2,
    title: "Community",
    text: "Parents, trainers and panchayat-level teams support every student.",
  },
];

function About() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About Embryo"
        title="Turning student talent into real opportunity"
        description="Embryo is an initiative of e-life Society designed to identify, develop and transform students' skills into practical opportunities and entrepreneurial experiences."
      />

      <Section title="Why Embryo exists">
        <div className="grid gap-5 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="bg-soft-gradient">
        <Section
          title="The Embryo journey"
          subtitle="A student never stops at learning — they create, sell and earn."
        >
          <JourneyStrip />
        </Section>
      </div>

      <Section title="Two age groups, one mission">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h3 className="text-xl font-semibold">Junior Embryo · 5–15</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Discovering extracurricular talents, creative skills, arts and crafts, communication,
              confidence and a basic entrepreneurship mindset.
            </p>
            <Button asChild variant="outline" className="mt-6 rounded-full" size="sm">
              <Link to="/junior">
                Explore Junior Embryo <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h3 className="text-xl font-semibold">Young Embryo · 16–22</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Entrepreneurship training, practical business experience, real projects, sales and
              marketing, digital skills and income-generating opportunities.
            </p>
            <Button asChild variant="outline" className="mt-6 rounded-full" size="sm">
              <Link to="/young">
                Explore Young Embryo <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
