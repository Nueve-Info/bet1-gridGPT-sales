import { Card, CardContent } from "@/components/ui/card";
import { valueProposition } from "@/content/landing";
import { useReveal, useRevealClass } from "@/hooks/useReveal";
import { useEffect, useState } from "react";

// Karty w formie stosu zgodnie z wireframe
// Usunięto statyczne kolory, będą nadawane dynamicznie na podstawie pozycji
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

export function ValueProposition() {
  const { ref, isVisible } = useReveal();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stackCards.length);
    }, 3000); // Zmiana co 3 sekundy

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className={`py-24 md:py-32 bg-white ${useRevealClass(isVisible)}`}
      aria-labelledby="value-heading"
    >
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <h2
              id="value-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
            >
              {valueProposition.headline}
            </h2>
            <p className="text-muted-foreground md:text-lg">
              {valueProposition.description}
            </p>
          </div>

          {/* Right Column - Stack Cards */}
          <div className="relative h-[500px] flex items-center justify-center">
            <div className="relative w-full max-w-md mx-auto h-[400px] flex items-center justify-center">
              {stackCards.map((card, index) => {
                // Obliczanie wizualnego indeksu
                const visualIndex = (index + activeIndex) % stackCards.length;
                
                // Konfiguracja layoutu
                const centerIndex = 2; // Środkowa karta
                const isCenter = visualIndex === centerIndex;
                const dist = Math.abs(visualIndex - centerIndex);
                
                const yOffset = (visualIndex - centerIndex) * 90; 
                const scale = 1 - (dist * 0.1);
                const zIndex = 30 - (dist * 10);
                
                // Opacity: aktywna 100%, pozostałe nieco mniej
                const opacity = isCenter ? 1 : Math.max(0.0, 0.6 - ((dist - 1) * 0.3));

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
                      opacity: opacity,
                      maxWidth: '450px',
                      background: isCenter ? 'linear-gradient(to right, #F1F7FD, #D9F4E6)' : undefined
                    }}
                  >
                    <CardContent className="p-8">
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
        </div>
      </div>
    </section>
  );
}
