import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { SiteShell, Section } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMockAuth, type UserRole } from "@/lib/mock-auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Login or Register | e-life Embryo" },
      {
        name: "description",
        content:
          "Sign in to the e-life Embryo portal as a student, parent or admin to view programs, classes and registrations.",
      },
      { property: "og:title", content: "e-life Embryo Portal Login" },
      {
        property: "og:description",
        content: "Student, parent and admin access to the Embryo program portal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Auth,
});

const ROLES: { key: UserRole; label: string }[] = [
  { key: "student", label: "Student" },
  { key: "parent", label: "Parent" },
  { key: "admin", label: "Admin" },
];

function Auth() {
  const { signIn } = useMockAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<UserRole>("student");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const name = String(form.get("name") ?? "").trim() || email.split("@")[0] || "Embryo user";
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    signIn({ name, email, role });
    toast.success(mode === "login" ? "Welcome back!" : "Account created.");
    navigate({ to: role === "admin" ? "/admin" : "/dashboard" });
  }

  return (
    <SiteShell>
      <Section className="max-w-md">
        <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
          <div className="flex gap-2 rounded-full bg-muted p-1">
            {(["login", "register"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  mode === item ? "bg-card text-primary shadow-soft" : "text-muted-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <h1 className="mt-6 text-2xl font-bold">
            {mode === "login" ? "Sign in to Embryo" : "Create your Embryo account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A simple demo login for the Embryo portal.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div className="grid gap-2">
              <Label>I am a</Label>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setRole(item.key)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      role === item.key
                        ? "bg-brand-gradient text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {mode === "register" && (
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" placeholder="Your name" />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" />
            </div>

            <Button type="submit" size="lg" className="rounded-full bg-brand-gradient">
              {mode === "login" ? "Sign in" : "Create account"}
            </Button>
          </form>
        </div>
      </Section>
    </SiteShell>
  );
}
