import { saveHours } from "@/content/landing";
import { useReveal, useRevealClass } from "@/hooks/useReveal";

export function SaveHours() {
  const { ref, isVisible } = useReveal();

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
            <div className="space-y-2">
              <div className="text-5xl font-bold text-foreground md:text-6xl">
                {saveHours.stat.value}
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                {saveHours.stat.label}
              </p>
            </div>
          </div>

          {/* Right Column - Chart Placeholder */}
          <div className="relative">
            {/* Pie Chart Placeholder */}
            <div
              className="aspect-square w-full max-w-sm mx-auto"
              role="img"
              aria-label="Pie chart showing time spent on prospecting vs selling"
            >
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                aria-hidden="true"
              >
                {/* Prospecting slice (65.8%) */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="40"
                  strokeDasharray="330.6 503.4"
                  strokeDashoffset="125.85"
                  transform="rotate(-90 100 100)"
                />
                {/* Selling slice (34.2%) */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="40"
                  strokeDasharray="171.8 503.4"
                  strokeDashoffset="-204.75"
                  transform="rotate(-90 100 100)"
                />
                {/* Center circle */}
                <circle cx="100" cy="100" r="60" fill="hsl(var(--background))" />
              </svg>

              {/* Legend */}
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted" />
                  <span className="text-sm text-muted-foreground">
                    {saveHours.chartLabels.prospecting}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">
                    {saveHours.chartLabels.selling}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
