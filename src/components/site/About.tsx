import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Icon, SectionHead } from "./Section";

const PILLARS = [
  { icon: "palette",       title: "Creativity",   copy: "Bespoke art direction"   },
  { icon: "code",          title: "Technology",   copy: "Resilient edge stacks"   },
  { icon: "insights",      title: "Strategy",     copy: "Goal-driven conversion"  },
  { icon: "speed",         title: "Performance",  copy: "Sub-second execution"    },
  { icon: "verified_user", title: "Security",     copy: "Hardened architecture"   },
  { icon: "handshake",     title: "Support",      copy: "Ongoing SLA care"        },
];

const SCORES = [
  { value: 100, label: "Performance"  },
  { value: 100, label: "SEO"          },
  { value: 100, label: "Accessibility"},
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Count-up hook ──────────────────────────────────────── */
function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (!inView || ran.current) return;
    ran.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return count;
}

/* ─── Animated score ─────────────────────────────────────── */
function AnimatedScore({ value, label, inView }: { value: number; label: string; inView: boolean }) {
  const count = useCountUp(value, inView);
  return (
    <div className="rounded-lg bg-surface-low p-4 text-center">
      <div className="font-display text-2xl font-bold text-primary-tint">{count}</div>
      <div className="mt-1 truncate font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

/* ─── Animated big number ────────────────────────────────── */
function AnimatedBigNumber({ inView }: { inView: boolean }) {
  const count = useCountUp(240, inView, 1400);
  return <>{count}</>;
}

export function About() {
  const shouldReduce = useReducedMotion();
  const sectionRef   = useRef<HTMLElement>(null);
  const inView       = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  const headVariants = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const pillarsContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.07, delayChildren: 0.25 },
    },
  };

  const pillarItem = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  const rightContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.1, delayChildren: 0.1 },
    },
  };

  const panelItem = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <section ref={sectionRef} id="about" className="shell py-20 lg:py-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ── Left ──────────────────────────────────────── */}
        <div className="lg:col-span-6">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={shouldReduce ? {} : headVariants}
          >
            <SectionHead
              eyebrow="01 / Who We Are"
              title={
                <>
                  We don&rsquo;t just build websites.
                  <br />
                  <span className="text-primary-tint">We build digital growth.</span>
                </>
              }
              subtitle="A website development company built for businesses that need more than a template. We learn your brand, your audience, and your goals first — then engineer around them."
            />
          </motion.div>

          <motion.div
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3"
            variants={shouldReduce ? {} : pillarsContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {PILLARS.map((p) => (
              <motion.div
                key={p.title}
                variants={shouldReduce ? {} : pillarItem}
                className="group panel flex h-[104px] flex-col justify-between p-4 transition-colors hover:border-primary/40"
                whileHover={shouldReduce ? {} : { y: -2, transition: { duration: 0.2 } }}
              >
                <Icon
                  name={p.icon}
                  className="text-xl text-primary-tint transition-transform duration-200 group-hover:-translate-y-0.5"
                />
                <div className="min-w-0">
                  <div className="truncate font-display text-sm font-semibold text-foreground">
                    {p.title}
                  </div>
                  <div className="truncate font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    {p.copy}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Right ─────────────────────────────────────── */}
        <motion.div
          className="space-y-4 lg:col-span-6"
          variants={shouldReduce ? {} : rightContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Audit scores */}
          <motion.div variants={shouldReduce ? {} : panelItem} className="panel p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="font-display text-sm font-semibold text-foreground">
                  Standard Audit Index
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Verified on Lighthouse 11.x
                </div>
              </div>
              <Icon name="verified" className="shrink-0 text-2xl text-primary-tint" />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {SCORES.map((s) => (
                <AnimatedScore key={s.label} value={s.value} label={s.label} inView={inView} />
              ))}
            </div>
          </motion.div>

          {/* Big number */}
          <motion.div variants={shouldReduce ? {} : panelItem} className="panel bg-surface-low p-6">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Average client lead growth
            </div>
            <div className="mt-2 font-display text-5xl font-bold tracking-tight text-foreground">
              +<AnimatedBigNumber inView={inView} />
              <span className="text-primary-tint">%</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Measured over 12 months post-launch across clean information architecture, semantic
              SEO, and instant load speeds.
            </p>
          </motion.div>

          {/* Stack rows */}
          <motion.div variants={shouldReduce ? {} : panelItem} className="panel divide-y divide-border">
            {[
              ["Global header / micro-routing",       "0.02ms"     ],
              ["Semantic hero & conversion triggers",  "Cached edge"],
              ["Commerce sync & payment node",         "ISO-ready"  ],
            ].map(([lbl, tag]) => (
              <div key={lbl} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <span className="min-w-0 truncate text-sm text-foreground/85">{lbl}</span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-primary-tint">
                  {tag}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
