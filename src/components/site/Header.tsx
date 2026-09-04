import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "./Section";

const LOGO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAdYdIedBHE7QU8DFVKamO7864dfHmZaJugxFCUK_qxFyV8GB168akR919YGdD74qDy4fCQ-rqqlnvS8Rva3QceSEwXoxemN72lEIbYoprjjpZfIkY3Rl-7cYtO-PyjaLzCNCPO7KeYx7MPF5DF7e5ypEfluuJGwxAEIXVJF94Eqzrsbi1P8qzyVU4e9KGN3ZG-RJ7hDFC_NHsr6loqLca1_0yWIE94hlOPjdlgpeFLTBKpGEU7F5BGhdWy5QvHsC9Rb3s";

const NAV = [
  { label: "About",    href: "#about",    id: "about"    },
  { label: "Services", href: "#services", id: "services" },
  { label: "Why Us",   href: "#why-us",   id: "why-us"   },
  { label: "Process",  href: "#process",  id: "process"  },
  { label: "Contact",  href: "#inquiry",  id: "inquiry"  },
];

export function Header() {
  const [scrolled, setScrolled]         = useState(false);
  const [activeId, setActiveId]         = useState<string | null>(null);
  const shouldReduce                     = useReducedMotion();
  const indicatorRef                     = useRef<HTMLDivElement>(null);
  const navRef                           = useRef<HTMLDivElement>(null);

  /* ── Scroll detection ─────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section detection ─────────────────────────────── */
  useEffect(() => {
    const sectionIds = NAV.map((n) => n.id).reverse();
    const onScroll = () => {
      const active = sectionIds.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        return el.getBoundingClientRect().top <= 100;
      });
      setActiveId(active ?? null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Move indicator underline ─────────────────────────────── */
  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;
    const activeEl = navRef.current.querySelector<HTMLElement>(
      `[data-id="${activeId}"]`
    );
    if (!activeEl) {
      indicatorRef.current.style.opacity = "0";
      return;
    }
    const navRect  = navRef.current.getBoundingClientRect();
    const elRect   = activeEl.getBoundingClientRect();
    indicatorRef.current.style.opacity    = "1";
    indicatorRef.current.style.width      = `${elRect.width}px`;
    indicatorRef.current.style.transform  = `translateX(${elRect.left - navRect.left}px)`;
  }, [activeId]);

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-background/80 pb-2 pt-3 backdrop-blur-md"
      initial={shouldReduce ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="shell">
        <div
          className={`grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border px-4 shadow-[0_4px_24px_oklch(0_0_0/0.5)] backdrop-blur-md transition-all duration-500 sm:px-5 lg:flex lg:justify-between ${
            scrolled
              ? "border-border/70 bg-surface-lowest/95 shadow-[0_4px_32px_oklch(0_0_0/0.7)]"
              : "border-border bg-surface-lowest/90"
          }`}
        >
          {/* Logo */}
          <a href="#top" className="group flex min-w-0 items-center gap-3">
            <img
              src={LOGO}
              alt="El Experto Web Solutions logo"
              className="h-9 w-9 shrink-0 rounded-lg border border-border bg-black object-contain p-0.5 transition-colors group-hover:border-primary"
            />
            <span className="flex min-w-0 flex-col">
              <span className="truncate font-display text-sm font-bold tracking-tight text-foreground transition-colors group-hover:text-primary-tint">
                EL EXPERTO
              </span>
              <span className="truncate font-mono text-[9px] uppercase leading-none tracking-[0.2em] text-muted-foreground">
                Web Solutions
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav ref={navRef} className="relative hidden items-center gap-7 text-sm font-medium lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-id={item.id}
                className={`transition-colors duration-200 ${
                  activeId === item.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
            {/* Animated underline indicator */}
            <div
              ref={indicatorRef}
              className="pointer-events-none absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary opacity-0 transition-all duration-300"
              style={{ width: 0, transform: "translateX(0)" }}
            />
          </nav>

          {/* CTA + mobile menu */}
          <div className="flex shrink-0 items-center gap-2">
            <a
              href="#inquiry"
              className="glow-ring inline-flex h-10 items-center justify-center rounded-full border border-primary-tint/30 bg-primary px-4 font-mono text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get a Quote
            </a>
            <a
              href="#services"
              aria-label="Jump to services"
              className="grid h-10 w-10 place-items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            >
              <Icon name="menu" className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
