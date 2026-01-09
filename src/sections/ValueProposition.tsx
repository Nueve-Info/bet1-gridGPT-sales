import { Card, CardContent } from "@/components/ui/card";
import { valueProposition } from "@/content/landing";
import { useReveal, useRevealClass } from "@/hooks/useReveal";

export function ValueProposition() {
  const { ref, isVisible } = useReveal();

  // Karty w formie stosu zgodnie z wireframe
  const stackCards = [
    {
      type: "contact",
      name: "Contact name",
      detail: "Job Title - Company",
      contact: "contact@example.com",
      bgColor: "bg-muted/60",
      textColor: "text-foreground",
    },
    {
      type: "contact",
      name: "John Snow",
      detail: "CFO - OpenAI",
      contact: "+48 123 456 789",
      bgColor: "bg-muted/60",
      textColor: "text-foreground",
    },
    {
      type: "company",
      name: "Company name",
      detail: "$28M revenue 2025",
      bgColor: "bg-foreground",
      textColor: "text-background",
      isHighlighted: true,
    },
    {
      type: "contact",
      name: "Mark Spenser",
      detail: "Lufthansa",
      contact: "m.sps@lhs.com",
      bgColor: "bg-muted/60",
      textColor: "text-foreground",
    },
    {
      type: "contact",
      name: "Jesus Christ",
      detail: "Linked Profile",
      bgColor: "bg-muted",
      textColor: "text-foreground",
    },
    {
      type: "company",
      name: "Company name",
      detail: "$28M revenue 2025",
      bgColor: "bg-muted",
      textColor: "text-foreground",
    },
  ];

  return (
    <section
      ref={ref}
      className={`py-16 md:py-24 bg-white ${useRevealClass(isVisible)}`}
      aria-labelledby="value-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
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
          <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
            <div className="relative w-full max-w-sm mx-auto">
              {stackCards.map((card, index) => {
                // Pozycjonowanie kart z równomiernymi odstępami między środkami kart
                const cardSpacing = 40; // Jednakowy odstęp między środkami kart
                
                // Obliczanie pozycji względem środka kontenera z równomiernymi odstępami
                // Środkowa karta (index 2) jest na środku, pozostałe są równomiernie rozmieszczone
                const centerIndex = 2; // Indeks środkowej karty
                
                const zIndex = card.isHighlighted ? 30 : 20 - Math.abs(index - centerIndex); // Środkowa karta na wierzchu, im dalej tym niżej
                const scale = card.isHighlighted ? 1.05 : 1;
                const translateX = card.isHighlighted ? "0px" : `${(index - centerIndex) * 2}px`; // Lekkie przesunięcie w poziomie
                
                const offsetFromCenter = (index - centerIndex) * cardSpacing;
                
                return (
                  <Card
                    key={index}
                    className={`absolute w-full ${card.bgColor} ${card.textColor} border-0 shadow-lg transition-all duration-300 hover:z-50`}
                    style={{
                      top: `50%`,
                      zIndex: zIndex,
                      transform: `translateX(${translateX}) translateY(calc(${offsetFromCenter}px - 50%)) scale(${scale})`,
                    }}
                  >
                  {card.name !== "Mark Spenser" && (
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded ${
                            card.type === "company"
                              ? "bg-muted-foreground/20"
                              : "bg-muted-foreground/20"
                          } flex items-center justify-center flex-shrink-0`}
                        >
                          {card.type === "company" ? (
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`font-semibold ${
                              card.isHighlighted ? "text-xl" : "text-base"
                            } mb-1`}
                          >
                            {card.name}
                          </div>
                          <div
                            className={`${
                              card.isHighlighted ? "text-lg" : "text-sm"
                            } opacity-90`}
                          >
                            {card.detail}
                          </div>
                          {card.contact && (
                            <div className="text-sm opacity-75 mt-1">
                              {card.contact}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  )}
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
