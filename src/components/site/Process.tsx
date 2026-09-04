import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { Icon, SectionHead } from "./Section";

const STEPS = [
  { no: "01", icon: "search",        title: "Discovery",       copy: "Sessions to map your model, audience, and KPIs.",          out: "Project charter"  },
  { no: "02", icon: "schema",        title: "Planning",         copy: "Site structure, wireframes, and stack selection.",          out: "System blueprint" },
  { no: "03", icon: "draw",          title: "Design",           copy: "High-fidelity prototypes and component tokens.",            out: "Design system"    },
  { no: "04", icon: "terminal",      title: "Development",      copy: "Typed, tested full-stack build with integrations.",         out: "Staging instance" },
  { no: "05", icon: "fact_check",    title: "Testing & QA",     copy: "Cross-device, accessibility, and SEO audits.",             out: "100/100 audit"    },
  { no: "06", icon: "rocket_launch", title: "Launch & Support", copy: "Zero-downtime deploy, training, and ongoing SLA.",         out: "Live node"        },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Process() {
  const shouldReduce = useReducedMotion();
  const sectionRef   = useRef<HTMLElement>(null);

  /* Scroll progress drives the indigo fill line 0→100% */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 40%"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* Active step index from scroll progress */
  const [activeStep, setActiveStep] = useState(-1);
  useEffect(() => {
    if (shouldReduce) { setActiveStep(STEPS.length - 1); return; }
    const unsub = scrollYProgress.on("change", (v) => {
      setActiveStep(Math.floor(v * STEPS.length) - 1);
    });
    return unsub;
  }, [scrollYProgress, shouldReduce]);

  /* Heading entrance */
  const headRef  = useRef<HTMLDivElement>(null);
  const [headVisible, setHeadVisible] = useState(false);
  useEffect(() => {
    if (!headRef.current || shouldReduce) { setHeadVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeadVisible(true); observer.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(headRef.current);
    return () => observer.disconnect();
  }, [shouldReduce]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="border-y border-border bg-surface-lowest/50 py-20 lg:py-28"
    >
      <div className="shell">
        {/* Heading */}
        <motion.div
          ref={headRef}
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          animate={headVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHead
            eyebrow="04 / The Methodology"
            title="A rigorous 6-stage engineering protocol"
            subtitle="An explicit framework that prevents scope creep and keeps output quality high."
            align="center"
          />
        </motion.div>

        {/* ── Desktop horizontal timeline (lg+) ─────────────────── */}
        <div className="relative mt-14 hidden lg:block">
          {/* Rail */}
          <div className="absolute left-0 right-0 top-6 h-px bg-border" />
          {/* Animated fill */}
          {!shouldReduce && (
            <motion.div
              className="absolute left-0 top-6 h-px origin-left bg-primary/70"
              style={{ width: lineWidth }}
            />
          )}

          {/* Cards — always rendered, colour driven by activeStep state */}
          <div className="relative grid grid-cols-6 gap-x-4 gap-y-6">
            {STEPS.map((s, i) => {
              const active = i <= activeStep;
              return (
                <div key={s.no} className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon circle */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 ${
                      active && !shouldReduce
                        ? "border-primary bg-primary/20 shadow-[0_0_18px_oklch(0.50_0.245_297/0.35)]"
                        : "border-border bg-surface-low"
                    }`}
                  >
                    <Icon
                      name={s.icon}
                      className={`text-lg transition-colors duration-500 ${
                        active && !shouldReduce ? "text-primary-tint" : "text-muted-foreground"
                      }`}
                    />
                  </div>

                  {/* Phase label */}
                  <span
                    className={`mt-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 ${
                      active && !shouldReduce ? "text-primary-tint" : "text-muted-foreground/60"
                    }`}
                  >
                    Phase {s.no}
                  </span>

                  {/* Title + copy + output */}
                  <div className="mt-3">
                    <h3
                      className={`font-display text-[13px] font-semibold leading-snug transition-colors duration-500 ${
                        active && !shouldReduce ? "text-foreground" : "text-foreground/75"
                      }`}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{s.copy}</p>
                    <p
                      className={`mt-2 font-mono text-[9px] uppercase tracking-wider transition-colors duration-500 ${
                        active && !shouldReduce ? "text-primary-tint" : "text-muted-foreground/60"
                      }`}
                    >
                      {s.out}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile vertical cards (< lg) ─────────────────── */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {STEPS.map((s, i) => (
            <article
              key={s.no}
              className="panel flex min-h-[200px] flex-col p-5 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary-tint">
                  Phase {s.no}
                </span>
                <Icon name={s.icon} className="text-xl text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              <div className="mt-auto border-t border-border pt-3 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/80">
                Output &mdash; {s.out}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Mission & Vision ─────────────────────────────────────── */
export function MissionVision() {
  const shouldReduce = useReducedMotion();
  const sectionRef   = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || shouldReduce) { setInView(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.1 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [shouldReduce]);

  const panels = [
    {
      eyebrow: "Our Mission",
      title:   "Empower with purpose & results",
      copy:    "To give businesses innovative, high-quality website solutions that strengthen their presence and drive long-term growth.",
      tag:     "Focus: sustainable client ROI",
      icon:    "flag",
      dir: -1,
    },
    {
      eyebrow: "Our Vision",
      title:   "Global recognition through excellence",
      copy:    "To be a trusted global web partner known for engineering excellence, reliability, and consistent customer success.",
      tag:     "Aspiration: global leadership",
      icon:    "public",
      dir: 1,
    },
  ];

  return (
    <section ref={sectionRef} className="shell py-20 lg:py-24">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {panels.map((p) => (
          <motion.div
            key={p.eyebrow}
            className="panel relative overflow-hidden p-7 sm:p-9"
            initial={shouldReduce ? false : { opacity: 0, x: p.dir * 48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
            />
            <div className="flex items-center gap-3">
              <Icon name={p.icon} className="text-xl text-primary-tint" />
              <span className="eyebrow">{p.eyebrow}</span>
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
              {p.title}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{p.copy}</p>
            <div className="mt-6 border-t border-border pt-4 font-mono text-[10px] uppercase tracking-wider text-primary-tint">
              {p.tag}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
