import { gridGptFeatures } from "@/content/landing";
import { useReveal, useRevealClass } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Feature = (typeof gridGptFeatures)[number];

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────

function FeatureNavButton({
  feature,
  isActive,
  onClick,
  buttonRef,
}: {
  feature: Feature;
  isActive: boolean;
  onClick: () => void;
  buttonRef?: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 md:p-5 transition-all duration-300 group relative border-b border-border last:border-0 flex-1",
        isActive
          ? "bg-black text-white border-b-black"
          : "bg-transparent text-foreground hover:bg-muted/30"
      )}
      aria-selected={isActive}
      role="tab"
    >
      {/* Active Indicator Arrow (Desktop) - Optional visual flair */}
      {isActive && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-black rotate-45 hidden lg:block z-10" />
      )}
      
      <span className={cn(
        "text-lg md:text-xl font-bold leading-tight block transition-colors duration-300",
        isActive ? "text-white" : "text-foreground group-hover:text-foreground/80"
      )}>
        {feature.title}
      </span>
    </button>
  );
}

function FeatureContentPanel({ feature }: { feature: Feature }) {
  return (
    <div className="h-full flex flex-col justify-center p-6 md:p-8 lg:p-10 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <h3 className="text-sm font-medium text-white/60 mb-2 uppercase tracking-wider">
          Description
        </h3>
        <p className="text-base md:text-lg text-white leading-relaxed max-w-lg">
          {feature.description}
        </p>
      </div>

      {/* Image Placeholder */}
      <div 
        className="w-full aspect-video bg-white/10 rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden group"
        role="img" 
        aria-label={feature.mediaAlt}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="text-white/40 text-sm font-medium">
          Photo placeholder
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook do sticky scroll z tabami
// ─────────────────────────────────────────────────────────────────────────────

function useStickyTabScroll(itemCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const scrollAccumulator = useRef(0);
  const lastTabChangeTime = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const handleTabClick = useCallback((index: number) => {
    setActiveIndex(index);
    activeIndexRef.current = index;
    lastTabChangeTime.current = Date.now();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      
      // Sprawdź czy sekcja jest w widoku (sticky powinna być aktywna)
      // Sekcja jest sticky gdy górna krawędź jest na górze lub powyżej viewportu,
      // a dolna krawędź jest poniżej viewportu
      const isSectionInView = rect.top <= 0 && rect.bottom >= window.innerHeight;
      
      if (!isSectionInView) {
        scrollAccumulator.current = 0;
        return; // Pozwól na normalny scroll
      }

      const currentIndex = activeIndexRef.current;
      
      // Jeśli na ostatnim tabie i scrollujemy w dół - pozwól wyjść z sekcji
      if (currentIndex === itemCount - 1 && e.deltaY > 0) {
        scrollAccumulator.current = 0;
        return;
      }
      
      // Jeśli na pierwszym tabie i scrollujemy w górę - pozwól wyjść z sekcji
      if (currentIndex === 0 && e.deltaY < 0) {
        scrollAccumulator.current = 0;
        return;
      }

      // Blokuj normalny scroll i akumuluj dla zmiany tabów
      e.preventDefault();
      
      const now = Date.now();
      const MIN_SCROLL_DELTA = 50;
      const MIN_TIME_BETWEEN_CHANGES = 200;
      
      scrollAccumulator.current += Math.abs(e.deltaY);
      
      if (now - lastTabChangeTime.current < MIN_TIME_BETWEEN_CHANGES) {
        return;
      }
      
      if (scrollAccumulator.current < MIN_SCROLL_DELTA) {
        return;
      }
      
      scrollAccumulator.current = 0;
      lastTabChangeTime.current = now;
      
      if (e.deltaY > 0) {
        // Scroll w dół - następny tab
        const newIndex = Math.min(itemCount - 1, currentIndex + 1);
        setActiveIndex(newIndex);
        activeIndexRef.current = newIndex;
      } else {
        // Scroll w górę - poprzedni tab
        const newIndex = Math.max(0, currentIndex - 1);
        setActiveIndex(newIndex);
        activeIndexRef.current = newIndex;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [itemCount]);

  return { containerRef, activeIndex, handleTabClick };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export function GridGptFeatures() {
  const { ref: revealRef, isVisible } = useReveal();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  const { containerRef, activeIndex, handleTabClick } = useStickyTabScroll(
    gridGptFeatures.length
  );

  const activeFeature = gridGptFeatures[activeIndex];

  return (
    <section
      id="features"
      aria-label="GridGPT Features"
      className={cn("bg-background", useRevealClass(isVisible))}
      ref={revealRef}
    >
      {/* 
        Wrapper z wysokością = 100vh + (liczba tabów - 1) * 50vh
        Dzięki temu mamy miejsce na scroll, podczas gdy sticky content pozostaje na miejscu
      */}
      <div 
        ref={containerRef}
        className="relative"
        style={{ height: `${100 + (gridGptFeatures.length - 1) * 50}vh` }}
      >
        {/* Sticky container - pozostaje na miejscu podczas scrollowania */}
        {/* top-16 = 64px (wysokość headera), h-[calc(100vh-4rem)] aby zmieścić się pod headerem */}
        <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col">
          {/* Header */}
          <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6">
              GridGPT is
            </h2>
          </div>

          {/* Main content area */}
          <div className="flex-1 w-full border-y border-border bg-background">
            <div className="container mx-auto px-0 md:px-0 h-full">
              <div className="flex flex-col lg:flex-row h-full">
                {/* Left Column: Navigation */}
                <div className="w-full lg:w-1/3 flex flex-col bg-white">
                  {gridGptFeatures.map((feature, index) => (
                    <FeatureNavButton
                      key={index}
                      feature={feature}
                      isActive={activeIndex === index}
                      onClick={() => handleTabClick(index)}
                      buttonRef={(el) => {
                        buttonRefs.current[index] = el;
                      }}
                    />
                  ))}
                </div>

                {/* Right Column: Content */}
                <div className="w-full lg:w-2/3 bg-black text-white relative flex-1">
                  <FeatureContentPanel 
                    key={activeIndex} 
                    feature={activeFeature} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Progress indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {gridGptFeatures.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === index 
                    ? "bg-black w-6" 
                    : "bg-black/20 hover:bg-black/40"
                )}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
