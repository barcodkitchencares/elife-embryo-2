import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { SiteShell, PageHero, Section } from "@/components/site/SiteShell";
import { supabase } from "@/integrations/supabase/client";
import { classesQuery, entrepreneursQuery, programsQuery } from "@/lib/queries";
import { useMockAuth } from "@/lib/mock-auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | e-life Embryo" },
      {
        name: "description",
        content:
          "Admin view of e-life Embryo registrations, programs, classes and student entrepreneurs.",
      },
      { property: "og:title", content: "e-life Embryo Admin Dashboard" },
      { property: "og:description", content: "Manage Embryo registrations and program data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Admin,
});

type Registration = {
  id: string;
  student_name: string;
  phone: string;
  age_group: string;
  panchayat: string | null;
  interested_skills: string | null;
  status: string;
  created_at: string;
};

const registrationsQuery = queryOptions({
  queryKey: ["registrations"],
  queryFn: async (): Promise<Registration[]> => {
    const { data, error } = await supabase
      .from("registrations")
      .select("id,student_name,phone,age_group,panchayat,interested_skills,status,created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Registration[];
  },
});

function Admin() {
  const { user, ready } = useMockAuth();
  const navigate = useNavigate();
  const { data: registrations = [], error } = useQuery(registrationsQuery);
  const { data: programs = [] } = useQuery(programsQuery);
  const { data: classes = [] } = useQuery(classesQuery);
  const { data: entrepreneurs = [] } = useQuery(entrepreneursQuery);

  useEffect(() => {
    if (ready && (!user || user.role !== "admin")) navigate({ to: "/auth" });
  }, [ready, user, navigate]);

  if (!user || user.role !== "admin") {
    return (
      <SiteShell>
        <Section>
          <p className="text-muted-foreground">Checking admin access…</p>
        </Section>
      </SiteShell>
    );
  }

  const stats = [
    ["Registrations", registrations.length],
    ["Programs", programs.length],
    ["Classes", classes.length],
    ["Entrepreneurs", entrepreneurs.length],
  ] as const;

  return (
    <SiteShell>
      <PageHero
        eyebrow="Admin"
        title="Embryo control room"
        description="A quick overview of registrations and program data."
      />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <p className="text-3xl font-bold text-primary">{value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Latest registrations">
        {error ? (
          <p className="text-muted-foreground">
            Registration details are private and can only be listed by a signed-in administrator.
          </p>
        ) : registrations.length === 0 ? (
          <p className="text-muted-foreground">No registrations yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Group</th>
                  <th className="px-4 py-3">Place</th>
                  <th className="px-4 py-3">Skills</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((row) => (
                  <tr key={row.id} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{row.student_name}</td>
                    <td className="px-4 py-3">{row.phone}</td>
                    <td className="px-4 py-3 capitalize">{row.age_group}</td>
                    <td className="px-4 py-3">{row.panchayat ?? "—"}</td>
                    <td className="px-4 py-3">{row.interested_skills ?? "—"}</td>
                    <td className="px-4 py-3 capitalize">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </SiteShell>
  );
}
