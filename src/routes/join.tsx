import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { SiteShell, PageHero, Section } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { programsQuery } from "@/lib/queries";
import { PANCHAYAT_PLACEHOLDER, SKILL_OPTIONS } from "@/lib/embryo-data";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join Embryo | Register for Skill & Entrepreneurship Training" },
      {
        name: "description",
        content:
          "Register a student aged 5–22 for e-life Embryo skill training, entrepreneurship programs and online classes in Kerala.",
      },
      { property: "og:title", content: "Join e-life Embryo" },
      {
        property: "og:description",
        content: "Simple registration for Junior Embryo (5–15) and Young Embryo (16–22) programs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Join,
});

function Join() {
  const { data: programs = [] } = useQuery(programsQuery);
  const [ageGroup, setAgeGroup] = useState<"junior" | "young">("junior");
  const [skills, setSkills] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function toggleSkill(skill: string) {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const studentName = String(form.get("student_name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    if (!studentName || !phone) {
      toast.error("Student name and phone number are required.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("registrations").insert({
      student_name: studentName,
      phone,
      age_group: ageGroup,
      email: String(form.get("email") ?? "").trim() || null,
      parent_name: String(form.get("parent_name") ?? "").trim() || null,
      institution: String(form.get("institution") ?? "").trim() || null,
      panchayat: String(form.get("panchayat") ?? "").trim() || null,
      date_of_birth: String(form.get("date_of_birth") ?? "") || null,
      program_id: String(form.get("program_id") ?? "") || null,
      program_interest: String(form.get("notes") ?? "").trim() || null,
      interested_skills: skills.join(", ") || null,
    });
    setSubmitting(false);

    if (error) {
      toast.error("We couldn't save your registration. Please try again.");
      return;
    }
    setDone(true);
    toast.success("Registration received! Our coordinator will call you.");
  }

  return (
    <SiteShell>
      <PageHero
        eyebrow="Join Embryo"
        title="Register a student"
        description="Tell us a little about the student and we will guide you to the right program."
      />
      <Section>
        {done ? (
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
            <h2 className="text-2xl font-bold">Thank you!</h2>
            <p className="mt-3 text-muted-foreground">
              Your registration has been received. An Embryo coordinator will contact you soon.
            </p>
            <Button className="mt-6 rounded-full" onClick={() => setDone(false)}>
              Register another student
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8"
          >
            <div className="grid gap-2">
              <Label>Age group</Label>
              <div className="flex flex-wrap gap-2">
                {(["junior", "young"] as const).map((group) => (
                  <button
                    key={group}
                    type="button"
                    onClick={() => setAgeGroup(group)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      ageGroup === group
                        ? "bg-brand-gradient text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {group === "junior" ? "Junior Embryo · 5–15" : "Young Embryo · 16–22"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="student_name">Student name *</Label>
                <Input id="student_name" name="student_name" required placeholder="Full name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone number *</Label>
                <Input id="phone" name="phone" required placeholder="+91 " />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="parent_name">Parent / guardian name</Label>
                <Input id="parent_name" name="parent_name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date_of_birth">Date of birth</Label>
                <Input id="date_of_birth" name="date_of_birth" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="institution">School / college</Label>
                <Input id="institution" name="institution" />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="panchayat">Panchayat / town</Label>
                <Input id="panchayat" name="panchayat" placeholder={PANCHAYAT_PLACEHOLDER} />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="program_id">Preferred program</Label>
                <select
                  id="program_id"
                  name="program_id"
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="">No preference yet</option>
                  {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Interested skills</Label>
              <div className="flex flex-wrap gap-2">
                {SKILL_OPTIONS.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                      skills.includes(skill)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Anything else?</Label>
              <Textarea id="notes" name="notes" rows={4} />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="rounded-full bg-brand-gradient"
            >
              {submitting ? "Submitting…" : "Submit registration"}
            </Button>
          </form>
        )}
      </Section>
    </SiteShell>
  );
}
