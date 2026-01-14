import { Link } from "react-router-dom";
import { navigation, footer } from "@/content/landing";
import logo from "../../assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              to="/"
              className="font-semibold text-lg flex items-center gap-2"
              aria-label={`${navigation.logo} - Home`}
            >
              <img 
                src={logo} 
                alt={`${navigation.logo} logo`}
                className="h-6 w-auto"
              />
            </Link>
            <p className="text-xs text-muted-foreground">powered by Nueve</p>
          </div>

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
