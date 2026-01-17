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
      className={`min-h-screen flex flex-col justify-center pt-28 pb-16 md:pb-24 ${useRevealClass(
        isVisible
      )} overflow-hidden`}
      aria-labelledby="hero-heading"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 100%), linear-gradient(to right, #C7d2f5, #F1F7FD, #D9F4E6)",
      }}
    >
      <div className="container mx-auto px-8 md:px-16 lg:px-24 flex-1 flex flex-col justify-center">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Text Content - Centered */}
          <div className="flex flex-col space-y-4 max-w-3xl">
            <h1
              id="hero-heading"
              className={`text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl ${
                isVisible ? "animate-fade-in-up" : ""
              }`}
            >
              {hero.headline}
            </h1>
            <p
              className={`text-lg text-muted-foreground md:text-xl mx-auto max-w-[700px] ${
                isVisible ? "animate-fade-in-up-delay-1" : ""
              }`}
            >
              {hero.subheadline}
            </p>

            {/* Users count */}
            <div
              className={`flex items-center justify-center gap-3 text-muted-foreground ${
                isVisible ? "animate-fade-in-up-delay-2" : ""
              }`}
            >
              <div className="flex items-center -space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
                  alt="User avatar"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover animate-avatar-pulse animate-avatar-float"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                  alt="User avatar"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover animate-avatar-pulse-delay-1 animate-avatar-float"
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces"
                  alt="User avatar"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover animate-avatar-pulse-delay-2 animate-avatar-float"
                />
              </div>
              <span className="text-sm md:text-base">600+ users loving it</span>
            </div>

            {/* CTA Button */}
            <div
              className={`flex justify-center pt-2 ${
                isVisible ? "animate-fade-in-up-delay-3" : ""
              }`}
            >
              <Button
                asChild
                size="lg"
                className="bg-black text-white hover:bg-black/90 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                data-analytics="cta:hero_primary"
                data-gtm="cta_waitlist"
                data-cta-type="waitlist"
                data-cta-placement="hero"
                onClick={handlePrimaryClick}
              >
                <a href={hero.primaryCtaHref}>{hero.primaryCta}</a>
              </Button>
            </div>
          </div>

          {/* Media - Video iframe below text */}
          <div
            className={`relative w-full max-w-6xl mt-8 md:mt-12 ${
              isVisible ? "animate-fade-in-up-delay-4" : ""
            }`}
          >
            <div className="relative rounded-xl border bg-background/50 p-1 shadow-2xl backdrop-blur-sm ring-1 ring-border/50">
              {/* Decorative glow with animation */}
              <div className="absolute -inset-4 -z-10 bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-60 blur-2xl rounded-[2rem] animate-glow-pulse" />
              {/* Vimeo Video */}
              <div style={{ padding: "64.69% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/1155567901?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  title="hero-animation"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
