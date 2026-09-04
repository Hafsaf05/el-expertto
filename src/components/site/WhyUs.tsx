import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Icon, SectionHead } from "./Section";

const REASONS = [
  { no: "01", title: "Strategic Approach",     copy: "We start with your business model, not visuals — then build around revenue goals."        },
  { no: "02", title: "Premium Design",         copy: "Editorial art direction, calibrated spacing, and deliberate micro-interactions."           },
  { no: "03", title: "Mobile-First Build",     copy: "Most decisions happen on phones, so we engineer for thumbs first."                        },
  { no: "04", title: "Performance Tuning",     copy: "No bloat, modern image formats, and sub-second first-byte times."                         },
  { no: "05", title: "Security & Reliability", copy: "TLS end to end, DDoS hardening, audits, and daily off-site backups."                      },
  { no: "06", title: "UX Excellence",          copy: "Research-backed flows that remove friction and guide people to act."                        },
  { no: "07", title: "Direct Communication",   copy: "You talk to the architects building your site — no account-manager relay."                 },
  { no: "08", title: "Long-Term Partnership",  copy: "We monitor, update, and keep improving after launch as you scale."                         },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function WhyUs() {
  const shouldReduce  = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const itemRefs      = useRef<(HTMLLIElement | null)[]>([]);
  const headRef       = useRef<HTMLDivElement>(null);
  const [headVisible, setHeadVisible] = useState(false);

  /* ── Head fade-up ─────────────────────────────────────────── */
  useEffect(() => {
    if (!headRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeadVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(headRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── Active item via scroll ───────────────────────────────── */
  useEffect(() => {
    if (shouldReduce) return;
    const observers: IntersectionObserver[] = [];
    const entries: Record<number, boolean> = {};

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          entries[i] = e.isIntersecting;
          // Pick the first visible item
          const active = Object.entries(entries)
            .filter(([, v]) => v)
            .map(([k]) => Number(k))
            .sort((a, b) => a - b)[0];
          setActiveIdx(active ?? null);
        },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [shouldReduce]);

  return (
    <section id="why-us" className="shell py-20 lg:py-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ── Sticky left ────────────────────────────────── */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <motion.div
              ref={headRef}
              initial={shouldReduce ? false : { opacity: 0, y: 28 }}
              animate={headVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <SectionHead
                eyebrow="03 / Why El Experto"
                title="Engineering trust through measured discipline"
                subtitle="Strict technical standards, a modern design vocabulary, and uncompromising business alignment."
              />
              <div className="panel mt-8 flex items-start gap-4 p-5">
                <Icon name="verified" className="shrink-0 text-2xl text-primary-tint" />
                <div className="min-w-0">
                  <div className="font-display text-sm font-semibold text-foreground">
                    Guaranteed standard
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                    Every line reviewed, tested, and benchmarked before release.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Reasons list ───────────────────────────────── */}
        <ul className="divide-y divide-border border-y border-border lg:col-span-7">
          {REASONS.map((r, i) => {
            const isActive = activeIdx === i;
            return (
              <li
                key={r.no}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="relative flex gap-5 py-5 transition-all duration-300"
                style={{
                  paddingLeft: isActive && !shouldReduce ? "0.75rem" : undefined,
                }}
              >
                {/* Active left accent bar */}
                <div
                  className="absolute inset-y-0 left-0 w-0.5 rounded-full bg-primary transition-all duration-300"
                  style={{ opacity: isActive && !shouldReduce ? 1 : 0 }}
                />

                <span
                  className={`shrink-0 font-mono text-xs transition-all duration-300 ${
                    isActive && !shouldReduce
                      ? "font-bold text-primary-tint"
                      : "text-primary-tint"
                  }`}
                >
                  {r.no}
                </span>
                <div className="min-w-0">
                  <h3
                    className={`font-display text-base font-semibold transition-colors duration-300 ${
                      isActive && !shouldReduce ? "text-foreground" : "text-foreground/80"
                    }`}
                  >
                    {r.title}
                  </h3>
                  <p
                    className={`mt-1.5 text-sm leading-relaxed transition-colors duration-300 ${
                      isActive && !shouldReduce
                        ? "text-muted-foreground"
                        : "text-muted-foreground/70"
                    }`}
                  >
                    {r.copy}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
