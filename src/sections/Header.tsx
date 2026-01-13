import { Button } from "@/components/ui/button";
import { navigation } from "@/content/landing";
import { track } from "@/lib/analytics";

export function Header() {
  const handleCtaClick = () => {
    track("cta:header_primary");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-8 md:px-16 lg:px-24">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center font-semibold text-lg"
          aria-label={`${navigation.logo} - Home`}
        >
          <img src="/logo.png" alt="" className="h-7 w-auto" />
        </a>

        {/* CTA Button */}
        <Button
          asChild
          data-analytics="cta:header_primary"
          onClick={handleCtaClick}
        >
          <a href={navigation.ctaHref}>{navigation.ctaText}</a>
        </Button>
      </div>
    </header>
  );
}
