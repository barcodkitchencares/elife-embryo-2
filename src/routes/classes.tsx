import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock, User } from "lucide-react";
import { SiteShell, PageHero, Section } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { classesQuery } from "@/lib/queries";
import { ageGroupLabel, formatClassDate, formatClassTime } from "@/lib/embryo-data";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Online Classes | e-life Embryo" },
      {
        name: "description",
        content:
          "Upcoming online and offline Embryo classes — crochet, doll making, abacus, public speaking and entrepreneurship sessions for students in Kerala.",
      },
      { property: "og:title", content: "Upcoming e-life Embryo Classes" },
      {
        property: "og:description",
        content: "Live online sessions and offline workshops for Junior and Young Embryo students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Classes,
});

function Classes() {
  const { data: classes = [], isLoading } = useQuery(classesQuery);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Online Classes"
        title="Learn live, from anywhere in Kerala"
        description="Join weekly online sessions or offline workshops led by practising trainers."
      />
      <Section>
        {isLoading ? (
          <p className="text-muted-foreground">Loading classes…</p>
        ) : classes.length === 0 ? (
          <p className="text-muted-foreground">New class dates are being scheduled. Please check back soon.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                    {ageGroupLabel(item.age_group)}
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
                    {item.mode}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <User className="h-4 w-4" /> {item.trainer_name}
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" /> {formatClassDate(item.starts_at)} ·{" "}
                  {formatClassTime(item.starts_at)} · {item.duration_minutes} min
                </p>
                <Button asChild size="sm" className="mt-5 rounded-full bg-brand-gradient">
                  <Link to="/join">Register interest</Link>
                </Button>
              </article>
            ))}
          </div>
        )}
      </Section>
    </SiteShell>
  );
}
