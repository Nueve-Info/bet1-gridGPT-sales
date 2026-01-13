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
                  
                  <div className="flex-1 min-w-0 text-left">
                    <div className={`font-semibold mb-1 truncate transition-all duration-700 ${isCenter ? 'text-lg' : 'text-base'}`}>
                      {card.name}
                    </div>
                    <div className={`truncate transition-all duration-700 ${isCenter ? 'text-base opacity-90' : 'text-sm text-muted-foreground'}`}>
                      {card.detail}
                    </div>
                    {card.contact && (
                      <div className={`text-xs mt-2 truncate font-mono transition-all duration-700 ${isCenter ? 'opacity-75' : 'text-muted-foreground/70'}`}>
                        {card.contact}
                      </div>
                    )}
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
    <div className="h-full flex flex-col justify-center p-6 md:p-8 lg:p-10 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <p className="text-base md:text-lg text-white leading-relaxed max-w-lg">
          {feature.description}
        </p>
      </div>

      {/* Conditional rendering: Stack Cards for "data you won't find on google", Special embed for "getting smarter", Video for others */}
      {isDataCardsFeature ? (
        <StackCards />
      ) : isFeedbackFeature ? (
        <div className="w-full bg-black rounded-lg border border-white/10 relative overflow-hidden">
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
          className="w-full aspect-video bg-black rounded-lg border border-white/10 relative overflow-hidden group"
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
          <div className="container mx-auto px-6 md:px-12 lg:px-16 py-4 md:py-6">
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
                    activeIndex={activeIndex}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
