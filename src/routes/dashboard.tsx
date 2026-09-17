import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteShell, PageHero, Section } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { classesQuery, programsQuery } from "@/lib/queries";
import { ageGroupLabel, formatClassDate, formatClassTime } from "@/lib/embryo-data";
import { useMockAuth } from "@/lib/mock-auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard | e-life Embryo" },
      {
        name: "description",
        content:
          "Your Embryo dashboard — upcoming classes, recommended programs and your learning journey.",
      },
      { property: "og:title", content: "e-life Embryo Student Dashboard" },
      { property: "og:description", content: "Track your Embryo classes and programs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user, ready } = useMockAuth();
  const navigate = useNavigate();
  const { data: classes = [] } = useQuery(classesQuery);
  const { data: programs = [] } = useQuery(programsQuery);

  useEffect(() => {
    if (ready && !user) navigate({ to: "/auth" });
  }, [ready, user, navigate]);

  if (!user) {
    return (
      <SiteShell>
        <Section>
          <p className="text-muted-foreground">Loading your dashboard…</p>
        </Section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <PageHero
        eyebrow={user.role === "parent" ? "Parent dashboard" : "Student dashboard"}
        title={`Hello, ${user.name}`}
        description="Your upcoming classes and the programs we recommend for you."
      />
      <Section title="Upcoming classes">
        {classes.length === 0 ? (
          <p className="text-muted-foreground">No classes scheduled yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {classes.slice(0, 4).map((item) => (
              <div key={item.id} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                  {ageGroupLabel(item.age_group)}
                </span>
                <h3 className="mt-3 font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatClassDate(item.starts_at)} · {formatClassTime(item.starts_at)} ·{" "}
                  {item.trainer_name}
                </p>
              </div>
            ))}
          </div>
        )}
        <Button asChild variant="outline" className="mt-6 rounded-full">
          <Link to="/classes">See all classes</Link>
        </Button>
      </Section>
      <Section title="Recommended programs">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {programs.slice(0, 3).map((program) => (
            <div key={program.id} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <h3 className="font-semibold">{program.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{program.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
