import { navigation, footer } from "@/content/landing";

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {/* Logo */}
          <a
            href="/"
            className="font-semibold text-lg"
            aria-label={`${navigation.logo} - Home`}
          >
            {navigation.logo}
          </a>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex gap-6">
              {footer.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
