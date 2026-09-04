const COLUMNS = [
  {
    title: "Services",
    links: [
      "Business Websites",
      "E-Commerce",
      "Corporate Portals",
      "Landing Pages",
      "Redesign & SEO",
    ],
    href: "#services",
  },
  {
    title: "Agency",
    links: [
      "About Us",
      "Why Choose Us",
      "Our Process",
      "Consultation",
      "Security & SLA",
    ],
    href: "#about",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-lowest">
      <div className="shell grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="font-display text-sm font-bold tracking-tight text-foreground">
            EL EXPERTO
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            Web Solutions
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Powerful websites. Lasting impressions. Real business growth.
          </p>
          <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-primary-tint">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            All systems operational
          </div>
        </div>

        {COLUMNS.map((c) => (
          <nav key={c.title}>
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {c.title}
            </div>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l}>
                  <a
                    href={c.href}
                    className="text-sm text-foreground/75 transition-colors hover:text-primary-tint"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Contact
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <div className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                India
              </div>
              <a href="tel:+919618127913" className="text-foreground/85 hover:text-primary-tint">
                +91 96181 27913
              </a>
            </li>
            <li>
              <div className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                Saudi Arabia
              </div>
              <a href="tel:+966511837472" className="text-foreground/85 hover:text-primary-tint">
                +966 51 183 7472
              </a>
            </li>
            <li>
              <div className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                Email
              </div>
              <a
                href="mailto:contact@elexperto.com"
                className="break-all text-foreground/85 hover:text-primary-tint"
              >
                contact@elexperto.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>© 2026 El Experto Web Solutions</span>
          <span>Latency 14ms · Secure protocol</span>
        </div>
      </div>
    </footer>
  );
}
