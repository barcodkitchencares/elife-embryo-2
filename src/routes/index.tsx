import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Palette, Rocket, Users, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell, Section } from "@/components/site/SiteShell";
import { JourneyStrip } from "@/components/site/JourneyStrip";
import { ProgramCard } from "@/components/site/ProgramCard";
import { programsQuery } from "@/lib/queries";
import heroImage from "@/assets/hero-students.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "e-life Embryo | Student Skill & Entrepreneurship Program" },
      {
        name: "description",
        content:
          "Discover your talent, build your future. e-life Embryo trains students aged 5–22 in creative skills, entrepreneurship and real income opportunities across Kerala.",
      },
      { property: "og:title", content: "e-life Embryo | Discover Your Talent. Build Your Future." },
      {
        property: "og:description",
        content:
          "A student skill and entrepreneurship initiative of e-life Society, Kerala — for Junior Embryo (5–15) and Young Embryo (16–22).",
      },
    ],
  }),
  component: Home,
});

const PILLARS = [
  {
    icon: Palette,
    title: "Junior Embryo",
    text: "Ages 5–15 discover creative talents, crafts, communication and confidence.",
    to: "/junior" as const,
  },
  {
    icon: Rocket,
    title: "Young Embryo",
    text: "Ages 16–22 learn entrepreneurship, sales, digital skills and earn real income.",
    to: "/young" as const,
  },
  {
    icon: Sparkles,
    title: "Skills",
    text: "Crochet, doll making, hampers, abacus, public speaking and more.",
    to: "/programs" as const,
  },
  {
    icon: TrendingUp,
    title: "Entrepreneurship",
    text: "Real business projects, product development and market exposure.",
    to: "/young" as const,
  },
  {
    icon: Users,
    title: "Student Success",
    text: "Young founders from Kerala already selling what they create.",
    to: "/entrepreneurs" as const,
  },
];

function Home() {
  const { data: programs = [] } = useQuery(programsQuery);

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-soft-gradient">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:py-20 lg:grid-cols-2 lg:items-center">
          <div className="rise-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-primary shadow-soft">
              <Sparkles className="h-3.5 w-3.5" /> An initiative of e-life Society, Kerala
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] md:text-6xl">
              Discover Your Talent.{" "}
              <span className="text-brand-gradient">Build Your Future.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/80">
              ഓരോ വിദ്യാർത്ഥിയിലുമുള്ള കഴിവുകളെ കണ്ടെത്തി വളർത്തിയെടുക്കാം.
            </p>
            <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
              Embryo helps students aged 5 to 22 find their hidden skills, learn them properly and
              turn them into real projects, products and income.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-brand-gradient shadow-soft">
                <Link to="/join">
                  Join Embryo <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/programs">Explore Programs</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                ["9+", "Skill programs"],
                ["5–22", "Age range"],
                ["100%", "Practical learning"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl bg-card p-4 shadow-soft">
                  <dt className="text-xl font-bold text-primary">{value}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Students in Kerala making handmade crochet, dolls and hampers together"
              width={1536}
              height={1024}
              className="w-full rounded-[2rem] object-cover shadow-lift"
            />
          </div>
        </div>
      </section>

      <Section
        title="What Embryo builds"
        subtitle="Two age groups, one journey — from discovering a talent to earning from it."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <Link
              key={p.title}
              to={p.to}
              className="group rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <div className="bg-soft-gradient">
        <Section
          title="The Embryo journey"
          subtitle="Discover → Learn → Practice → Create → Sell → Earn"
        >
          <JourneyStrip />
        </Section>
      </div>

      <Section
        title="Popular programs"
        subtitle="Hands-on training, online and offline, across Kerala."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.slice(0, 6).map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/programs">See all programs</Link>
          </Button>
        </div>
      </Section>

      <Section>
        <div className="rounded-[2rem] bg-brand-gradient px-6 py-12 text-center text-primary-foreground shadow-lift md:px-16 md:py-16">
          <h2 className="text-2xl font-bold md:text-4xl">Every student has a hidden skill.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">
            Register today and our team will guide you to the right Embryo program for your age and
            interest.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 rounded-full">
            <Link to="/join">Join Embryo</Link>
          </Button>
        </div>
      </Section>
    </SiteShell>
  );
}
