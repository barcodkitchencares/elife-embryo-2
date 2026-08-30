import {
  Flower2,
  Baby,
  Gift,
  Scissors,
  Sparkles,
  Calculator,
  Mic,
  Rocket,
  Laptop,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Program } from "@/lib/queries";

const ICONS: Record<string, typeof Flower2> = {
  "crochet-work": Scissors,
  "doll-making": Baby,
  "hamper-making": Gift,
  "hair-accessories": Sparkles,
  "flower-making": Flower2,
  abacus: Calculator,
  "public-speaking": Mic,
  "young-entrepreneurship": Rocket,
  "digital-skills": Laptop,
};

export function ProgramCard({ program }: { program: Program }) {
  const Icon = ICONS[program.slug] ?? Sparkles;
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative grid h-36 place-items-center bg-soft-gradient">
        {program.image_url ? (
          <img
            src={program.image_url}
            alt={program.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <Icon className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
        )}
        <Badge
          className={`absolute right-3 top-3 rounded-full ${
            program.mode === "online"
              ? "bg-leaf-soft text-leaf"
              : "bg-accent-soft text-accent"
          }`}
        >
          {program.mode === "online" ? "Online" : "Offline"}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {program.age_group === "young" ? "Age 16–22" : "Age 5–15"}
        </span>
        <h3 className="mt-2 text-lg font-semibold">{program.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {program.description}
        </p>
        <Button variant="outline" className="mt-5 rounded-full" size="sm">
          Learn More
        </Button>
      </div>
    </article>
  );
}
