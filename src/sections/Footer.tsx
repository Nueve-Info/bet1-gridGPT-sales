import { Link } from "react-router-dom";
import { navigation, footer } from "@/content/landing";

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-semibold text-lg"
            aria-label={`${navigation.logo} - Home`}
          >
            {navigation.logo}
          </Link>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex gap-6">
              {footer.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
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
