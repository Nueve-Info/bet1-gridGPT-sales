import { gridGptFeatures } from "@/content/landing";
import { useReveal, useRevealClass } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Feature = (typeof gridGptFeatures)[number];

interface TabItemProps {
  feature: Feature;
  index: number;
  isActive: boolean;
  onClick: () => void;
  controlsId: string;
}

interface FeatureDescriptionProps {
  feature: Feature;
  id: string;
  prefersReducedMotion: boolean;
}

interface FeaturePlaceholderProps {
  feature: Feature;
  prefersReducedMotion: boolean;
}

interface MobileFeatureBlockProps {
  feature: Feature;
  index: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook: detect reduced motion preference
// ─────────────────────────────────────────────────────────────────────────────

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook: detect if screen is desktop (lg+)
// ─────────────────────────────────────────────────────────────────────────────

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function TabItem({ feature, index, isActive, onClick, controlsId }: TabItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg p-3",
        isActive
          ? "bg-primary/10 text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
      aria-current={isActive ? "step" : undefined}
      aria-controls={controlsId}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors",
            isActive
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={cn(
              "text-base transition-colors leading-tight",
              isActive ? "font-semibold" : "font-medium"
            )}
          >
            {feature.headline}
          </div>
          <div
            className={cn(
              "text-xs mt-0.5 transition-colors",
              isActive ? "text-muted-foreground" : "text-muted-foreground/70"
            )}
          >
            {feature.badge}
          </div>
        </div>
      </div>
    </button>
  );
}

function FeatureDescription({ feature, id, prefersReducedMotion }: FeatureDescriptionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsMounted(true);
      return;
    }
    setIsMounted(false);
    const timer = setTimeout(() => setIsMounted(true), 10);
    return () => clearTimeout(timer);
  }, [feature, prefersReducedMotion]);

  return (
    <div
      id={id}
      className={cn(
        "space-y-3",
        !prefersReducedMotion && "transition-opacity duration-300 ease-out",
        !prefersReducedMotion && (isMounted ? "opacity-100" : "opacity-0")
      )}
    >
      <h3 className="text-xl font-semibold text-foreground">
        {feature.headline}
      </h3>
      {feature.points.length > 0 && (
        <ul className="space-y-1">
          {feature.points.map((point, idx) => (
            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="text-base text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

function FeaturePlaceholder({ feature, prefersReducedMotion }: FeaturePlaceholderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsMounted(true);
      return;
    }
    setIsMounted(false);
    const timer = setTimeout(() => setIsMounted(true), 10);
    return () => clearTimeout(timer);
  }, [feature, prefersReducedMotion]);

  return (
    <div
      className={cn(
        "w-full rounded-lg bg-muted aspect-video flex items-center justify-center",
        !prefersReducedMotion && "transition-opacity duration-300 ease-out",
        !prefersReducedMotion && (isMounted ? "opacity-100" : "opacity-0")
      )}
      role="img"
      aria-label={feature.mediaAlt}
    >
      <span className="text-sm text-muted-foreground text-center px-4">
        {feature.mediaAlt}
      </span>
    </div>
  );
}

function MobileFeatureBlock({ feature, index }: MobileFeatureBlockProps) {
  return (
    <div className="space-y-4 py-8 first:pt-0 last:pb-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
          {index + 1}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {feature.headline}
          </h3>
          <p className="text-xs text-muted-foreground">{feature.badge}</p>
        </div>
      </div>
      {feature.points.length > 0 && (
        <ul className="space-y-1 pl-11">
          {feature.points.map((point, idx) => (
            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="text-base text-muted-foreground leading-relaxed pl-11">
        {feature.description}
      </p>
      <div className="pl-11">
        <div
          className="w-full rounded-lg bg-muted aspect-video flex items-center justify-center"
          role="img"
          aria-label={feature.mediaAlt}
        >
          <span className="text-sm text-muted-foreground text-center px-4">
            {feature.mediaAlt}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export function GridGptFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intersectionRatios = useRef<number[]>(gridGptFeatures.map(() => 0));
  const { ref: revealRef, isVisible } = useReveal();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  // ─────────────────────────────────────────────────────────────────────────
  // IntersectionObserver for scroll-linked steps (desktop only)
  // Tracks intersection ratios for ALL steps to ensure smooth transitions
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isDesktop) return;

    const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (steps.length === 0) return;

    // Reset ratios
    intersectionRatios.current = gridGptFeatures.map(() => 0);

    const observer = new IntersectionObserver(
      (entries) => {
        // Update ratios for changed entries
        for (const entry of entries) {
          const index = steps.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            intersectionRatios.current[index] = entry.isIntersecting
              ? entry.intersectionRatio
              : 0;
          }
        }

        // Find the step with highest intersection ratio
        let maxRatio = 0;
        let maxIndex = 0;

        for (let i = 0; i < intersectionRatios.current.length; i++) {
          const ratio = intersectionRatios.current[i];
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxIndex = i;
          }
        }

        // Only update if we have a visible step
        if (maxRatio > 0) {
          setActiveIndex(maxIndex);
        }
      },
      {
        // More granular thresholds for smoother transitions
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    steps.forEach((step) => observer.observe(step));

    return () => {
      steps.forEach((step) => observer.unobserve(step));
    };
  }, [isDesktop]);

  // ─────────────────────────────────────────────────────────────────────────
  // Handle tab click → scroll to step
  // ─────────────────────────────────────────────────────────────────────────

  const handleTabClick = useCallback(
    (index: number) => {
      const step = stepRefs.current[index];
      if (step) {
        step.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "center",
        });
        setActiveIndex(index);
      }
    },
    [prefersReducedMotion]
  );

  const activeFeature = gridGptFeatures[activeIndex];
  const contentId = `feature-content-${activeIndex}`;

  return (
    <section
      id="features"
      aria-label="GridGPT Features"
      className={cn("py-16 md:py-24 bg-muted/30", useRevealClass(isVisible))}
    >
      <div ref={revealRef} className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-8 lg:mb-12">
          GridGPT is
        </h2>

        {/* ───────────────────────────────────────────────────────────────────
            DESKTOP: Sticky stepper layout
        ─────────────────────────────────────────────────────────────────── */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Sticky UI Container */}
            <div className="lg:sticky lg:top-20 z-10 bg-muted/30 pb-4">
              <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-stretch">
                {/* Left: Tab List */}
                <nav
                  aria-label="Feature steps"
                  className="space-y-2 bg-background/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border h-full"
                >
                  {gridGptFeatures.map((feature, index) => (
                    <TabItem
                      key={index}
                      feature={feature}
                      index={index}
                      isActive={activeIndex === index}
                      onClick={() => handleTabClick(index)}
                      controlsId={contentId}
                    />
                  ))}
                </nav>

                {/* Right: Description + Placeholder */}
                <div className="space-y-6 bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border h-full">
                  <FeatureDescription
                    key={activeIndex}
                    feature={activeFeature}
                    id={contentId}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                  <FeaturePlaceholder
                    key={`placeholder-${activeIndex}`}
                    feature={activeFeature}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </div>
              </div>
            </div>

            {/* Scroll Steps (invisible, drive the IntersectionObserver) */}
            <div className="relative -mt-[50vh]" aria-hidden="true">
              {gridGptFeatures.map((_, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className="h-[60vh] pointer-events-none"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────────────
            MOBILE: Simple stacked blocks
        ─────────────────────────────────────────────────────────────────── */}
        <div className="lg:hidden divide-y divide-border">
          {gridGptFeatures.map((feature, index) => (
            <MobileFeatureBlock key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
