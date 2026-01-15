import { gridGptFeatures } from "@/content/landing";
import { useReveal, useRevealClass } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Feature = (typeof gridGptFeatures)[number];

// ─────────────────────────────────────────────────────────────────────────────
// Stack Cards Data (same as ValueProposition)
// ─────────────────────────────────────────────────────────────────────────────

const stackCards = [
  {
    type: "company",
    name: "Global Systems Inc.",
    detail: "$28M revenue 2025",
  },
  {
    type: "contact",
    name: "Mark Spenser",
    detail: "m.sps@lhs.com",
  },
  {
    type: "contact",
    name: "David Kim",
    detail: "Head of Growth - Stripe",
    contact: "d.kim@stripe.com • LinkedIn",
  },
  {
    type: "company",
    name: "NextGen Data",
    detail: "Market Leader 2024",
  },
  {
    type: "contact",
    name: "John Snow",
    detail: "CFO - OpenAI",
    contact: "+1 415 555 0192",
  },
];

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
        "w-full text-left px-6 md:px-8 transition-colors duration-300 group relative",
        "flex-1 flex items-center",
        "border-b border-border/40 last:border-b-0",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        isActive
          ? "bg-white text-foreground"
          : "bg-transparent text-muted-foreground hover:bg-muted/50"
      )}
      aria-selected={isActive}
      role="tab"
    >
      <span className="flex items-center gap-3">
        {/* Zielona kropka - widoczna tylko dla aktywnego taba */}
        <span
          className={cn(
            "w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300",
            isActive
              ? "bg-emerald-500 opacity-100"
              : "bg-transparent opacity-0"
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            "text-lg md:text-xl font-semibold leading-tight transition-colors duration-300",
            isActive
              ? "text-foreground"
              : "text-muted-foreground group-hover:text-foreground/70"
          )}
        >
          {feature.title}
        </span>
      </span>
    </button>
  );
}

function StackCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stackCards.length);
    }, 3000); // Zmiana co 3 sekundy

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[350px] flex items-center justify-center">
      <div className="relative w-full max-w-sm mx-auto h-[250px] flex items-center justify-center">
        {stackCards.map((card, index) => {
          // Obliczanie wizualnego indeksu
          const visualIndex = (index + activeIndex) % stackCards.length;

          // Konfiguracja layoutu
          const centerIndex = 2; // Środkowa karta
          const isCenter = visualIndex === centerIndex;
          const dist = Math.abs(visualIndex - centerIndex);

          const yOffset = (visualIndex - centerIndex) * 65;
          const scale = 1 - (dist * 0.1);
          const zIndex = 30 - (dist * 10);

          // Dynamiczne style w zależności od pozycji (isCenter)
          // Aktywna: gradient #F1F7FD (lewo) -> #D9F4E6 (prawo), ciemny tekst
          // Nieaktywna: biała (bg-white, ciemny tekst, delikatny border)
          const cardClasses = isCenter
            ? "text-gray-900 border-transparent"
            : "bg-white text-card-foreground border-border/40";

          // Style ikon też muszą się dopasować do tła karty
          // Na jasnym gradiencie: białe tło dla kontrastu i ciemna ikona
          const iconBgClass = isCenter
            ? "bg-white text-gray-900 shadow-sm"
            : "bg-muted text-muted-foreground";

          return (
            <Card
              key={index}
              className={`absolute w-full left-0 right-0 mx-auto transition-all duration-700 ease-in-out border shadow-xl ${cardClasses}`}
              style={{
                zIndex: zIndex,
                transform: `translateY(${yOffset}px) scale(${scale})`,
                maxWidth: '320px',
                background: isCenter ? 'linear-gradient(to right, #F1F7FD, #D9F4E6)' : undefined
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-700 ${iconBgClass}`}
                  >
                     {/* Ikony */}
                     {card.type === "company" ? (
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                     ) : (
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                     )}
                  </div>

                  <div className="flex-1 min-w-0 text-left h-[72px] flex flex-col justify-center">
                    <div className={`font-semibold truncate transition-all duration-700 ${isCenter ? 'text-lg' : 'text-base'}`}>
                      {card.name}
                    </div>
                    <div className={`truncate transition-all duration-700 ${isCenter ? 'text-base opacity-90' : 'text-sm text-muted-foreground'}`}>
                      {card.detail}
                    </div>
                    <div className={`text-xs truncate font-mono transition-all duration-700 h-4 ${isCenter ? 'opacity-75' : 'text-muted-foreground/70'}`}>
                      {card.contact || '\u00A0'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function FeatureContentPanel({ feature, activeIndex }: { feature: Feature; activeIndex: number }) {
  // "data you won't find on google" jest na indeksie 2 (trzecia zakładka)
  const isDataCardsFeature = activeIndex === 2;
  // "getting smarter with each search" jest na indeksie 3 (czwarta zakładka)
  const isFeedbackFeature = activeIndex === 3;

  return (
    <div className="h-full flex flex-col justify-start pt-10 md:pt-14 lg:pt-16 px-6 md:px-8 lg:px-10 pb-6 space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <p className="text-base md:text-lg text-foreground leading-relaxed max-w-lg">
          {feature.description}
        </p>
      </div>

      {/* Conditional rendering: Stack Cards for "data you won't find on google", Special embed for "getting smarter", Video for others */}
      {isDataCardsFeature ? (
        <StackCards />
      ) : isFeedbackFeature ? (
        <div className="w-full bg-black rounded-lg border border-border relative overflow-hidden">
          <div style={{ padding: '61.43% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/1153677926?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="feedback"
            />
          </div>
        </div>
      ) : (
        <div
          className="w-full aspect-video bg-black rounded-lg border border-border relative overflow-hidden group"
          role="img"
          aria-label={feature.mediaAlt}
        >
          <div className="absolute inset-0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <iframe
            src={feature.videoUrl}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 w-full h-full"
            title={feature.mediaAlt}
          />
        </div>
      )}
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
  const lastTabChangeTime = useRef(0);
  const isTransitioning = useRef(false);
  const pendingDirection = useRef<'up' | 'down' | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const handleTabClick = useCallback((index: number) => {
    if (isTransitioning.current) return;

    setActiveIndex(index);
    activeIndexRef.current = index;
    lastTabChangeTime.current = Date.now();
    isTransitioning.current = true;

    // Krótki cooldown po kliknięciu
    setTimeout(() => {
      isTransitioning.current = false;
    }, 300);
  }, []);

  useEffect(() => {
    // Sprawdź prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!containerRef.current) return;

    const container = containerRef.current;
    const COOLDOWN_MS = prefersReducedMotion ? 100 : 400; // Dłuższy cooldown dla płynności
    const HEADER_HEIGHT = 64; // 4rem = 64px

    const processTabChange = (direction: 'up' | 'down') => {
      const now = Date.now();
      const currentIndex = activeIndexRef.current;

      // Sprawdź cooldown
      if (now - lastTabChangeTime.current < COOLDOWN_MS) {
        return false;
      }

      if (isTransitioning.current) {
        return false;
      }

      let newIndex: number;

      if (direction === 'down') {
        if (currentIndex >= itemCount - 1) return false;
        newIndex = currentIndex + 1;
      } else {
        if (currentIndex <= 0) return false;
        newIndex = currentIndex - 1;
      }

      isTransitioning.current = true;
      lastTabChangeTime.current = now;

      setActiveIndex(newIndex);
      activeIndexRef.current = newIndex;

      // Reset transition flag po zakończeniu animacji
      setTimeout(() => {
        isTransitioning.current = false;
        pendingDirection.current = null;
      }, COOLDOWN_MS);

      return true;
    };

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();

      // Precyzyjniejsze sprawdzenie czy sticky jest aktywny
      // Sticky jest aktywny gdy górna krawędź kontenera dotknęła headera
      // i dolna krawędź jest poniżej dolnej krawędzi viewportu
      const stickyTop = HEADER_HEIGHT;
      const isStickyActive = rect.top <= stickyTop && rect.bottom > window.innerHeight;

      if (!isStickyActive) {
        return; // Normalny scroll
      }

      const currentIndex = activeIndexRef.current;
      const direction = e.deltaY > 0 ? 'down' : 'up';

      // Pozwól wyjść z sekcji na krawędziach
      if (currentIndex === itemCount - 1 && direction === 'down') {
        return;
      }

      if (currentIndex === 0 && direction === 'up') {
        return;
      }

      // Blokuj scroll wewnątrz sekcji
      e.preventDefault();
      e.stopPropagation();

      // Ignoruj bardzo małe delta (np. touchpad inertia na końcu)
      if (Math.abs(e.deltaY) < 5) {
        return;
      }

      // Użyj requestAnimationFrame dla płynności
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      pendingDirection.current = direction;

      rafId.current = requestAnimationFrame(() => {
        if (pendingDirection.current) {
          processTabChange(pendingDirection.current);
        }
        rafId.current = null;
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
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
      className={cn("relative bg-background z-10", useRevealClass(isVisible))}
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
        <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col z-10">
          {/* Header */}
          <div className="container mx-auto px-8 md:px-16 lg:px-24 py-4 md:py-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6">
              GridGPT is
            </h2>
          </div>

          {/* Main content area */}
          <div className="flex-1 w-full bg-background">
            <div className="container mx-auto px-4 md:px-8 lg:px-16 h-full">
              {/* Rounded container with border */}
              <div className="h-full rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Left Column: Navigation - szare tło */}
                  <div className="w-full lg:w-1/3 flex flex-col bg-muted/40">
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

                  {/* Right Column: Content - białe tło */}
                  <div className="w-full lg:w-2/3 bg-white text-foreground relative flex-1">
                    <FeatureContentPanel
                      key={activeIndex}
                      feature={activeFeature}
                      activeIndex={activeIndex}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
