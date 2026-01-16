import { Card, CardContent } from "@/components/ui/card";
import { valueProposition } from "@/content/landing";
import { useReveal, useRevealClass } from "@/hooks/useReveal";
import { useEffect, useState } from "react";

// Komponenty ikon/logów dla różnych kart
const GlobalSystemsLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#4F46E5"/>
    <path d="M6 8h12v2H6V8zm0 3h12v2H6v-2zm0 3h8v2H6v-2z" fill="white"/>
    <circle cx="18" cy="6" r="1.5" fill="white"/>
  </svg>
);

const StripeLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#635BFF"/>
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" fill="white"/>
  </svg>
);

const NextGenDataLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#10B981"/>
    <path d="M7 6h10v2H7V6zm0 4h10v2H7v-2zm0 4h10v2H7v-2zm-2 4h14v2H5v-2z" fill="white"/>
    <circle cx="4" cy="4" r="1.5" fill="white"/>
    <circle cx="20" cy="4" r="1.5" fill="white"/>
  </svg>
);

const OpenAILogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#10A37F"/>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const UserLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#6366F1"/>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="white"/>
  </svg>
);

// Karty w formie stosu zgodnie z wireframe
// Usunięto statyczne kolory, będą nadawane dynamicznie na podstawie pozycji
const stackCards = [
  {
    type: "company",
    name: "Global Systems Inc.",
    detail: "$28M revenue 2025",
    icon: "global-systems",
  },
  {
    type: "contact",
    name: "Mark Spenser",
    detail: "m.sps@lhs.com",
    icon: "user",
  },
  {
    type: "contact",
    name: "David Kim",
    detail: "Head of Growth - Stripe",
    contact: "d.kim@stripe.com • LinkedIn",
    icon: "stripe",
  },
  {
    type: "company",
    name: "NextGen Data",
    detail: "Market Leader 2024",
    icon: "nextgen",
  },
  {
    type: "contact",
    name: "John Snow",
    detail: "CFO - OpenAI",
    contact: "+1 415 555 0192",
    icon: "openai",
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
                           {card.icon === "global-systems" ? (
                             <GlobalSystemsLogo />
                           ) : card.icon === "stripe" ? (
                             <StripeLogo />
                           ) : card.icon === "nextgen" ? (
                             <NextGenDataLogo />
                           ) : card.icon === "openai" ? (
                             <OpenAILogo />
                           ) : card.icon === "user" ? (
                             <UserLogo />
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
