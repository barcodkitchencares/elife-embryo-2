import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Sparkles, Phone, Mail, Globe, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/embryo-data";
import { useMockAuth } from "@/lib/mock-auth";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-gradient text-primary-foreground shadow-soft">
        <Sparkles className="h-5 w-5" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-bold tracking-tight">e-life Embryo</span>
        {!compact && (
          <span className="block text-[11px] font-medium text-muted-foreground">
            An initiative of e-life Society
          </span>
        )}
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useMockAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "bg-primary-soft text-primary" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to={user.role === "admin" ? "/admin" : "/dashboard"}>
                  {user.role === "admin" ? "Admin" : "Dashboard"}
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign out
              </Button>
            </>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth">Login</Link>
            </Button>
          )}
          <Button asChild size="sm" className="rounded-full bg-brand-gradient shadow-soft">
            <Link to="/join">Join Embryo</Link>
          </Button>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-border lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background px-4 pb-5 pt-3 lg:hidden">
          <nav className="grid gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "bg-primary-soft text-primary" }}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid gap-2">
            <Button asChild variant="outline" onClick={() => setOpen(false)}>
              <Link to={user ? (user.role === "admin" ? "/admin" : "/dashboard") : "/auth"}>
                {user ? "Go to dashboard" : "Login / Register"}
              </Link>
            </Button>
            <Button asChild className="bg-brand-gradient" onClick={() => setOpen(false)}>
              <Link to="/join">Join Embryo</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-soft-gradient">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Embryo discovers, develops and promotes the hidden skills and entrepreneurial abilities
            of students across Kerala.
          </p>
          <div className="mt-5 flex gap-2">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <span
                key={i}
                aria-hidden
                className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card text-muted-foreground"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {NAV_LINKS.slice(1).map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Reach us</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> {SITE.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> {SITE.email}
            </li>
            <li className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" /> {SITE.website}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> {SITE.location}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} e-life Embryo · An initiative of e-life Society, Kerala
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-soft-gradient">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}

export function Section({
  title,
  subtitle,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-6xl px-4 py-14 md:py-20 ${className}`}>
      {title && (
        <div className="mb-9 max-w-2xl">
          <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
          {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
