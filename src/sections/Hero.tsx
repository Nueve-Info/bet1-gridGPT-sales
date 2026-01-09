import { Button } from "@/components/ui/button";
import { hero } from "@/content/landing";
import { track } from "@/lib/analytics";
import { useReveal, useRevealClass } from "@/hooks/useReveal";

export function Hero() {
  const { ref, isVisible } = useReveal();

  const handlePrimaryClick = () => {
    track("cta:hero_primary");
  };

  return (
    <section
      ref={ref}
      className={`py-16 md:py-24 lg:py-32 ${useRevealClass(isVisible)}`}
      aria-labelledby="hero-heading"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 100%), linear-gradient(to right, #F1F7FD, #D9F4E6)",
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="flex flex-col space-y-6">
            <h1
              id="hero-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {hero.headline}
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-[600px]">
              {hero.subheadline}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                data-analytics="cta:hero_primary"
                onClick={handlePrimaryClick}
              >
                <a href={hero.primaryCtaHref}>{hero.primaryCta}</a>
              </Button>
            </div>
          </div>

          {/* Media Placeholder */}
          <div
            className="relative aspect-video w-full rounded-lg bg-muted"
            role="img"
            aria-label="Product demonstration placeholder"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">
                Media placeholder
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
