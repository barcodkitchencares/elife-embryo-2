import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { SiteShell, PageHero, Section } from "@/components/site/SiteShell";
import { entrepreneursQuery, projectsQuery } from "@/lib/queries";

export const Route = createFileRoute("/entrepreneurs")({
  head: () => ({
    meta: [
      { title: "Student Entrepreneurs | e-life Embryo" },
      {
        name: "description",
        content:
          "Meet young student entrepreneurs from Kerala who turned Embryo skill training into real products, projects and income.",
      },
      { property: "og:title", content: "Student Entrepreneurs of e-life Embryo" },
      {
        property: "og:description",
        content: "Young founders aged 5–22 building handmade products and small businesses in Kerala.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Entrepreneurs,
});

function Entrepreneurs() {
  const { data: people = [], isLoading } = useQuery(entrepreneursQuery);
  const { data: projects = [] } = useQuery(projectsQuery);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Student Entrepreneurs"
        title="Young founders from Kerala"
        subtitle="Students who learned a skill at Embryo and are now creating, selling and earning."
      />
      <Section>
        {isLoading ? (
          <p className="text-muted-foreground">Loading entrepreneurs…</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {people.map((person) => {
              const theirProjects = projects.filter((p) => p.entrepreneur_id === person.id);
              return (
                <article
                  key={person.id}
                  className="rounded-3xl border border-border bg-card p-6 shadow-soft"
                >
                  <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                    {person.category}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">
                    {person.display_name}
                    {person.age ? <span className="text-muted-foreground"> · {person.age}</span> : null}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-foreground/80">{person.headline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{person.bio}</p>
                  {person.panchayat && (
                    <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {person.panchayat}
                    </p>
                  )}
                  {theirProjects.length > 0 && (
                    <ul className="mt-4 space-y-2 border-t border-border pt-4">
                      {theirProjects.map((project) => (
                        <li key={project.id} className="text-sm">
                          <span className="font-medium">{project.title}</span>
                          <span className="block text-xs text-muted-foreground">
                            {project.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </Section>
    </SiteShell>
  );
}
