import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  Paintbrush,
  MonitorPlay,
  Hammer,
  Trophy,
  Award,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell, PageHero, Section } from "@/components/site/SiteShell";
import juniorImage from "@/assets/junior-embryo.jpg";

export const Route = createFileRoute("/junior")({
  head: () => ({
    meta: [
      { title: "Junior Embryo (Ages 5–15) | e-life Embryo" },
      {
        name: "description",
        content:
          "Junior Embryo helps children aged 5 to 15 discover creative talents through arts, crafts, online classes, projects, competitions and certificates.",
      },
      { property: "og:title", content: "Junior Embryo · Ages 5–15" },
      {
        property: "og:description",
        content: "Skill discovery, creative learning, competitions and certificates for young students.",
      },
    ],
  }),
  component: Junior,
});

const FEATURES = [
  { icon: Search, title: "Skill discovery", text: "A simple assessment finds where each child naturally shines." },
  { icon: Paintbrush, title: "Creative learning", text: "Arts, crafts, colour, storytelling and making things by hand." },
  { icon: MonitorPlay, title: "Online classes", text: "Short, friendly live sessions that fit around school." },
  { icon: Hammer, title: "Projects", text: "Every module ends with something the child actually made." },
  { icon: Trophy, title: "Competitions", text: "Panchayat and district level showcases and contests." },
  { icon: Award, title: "Certificates", text: "Recognition for every completed level and project." },
  { icon: HeartHandshake, title: "Parent involvement", text: "Progress updates and easy ways for parents to support at home." },
];

function Junior() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Junior Embryo · Age 5–15"
        title="Where children find the talent they didn't know they had"
        description="Junior Embryo focuses on extracurricular talent, creative skills, communication, confidence and an early entrepreneurship mindset."
      >
        <Button asChild size="lg" className="mt-8 rounded-full bg-brand-gradient shadow-soft">
          <Link to="/join">Register your child</Link>
        </Button>
      </PageHero>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
          <img
            src={juniorImage}
            alt="Children learning crafts in a Junior Embryo class"
            loading="lazy"
            width={1280}
            height={853}
            className="w-full rounded-[2rem] object-cover shadow-lift"
          />
        </div>
      </Section>
    </SiteShell>
  );
}
