import { JOURNEY } from "@/lib/embryo-data";

export function JourneyStrip({ steps = JOURNEY }: { steps?: { step: string; detail: string }[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((item, index) => (
        <li
          key={item.step}
          className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-sm font-bold text-primary">
            {index + 1}
          </span>
          <h3 className="mt-4 text-lg font-semibold">{item.step}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
        </li>
      ))}
    </ol>
  );
}
