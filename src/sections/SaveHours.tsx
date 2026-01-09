import { saveHours } from "@/content/landing";
import { useReveal, useRevealClass } from "@/hooks/useReveal";
import { useCountUp } from "@/hooks/useCountUp";
import chartImage from "../../assets/chart.png";

export function SaveHours() {
  const { ref, isVisible } = useReveal();
  const animatedValue = useCountUp({
    end: 65.8,
    duration: 3000,
    enabled: isVisible,
    decimals: 1,
  });

  return (
    <section
      ref={ref}
      className={`py-16 md:py-24 ${useRevealClass(isVisible)}`}
      aria-labelledby="save-hours-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Column - Text & Stat */}
          <div className="space-y-6">
            <h2
              id="save-hours-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
            >
              {saveHours.headline}
            </h2>
            <p className="text-muted-foreground md:text-lg">
              {saveHours.description}
            </p>

            {/* Big Stat */}
            <div className="space-y-4">
              <div className="text-6xl font-bold text-foreground md:text-7xl lg:text-8xl">
                {animatedValue}%
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                {saveHours.stat.label}
              </p>
            </div>
          </div>

          {/* Right Column - Chart */}
          <div className="relative">
            <img
              src={chartImage}
              alt="Pie chart showing time spent on prospecting vs selling"
              className="w-full max-w-sm mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
