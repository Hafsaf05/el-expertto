import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Icon, SectionHead } from "./Section";

const NODES = [
  {
    label: "India Office",
    meta:  "IST (UTC+5:30)",
    icon:  "call",
    value: "+91 96181 27913",
    href:  "tel:+919618127913",
    note:  "Mon – Sat · 09:00 – 19:00",
  },
  {
    label: "Saudi Arabia",
    meta:  "AST (UTC+3:00)",
    icon:  "call",
    value: "+966 51 183 7472",
    href:  "tel:+966511837472",
    note:  "Sun – Thu · 09:00 – 18:00",
  },
  {
    label: "Direct Email",
    meta:  "<4hr reply",
    icon:  "mail",
    value: "contact@elexperto.com",
    href:  "mailto:contact@elexperto.com",
    note:  "Encrypted TLS channel",
  },
];

const DISCIPLINES = [
  "Business Website",
  "E-Commerce Build",
  "Corporate Portal",
  "Redesign & Upgrade",
  "Landing Page",
  "Maintenance & Care",
  "Other / Custom",
];

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: EASE } },
});

/* ─── FinalCta ────────────────────────────────────────────── */
export function FinalCta() {
  const shouldReduce = useReducedMotion();
  const ref          = useRef<HTMLElement>(null);
  const inView       = useInView(ref, { once: true, margin: "-10% 0px" });

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.1, delayChildren: 0.05 } },
  };

  return (
    <section ref={ref} className="shell pb-4">
      <div className="panel relative overflow-hidden bg-surface-low px-6 py-14 text-center sm:px-12">
        {/* Ambient glow — breathes very slowly */}
        <div
          aria-hidden
          className="animate-glow-ambient pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
        />

        <motion.div
          variants={shouldReduce ? {} : container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          <motion.span variants={shouldReduce ? {} : fadeUp()} className="eyebrow block">
            Ready to advance
          </motion.span>
          <motion.h2
            variants={shouldReduce ? {} : fadeUp()}
            className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            Let&rsquo;s build something extraordinary together
          </motion.h2>
          <motion.p
            variants={shouldReduce ? {} : fadeUp()}
            className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground"
          >
            Your website is an investment in your future. See what a properly engineered platform can
            do for your brand.
          </motion.p>
          <motion.div
            variants={shouldReduce ? {} : fadeUp()}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <a
              href="#inquiry"
              className="glow-ring group inline-flex h-12 items-center rounded-full border border-primary-tint/30 bg-primary px-6 font-display text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_36px_oklch(0.50_0.245_297/0.55)]"
            >
              Start Your Project
              <Icon
                name="arrow_forward"
                className="ml-2 text-lg transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="tel:+919618127913"
              className="inline-flex h-12 items-center rounded-full border border-border bg-surface px-6 font-display text-sm font-medium text-foreground transition-colors hover:border-input"
            >
              Talk to Us Direct
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────────────────── */
export function Contact() {
  const [sent, setSent]  = useState(false);
  const shouldReduce     = useReducedMotion();
  const leftRef          = useRef<HTMLDivElement>(null);
  const rightRef         = useRef<HTMLDivElement>(null);
  const leftInView       = useInView(leftRef,  { once: true, margin: "-8% 0px" });
  const rightInView      = useInView(rightRef, { once: true, margin: "-8% 0px" });

  const field =
    "h-11 w-full rounded-lg border border-border bg-surface-low px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all duration-250 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 focus:shadow-[0_0_0_3px_oklch(0.50_0.245_297/0.12)]";
  const label =
    "mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground";

  const nodesContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.1, delayChildren: 0.2 } },
  };
  const fieldsContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.07, delayChildren: 0.1 } },
  };
  const item = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <section id="inquiry" className="shell py-20 lg:py-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        {/* ── Left — contact info ─────────────────────── */}
        <div ref={leftRef} className="lg:col-span-5">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 28 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <SectionHead
              eyebrow="05 / Direct Channels"
              title="Consult with our principal architects"
              subtitle="New project, a rebuild, or technical advice — reach our offices directly."
            />
          </motion.div>

          <motion.div
            className="mt-8 space-y-3"
            variants={shouldReduce ? {} : nodesContainer}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
          >
            {NODES.map((n) => (
              <motion.a
                key={n.label}
                href={n.href}
                variants={shouldReduce ? {} : item}
                className="panel flex items-center gap-4 p-5 transition-colors hover:border-primary/40"
                whileHover={shouldReduce ? {} : { x: 3, transition: { duration: 0.2 } }}
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-primary/25 bg-primary/10">
                  <Icon name={n.icon} className="text-xl text-primary-tint" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {n.label}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] text-primary-tint">{n.meta}</span>
                  </div>
                  <div className="mt-1 truncate font-display text-[15px] font-semibold text-foreground">
                    {n.value}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{n.note}</div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
            className="mt-4 flex items-center gap-2.5 rounded-lg border border-primary/25 bg-primary/10 px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-primary-tint"
          >
            <span className="animate-live-pulse h-1.5 w-1.5 rounded-full bg-primary" />
            Accepting new commissions this quarter
          </motion.div>
        </div>

        {/* ── Right — form ────────────────────────────── */}
        <div ref={rightRef} className="lg:col-span-7">
          <motion.div
            className="panel p-6 sm:p-8"
            initial={shouldReduce ? false : { opacity: 0, y: 28 }}
            animate={rightInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h3 className="font-display text-xl font-semibold text-foreground">
              Start your project
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Send your brief and get scope back within 24 hours.
            </p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-8 flex flex-col items-center rounded-lg border border-primary/30 bg-primary/10 px-6 py-12 text-center"
              >
                <Icon name="check_circle" className="text-3xl text-primary-tint" />
                <div className="mt-3 font-display text-lg font-semibold text-foreground">
                  Inquiry received
                </div>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Our team will review your brief and reply within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2"
                variants={shouldReduce ? {} : fieldsContainer}
                initial="hidden"
                animate={rightInView ? "visible" : "hidden"}
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              >
                <motion.div variants={shouldReduce ? {} : item}>
                  <label className={label} htmlFor="name">Your name *</label>
                  <input id="name" required className={field} placeholder="Jane Doe" />
                </motion.div>

                <motion.div variants={shouldReduce ? {} : item}>
                  <label className={label} htmlFor="email">Work email *</label>
                  <input id="email" type="email" required className={field} placeholder="jane@company.com" />
                </motion.div>

                <motion.div variants={shouldReduce ? {} : item}>
                  <label className={label} htmlFor="phone">Phone</label>
                  <input id="phone" className={field} placeholder="+91 00000 00000" />
                </motion.div>

                <motion.div variants={shouldReduce ? {} : item}>
                  <label className={label} htmlFor="company">Company</label>
                  <input id="company" className={field} placeholder="Company name" />
                </motion.div>

                <motion.div variants={shouldReduce ? {} : item} className="sm:col-span-2">
                  <label className={label} htmlFor="need">Primary requirement *</label>
                  <select id="need" required defaultValue="" className={field}>
                    <option value="" disabled>Select a service</option>
                    {DISCIPLINES.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div variants={shouldReduce ? {} : item} className="sm:col-span-2">
                  <label className={label} htmlFor="brief">Project brief *</label>
                  <textarea
                    id="brief"
                    required
                    rows={4}
                    className={`w-full resize-none rounded-lg border border-border bg-surface-low p-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all duration-250 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 focus:shadow-[0_0_0_3px_oklch(0.50_0.245_297/0.12)]`}
                    placeholder="Goals, timeline, and anything we should know."
                  />
                </motion.div>

                <motion.label
                  variants={shouldReduce ? {} : item}
                  className="flex items-center gap-2.5 text-xs text-muted-foreground sm:col-span-2"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border bg-surface-low accent-[oklch(0.552_0.238_267)]"
                  />
                  Request a mutual NDA first
                </motion.label>

                <motion.button
                  variants={shouldReduce ? {} : item}
                  type="submit"
                  className="glow-ring group inline-flex h-12 items-center justify-center rounded-full border border-primary-tint/30 bg-primary px-6 font-display text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_28px_oklch(0.50_0.245_297/0.45)] sm:col-span-2"
                  whileHover={shouldReduce ? {} : { scale: 1.02 }}
                  whileTap={shouldReduce ? {} : { scale: 0.98 }}
                >
                  Send Inquiry
                  <Icon
                    name="send"
                    className="ml-2 text-lg transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
