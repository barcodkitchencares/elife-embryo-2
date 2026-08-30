import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteShell, PageHero, Section } from "@/components/site/SiteShell";
import { ProgramCard } from "@/components/site/ProgramCard";
import { Button } from "@/components/ui/button";
import { programsQuery } from "@/lib/queries";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs | e-life Embryo Skill & Business Training" },
      {
        name: "description",
        content:
          "Crochet, doll making, hampers, hair accessories, flower making, abacus, public speaking, entrepreneurship and digital skills for students aged 5–22.",
      },
      { property: "og:title", content: "e-life Embryo Programs" },
      {
        property: "og:description",
        content: "Online and offline skill programs for Junior and Young Embryo students in Kerala.",
      },
    ],
  }),
  component: Programs,
});

const FILTERS = [
  { key: "all", label: "All programs" },
  { key: "junior", label: "Junior · 5–15" },
  { key: "young", label: "Young · 16–22" },
] as const;

function Programs() {
  const { data: programs = [], isLoading } = useQuery(programsQuery);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");

  const visible = programs.filter((p) => filter === "all" || p.age_group === filter);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Programs"
        title="Skills that become real products and businesses"
        description="Every Embryo program mixes training with practice, projects and a chance to sell what you create."
      />
      <Section>
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Button
              key={f.key}
              size="sm"
              variant={filter === f.key ? "default" : "outline"}
              className={`rounded-full ${filter === f.key ? "bg-brand-gradient" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </Button>
          ))}
        </div>
        {isLoading ? (
          <p className="text-muted-foreground">Loading programs…</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}
      </Section>
    </SiteShell>
  );
}
