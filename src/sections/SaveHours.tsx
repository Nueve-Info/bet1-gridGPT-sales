import { saveHours } from "@/content/landing";
import { useReveal, useRevealClass } from "@/hooks/useReveal";
import { ChevronRight, Building2, Linkedin, Newspaper, Database } from "lucide-react";
import logotypSvg from "../../assets/logotyp.svg";

function PipelineFrameFromFigma() {
  return (
    <div
      role="img"
      aria-label="Schemat: Data monitoring → Lead matching enrichment → List of B2B prospects (video placeholder)"
      className="w-full rounded-xl border bg-background p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12"
    >
      {/* Mobile layout: vertical stack */}
      <div className="flex flex-col gap-6 sm:hidden">
        {/* Data monitoring */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground leading-tight">
            Data monitoring
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2.5 text-sm">
              <Building2
                className="size-4 text-muted-foreground flex-shrink-0"
                aria-hidden="true"
              />
              <span className="break-words">Financial context</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2.5 text-sm">
              <Linkedin
                className="size-4 text-muted-foreground flex-shrink-0"
                aria-hidden="true"
              />
              <span className="break-words">Social media</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2.5 text-sm">
              <Newspaper
                className="size-4 text-muted-foreground flex-shrink-0"
                aria-hidden="true"
              />
              <span className="break-words">News, publications, reports</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2.5 text-sm">
              <Database
                className="size-4 text-muted-foreground flex-shrink-0"
                aria-hidden="true"
              />
              <span className="break-words">Non-public databases</span>
            </div>
          </div>
        </div>

        {/* Arrow down for mobile */}
        <div className="flex items-center justify-center py-2">
          <ChevronRight
            className="size-5 text-muted-foreground/50 rotate-90"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        {/* Lead matching enrichment */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="text-base font-semibold text-foreground leading-tight">
            Lead matching enrichment
          </h3>
          <img
            src={logotypSvg}
            alt="GridGPT Logo"
            className="w-16 h-16"
          />
          <p className="text-lg font-semibold tracking-tight">GridGPT</p>
          <div className="w-full space-y-3">
            <div
              className="rounded-lg border border-foreground/10 px-3 py-2.5 text-sm font-medium text-foreground"
              style={{
                background: "linear-gradient(to right, #F1F7FD, #D9F4E6)",
              }}
            >
              Personas or ICP
            </div>
            <div
              className="rounded-lg border border-foreground/10 px-3 py-2.5 text-sm font-medium text-foreground"
              style={{
                background: "linear-gradient(to right, #F1F7FD, #D9F4E6)",
              }}
            >
              Your offer
            </div>
            <div
              className="rounded-lg border border-foreground/10 px-3 py-2.5 text-sm font-medium text-foreground"
              style={{
                background: "linear-gradient(to right, #F1F7FD, #D9F4E6)",
              }}
            >
              Your CRM
            </div>
          </div>
        </div>

        {/* Arrow down for mobile */}
        <div className="flex items-center justify-center py-2">
          <ChevronRight
            className="size-5 text-muted-foreground/50 rotate-90"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        {/* List of B2B prospects */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground leading-tight">
              List of B2B prospects
            </h3>
            <p className="text-xs text-muted-foreground">
              with phone, email, linkedin and business context
            </p>
          </div>
          <div className="w-full rounded-lg overflow-hidden aspect-[616/436]">
            <iframe
              src="https://player.vimeo.com/video/1153677580?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full"
              title="table-animation-sales"
            />
          </div>
        </div>
      </div>

      {/* Tablet and Desktop layout: horizontal grid */}
      <div className="hidden sm:grid gap-4 md:gap-6 lg:gap-8 grid-cols-[1fr_auto_1fr] items-start">
        {/* Left column: Data monitoring + Lead matching enrichment (1/2 width) */}
        <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-[1fr_auto_1fr] items-start">
          {/* Data monitoring */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <div className="h-12 md:h-14 lg:h-16 flex items-start">
              <p className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-foreground leading-tight">
                Data monitoring
              </p>
            </div>
            <div className="space-y-3 md:space-y-4 lg:space-y-5">
              <div className="flex items-center gap-2 md:gap-3 lg:gap-4 rounded-lg border bg-background px-3 py-2.5 md:px-4 md:py-3 lg:px-5 lg:py-4 text-sm md:text-base lg:text-lg">
                <Building2
                  className="size-4 md:size-5 lg:size-6 text-muted-foreground flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="break-words">Financial context</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 lg:gap-4 rounded-lg border bg-background px-3 py-2.5 md:px-4 md:py-3 lg:px-5 lg:py-4 text-sm md:text-base lg:text-lg">
                <Linkedin
                  className="size-4 md:size-5 lg:size-6 text-muted-foreground flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="break-words">Social media</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 lg:gap-4 rounded-lg border bg-background px-3 py-2.5 md:px-4 md:py-3 lg:px-5 lg:py-4 text-sm md:text-base lg:text-lg">
                <Newspaper
                  className="size-4 md:size-5 lg:size-6 text-muted-foreground flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="break-words">News, publications, reports</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 lg:gap-4 rounded-lg border bg-background px-3 py-2.5 md:px-4 md:py-3 lg:px-5 lg:py-4 text-sm md:text-base lg:text-lg">
                <Database
                  className="size-4 md:size-5 lg:size-6 text-muted-foreground flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="break-words">Non-public databases</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center px-1 md:px-2 self-center">
            <ChevronRight
              className="size-4 md:size-5 lg:size-6 xl:size-7 text-muted-foreground/50 animate-arrow-pulse transition-colors duration-300"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>

          {/* Lead matching enrichment */}
          <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8 text-center">
            <div className="h-12 md:h-14 lg:h-16 flex items-start justify-center">
              <p className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-foreground leading-tight">
                Lead matching enrichment
              </p>
            </div>

            {/* Logo */}
            <img
              src={logotypSvg}
              alt="GridGPT Logo"
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28"
            />

            <p className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold tracking-tight">
              GridGPT
            </p>

            <div className="w-full max-w-[240px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[360px] space-y-3 md:space-y-4 lg:space-y-5">
              <div
                className="rounded-lg border border-foreground/10 px-3 py-2.5 md:px-4 md:py-3 lg:px-5 lg:py-4 text-sm md:text-base lg:text-lg font-medium text-foreground"
                style={{
                  background: "linear-gradient(to right, #F1F7FD, #D9F4E6)",
                }}
              >
                Personas or ICP
              </div>
              <div
                className="rounded-lg border border-foreground/10 px-3 py-2.5 md:px-4 md:py-3 lg:px-5 lg:py-4 text-sm md:text-base lg:text-lg font-medium text-foreground"
                style={{
                  background: "linear-gradient(to right, #F1F7FD, #D9F4E6)",
                }}
              >
                Your offer
              </div>
              <div
                className="rounded-lg border border-foreground/10 px-3 py-2.5 md:px-4 md:py-3 lg:px-5 lg:py-4 text-sm md:text-base lg:text-lg font-medium text-foreground"
                style={{
                  background: "linear-gradient(to right, #F1F7FD, #D9F4E6)",
                }}
              >
                Your CRM
              </div>
            </div>
          </div>
        </div>

        {/* Arrow between left column and right column */}
        <div className="flex items-center justify-center px-1 md:px-2 self-center">
          <ChevronRight
            className="size-4 md:size-5 lg:size-6 xl:size-7 text-muted-foreground/50 animate-arrow-pulse-delayed transition-colors duration-300"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        {/* Right column: List of B2B prospects (1/2 width) */}
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
          <div className="space-y-1 md:space-y-2">
            <div className="h-12 md:h-14 lg:h-16 flex items-start">
              <p className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-foreground leading-tight">
                List of B2B prospects
              </p>
            </div>
            <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
              with phone, email, linkedin and business context
            </p>
          </div>

          <div className="w-full rounded-lg overflow-hidden aspect-[616/436]">
            <iframe
              src="https://player.vimeo.com/video/1153677580?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full"
              title="table-animation-sales"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SaveHours() {
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref}
      className={`py-16 md:py-24 ${useRevealClass(isVisible)}`}
      aria-labelledby="save-hours-heading"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* Text & Stat */}
          <div className="space-y-6">
            <h2
              id="save-hours-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
            >
              {saveHours.headline}
            </h2>
            {saveHours.description && (
              <p className="text-muted-foreground md:text-lg">
                {saveHours.description}
              </p>
            )}

            {/* Big Stat */}
          </div>

          {/* Chart - below text */}
          <div className="relative -mx-4 md:-mx-6 px-4 md:px-6">
            <PipelineFrameFromFigma />
          </div>
        </div>
      </div>
    </section>
  );
}
