import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Icon, SectionHead } from "./Section";

const FEATURED = [
  {
    no: "01",
    tag: "Bespoke System",
    icon: "domain",
    title: "Business Websites",
    copy: "Modern, secure sites that establish authority and turn visitors into customers.",
    points: ["Brand-aligned visual narrative", "Lead capture + CRM hooks", "Sub-second rendering"],
    stack: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    no: "02",
    tag: "Revenue Driven",
    icon: "shopping_cart",
    title: "E-Commerce Builds",
    copy: "High-converting stores with frictionless checkout and live inventory sync.",
    points: ["One-click checkout flows", "Stripe, PayPal & multi-currency", "Automated stock alerts"],
    stack: ["Shopify Plus", "WooCommerce", "GraphQL"],
  },
];

const SERVICES = [
  { no: "03", icon: "corporate_fare", title: "Corporate Portals",  copy: "Scalable multi-department sites built for enterprise credibility.", tag: "Enterprise"    },
  { no: "04", icon: "photo_library",  title: "Portfolio Sites",    copy: "Visual-first editorial layouts for studios and consultancies.",   tag: "Storytelling"  },
  { no: "05", icon: "campaign",       title: "Landing Pages",      copy: "Focused campaign pages built to maximise paid ad returns.",       tag: "Conversion"    },
  { no: "06", icon: "devices",        title: "Responsive Design",  copy: "Flawless from 320px phones to 4K widescreen displays.",           tag: "Adaptive"      },
  { no: "07", icon: "auto_fix_high",  title: "Redesign & Upgrade", copy: "Modernise legacy sites without losing your SEO equity.",          tag: "Modernisation" },
  { no: "08", icon: "support_agent",  title: "Support & Care",     copy: "Uptime monitoring, security patches, and guaranteed SLA response.", tag: "Dedicated SLA"},
  { no: "09", icon: "dns",            title: "Domain & Hosting",   copy: "Edge hosting with enterprise firewalls, SSL, and fast DNS.",      tag: "Cloud"         },
  { no: "10", icon: "trending_up",    title: "SEO Engineering",    copy: "Structured schemas, zero-CLS layouts, and sitemap automation.",   tag: "Search"        },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: EASE } },
});

export function Services() {
  const shouldReduce  = useReducedMotion();
  const headRef       = useRef<HTMLDivElement>(null);
  const featuredRef   = useRef<HTMLDivElement>(null);
  const gridRef       = useRef<HTMLDivElement>(null);
  const headInView    = useInView(headRef,     { once: true, margin: "-8% 0px" });
  const featuredInView= useInView(featuredRef, { once: true, margin: "-8% 0px" });
  const gridInView    = useInView(gridRef,     { once: true, margin: "-8% 0px" });

  return (
    <section id="services" className="border-y border-border bg-surface-lowest/50 py-20 lg:py-28">
      <div className="shell">
        {/* Section head */}
        <motion.div
          ref={headRef}
          initial="hidden"
          animate={headInView ? "visible" : "hidden"}
          variants={shouldReduce ? {} : fadeUp(0)}
        >
          <SectionHead
            eyebrow="02 / Services"
            title="Engineered web solutions for every business scale"
            subtitle="From commercial portals to headless storefronts — infrastructure that performs effortlessly."
          />
        </motion.div>

        {/* Featured cards */}
        <div ref={featuredRef} className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {FEATURED.map((s, i) => (
            <motion.article
              key={s.no}
              initial="hidden"
              animate={featuredInView ? "visible" : "hidden"}
              variants={shouldReduce ? {} : fadeUp(i * 0.15)}
              whileHover={shouldReduce ? {} : { y: -3, transition: { duration: 0.25 } }}
              className="group panel flex flex-col p-6 transition-colors hover:border-primary/50 sm:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary-tint">
                  {s.no} / Core Service
                </span>
                <span className="shrink-0 rounded-full border border-border bg-surface-low px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  {s.tag}
                </span>
              </div>

              {/* Icon box */}
              <div className="mt-6 grid h-12 w-12 place-items-center rounded-2xl border border-primary/25 bg-primary/10 transition-all duration-300 group-hover:border-primary/60 group-hover:bg-primary/20">
                <Icon
                  name={s.icon}
                  className="text-2xl text-primary-tint transition-transform duration-300 group-hover:-translate-y-0.5"
                />
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>

              <ul className="mt-5 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <Icon name="check_circle" className="mt-0.5 shrink-0 text-base text-primary-tint" />
                    <span className="min-w-0">{p}</span>
                  </li>
                ))}
              </ul>

              {/* Animated accent line on hover */}
              <div className="relative mt-6 border-t border-border pt-5">
                <div className="absolute -top-px left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                <div className="flex flex-wrap gap-2">
                  {s.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-surface-low px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Secondary grid — sibling dimming */}
        <motion.div
          ref={gridRef}
          className="group/grid mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.no}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              variants={shouldReduce ? {} : fadeUp(Math.floor(i / 4) * 0.08 + (i % 4) * 0.07)}
              className="panel flex h-full min-h-[220px] flex-col p-5 transition-all duration-200
                         hover:!opacity-100 hover:!scale-100 hover:border-primary/40
                         group-hover/grid:opacity-60 group-hover/grid:scale-[0.99]"
            >
              <div className="flex items-center justify-between gap-3">
                <Icon
                  name={s.icon}
                  className="text-xl text-primary-tint transition-transform duration-200 group-hover:-translate-y-0.5"
                />
                <span className="font-mono text-[10px] text-muted-foreground/70">{s.no}</span>
              </div>
              <h3 className="mt-5 font-display text-base font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{s.copy}</p>
              <span className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-wider text-primary-tint">
                {s.tag}
              </span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
