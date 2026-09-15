import { cn } from "@/lib/utils";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
  tone?: "light" | "dark";
};

export function SectionHeading({ id, eyebrow, title, intro, className, tone = "light" }: Props) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", className)} data-reveal>
      <p className={cn("eyebrow flex items-center gap-3", dark ? "text-on-dark-muted" : "text-magenta-600")}>
        <span aria-hidden className="h-0.5 w-8 rounded-full bg-[image:var(--cv-gradient-accent)]" />
        {eyebrow}
      </p>
      <h2 id={id} className="type-h2 mt-5">
        {title}
      </h2>
      {intro && (
        <p className={cn("type-lead mt-6 max-w-[38rem]", dark ? "text-on-dark-muted" : "text-muted-ink")}>
          {intro}
        </p>
      )}
    </div>
  );
}
