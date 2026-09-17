import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Globe } from "lucide-react";
import { SiteShell, PageHero, Section } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/embryo-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | e-life Embryo" },
      {
        name: "description",
        content:
          "Contact the e-life Embryo team for admissions, trainer partnerships and school collaborations in Kerala.",
      },
      { property: "og:title", content: "Contact e-life Embryo" },
      {
        property: "og:description",
        content: "Reach the Embryo team by phone or email for programs, classes and partnerships.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const DETAILS = [
  { icon: Phone, label: "Phone", value: SITE.phone },
  { icon: Mail, label: "Email", value: SITE.email },
  { icon: Globe, label: "Website", value: SITE.website },
  { icon: MapPin, label: "Office", value: SITE.location },
];

function Contact() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact"
        title="Talk to the Embryo team"
        subtitle="Admissions, trainer partnerships, school tie-ups and general questions."
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2">
          {DETAILS.map((item) => (
            <div key={item.label} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {item.label}
              </h3>
              <p className="mt-1 text-lg font-medium">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-[2rem] bg-brand-gradient px-6 py-12 text-center text-primary-foreground shadow-lift md:px-16">
          <h2 className="text-2xl font-bold md:text-3xl">Ready to join Embryo?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            Fill the registration form and our coordinator will call you.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-7 rounded-full">
            <Link to="/join">Join Embryo</Link>
          </Button>
        </div>
      </Section>
    </SiteShell>
  );
}
