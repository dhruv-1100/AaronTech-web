import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The v3 page furniture: every interior page opens with the same
 * tab + eyebrow + display headline + lede, and closes on the yellow
 * CTA band. Sections in between share one head treatment.
 */

export function Eyebrow({
  children,
  tone = "paper",
  className,
}: {
  children: React.ReactNode;
  tone?: "paper" | "ink";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.21em]",
        tone === "ink" ? "text-signal" : "text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

export function RuleTab({ label }: { label: string }) {
  return (
    <div className="mb-8 flex items-center gap-3.5">
      <span className="rule-tab" aria-hidden="true" />
      <Eyebrow>{label}</Eyebrow>
    </div>
  );
}

export function Breadcrumbs({
  trail,
}: {
  trail: { label: string; href?: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-11 flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.13em] text-muted"
    >
      {trail.map((crumb, i) => (
        <span key={crumb.label} className="flex items-center gap-2.5">
          {i > 0 && <span aria-hidden="true">/</span>}
          {crumb.href ? (
            <Link href={crumb.href} className="text-muted hover:text-ink">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-ink">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/** Standard interior-page hero. */
export function PageHero({
  eyebrow,
  title,
  lede,
  breadcrumbs,
  stats,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  breadcrumbs?: { label: string; href?: string }[];
  stats?: { value: string; label: string }[];
}) {
  return (
    <section className="border-b border-ink">
      <div
        className={cn(
          "shell pb-[76px]",
          breadcrumbs ? "pt-[34px]" : "pt-16 md:pt-[88px]"
        )}
      >
        {breadcrumbs && <Breadcrumbs trail={breadcrumbs} />}
        <div className="animate-rise">
          <RuleTab label={eyebrow} />
        </div>
        <h1 className="animate-rise mb-7 max-w-[17em] text-ink [animation-delay:0.08s]">
          {title}
        </h1>
        <p className="animate-rise m-0 max-w-[42em] text-[19px] leading-[1.6] text-body [animation-delay:0.16s]">
          {lede}
        </p>
        {stats && <StatStrip stats={stats} />}
      </div>
    </section>
  );
}

/** Ruled figure strip that sits under a page hero. */
export function StatStrip({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div
      className={cn(
        "mt-14 grid grid-cols-2 border-t-2 border-ink",
        stats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"
      )}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={cn(
            "border-rule-strong pt-[26px] pb-6 md:pb-0",
            i === 0 ? "pr-[30px]" : "pl-5 pr-[30px] md:pl-[30px]",
            i < stats.length - 1 && "md:border-r"
          )}
        >
          <div className="text-[42px] leading-none font-bold tracking-[-0.04em] text-ink">
            {stat.value}
          </div>
          <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.13em] text-muted">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Section head: display heading on the left, a narrow explanatory
 * column on the right, both sitting on the same baseline.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  tone = "paper",
  action,
  className,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  tone?: "paper" | "ink";
  action?: React.ReactNode;
  className?: string;
}) {
  const onInk = tone === "ink";

  return (
    <div
      className={cn(
        "mb-[54px] grid items-end gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-[72px]",
        className
      )}
    >
      <div>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2
          className={cn("mt-5 mb-0", onInk ? "text-white" : "text-ink")}
        >
          {title}
        </h2>
      </div>
      {lede && (
        <p
          className={cn(
            "m-0 text-base leading-[1.65]",
            onInk ? "text-dim" : "text-body"
          )}
        >
          {lede}
        </p>
      )}
      {action}
    </div>
  );
}

/** Closing call-to-action band — the one full-bleed yellow surface. */
export function CtaBand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  const isExternal = (href: string) => href.startsWith("mailto:") || href.startsWith("tel:");

  return (
    <section className="on-signal bg-signal py-20 md:py-24">
      <div className="shell flex flex-wrap items-end justify-between gap-x-16 gap-y-10">
        <div>
          {eyebrow && (
            <span className="font-mono text-[11px] uppercase tracking-[0.21em] text-ink/65">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-5 mb-[18px] max-w-[18em] text-[clamp(2.25rem,5vw,4.125rem)] leading-[0.98] tracking-[-0.045em] text-ink">
            {title}
          </h2>
          <p className="m-0 max-w-[34em] text-lg leading-[1.55] text-[#2B2F2A]">
            {body}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {isExternal(primary.href) ? (
            <a href={primary.href} className="btn-primary">
              {primary.label}
            </a>
          ) : (
            <Link href={primary.href} className="btn-primary">
              {primary.label}
            </Link>
          )}
          {isExternal(secondary.href) ? (
            <a href={secondary.href} className="btn-secondary">
              {secondary.label}
            </a>
          ) : (
            <Link href={secondary.href} className="btn-secondary">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
