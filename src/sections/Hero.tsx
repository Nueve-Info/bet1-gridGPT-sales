import { Button } from "@/components/ui/button";
import { hero } from "@/content/landing";
import { track } from "@/lib/analytics";
import { useReveal, useRevealClass } from "@/hooks/useReveal";
import { useEffect } from "react";

export function Hero() {
  const { ref, isVisible } = useReveal();

  const handlePrimaryClick = () => {
    track("cta:hero_primary");
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`py-16 md:py-24 lg:py-32 ${useRevealClass(isVisible)} overflow-hidden`}
      aria-labelledby="hero-heading"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 100%), linear-gradient(to right, #F1F7FD, #D9F4E6)",
      }}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="flex flex-col space-y-6 relative z-10">
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

          {/* Media */}
          <div className="relative w-full">
             {/* Grid background effect */}
             <div className="absolute inset-0 -z-10 bg-grid-black opacity-40 rounded-full blur-3xl transform scale-150" />
             
            <div className="relative rounded-xl border bg-background/50 p-1 shadow-2xl backdrop-blur-sm ring-1 ring-border/50">
              <div style={{ padding: "55.3% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/1154013732?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  title="table-sales"
                  className="rounded-lg"
                />
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-4 -z-10 bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-60 blur-2xl rounded-[2rem]" />
              
              {/* Grid overlay for "modern tech" feel */}
               <div className="absolute inset-0 pointer-events-none rounded-lg bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
