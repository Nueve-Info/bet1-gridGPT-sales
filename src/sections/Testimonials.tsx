import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/content/landing";
import { useReveal, useRevealClass } from "@/hooks/useReveal";
import { User } from "lucide-react";

export function Testimonials() {
  const { ref, isVisible } = useReveal();
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  // Duplikujemy karty dla płynnej pętli
  const duplicatedItems = [...testimonials.items, ...testimonials.items];

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section
      ref={ref}
      className={`py-16 md:py-24 bg-muted/30 ${useRevealClass(isVisible)}`}
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <h2
          id="testimonials-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-12"
        >
          {testimonials.headline}
        </h2>

        {/* Testimonials Carousel - automatyczna karuzela */}
        <div className="relative overflow-hidden">
          <div className="testimonials-carousel">
            <div className="flex gap-4 animate-scroll">
              {duplicatedItems.map((testimonial, index) => {
                const isExpanded = expandedCards.has(index);
                // Sprawdzamy czy tekst jest dłuższy niż ~5 linii (około 250-300 znaków)
                const hasLongText = testimonial.quote.length > 250;
                
                return (
                  <Card
                    key={index}
                    className={`border-0 shadow-sm min-w-[260px] max-w-[260px] flex-shrink-0 flex flex-col ${
                      isExpanded ? '' : 'h-[212px]'
                    }`}
                  >
                    <CardContent className="p-5 flex flex-col h-full">
                      {/* Author - nad tekstem */}
                      <div className="mb-3 flex items-center gap-3 shrink-0">
                        {/* Avatar Icon */}
                        <div
                          className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center bg-muted"
                          role="img"
                          aria-label={`${testimonial.author}'s avatar`}
                        >
                          <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {testimonial.author}
                          </div>
                          {testimonial.role && testimonial.company && (
                            <div className="text-xs text-muted-foreground">
                              {testimonial.role}, {testimonial.company}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quote */}
                      <div className="relative flex-1">
                        <blockquote
                          onClick={() => hasLongText && toggleCard(index)}
                          className={`text-sm text-muted-foreground leading-relaxed whitespace-pre-line ${
                            hasLongText ? 'cursor-pointer' : ''
                          }`}
                          style={{
                            maxHeight: isExpanded ? 'none' : '120px',
                            minHeight: isExpanded ? 'auto' : '120px',
                            height: isExpanded ? 'auto' : '120px',
                            overflow: isExpanded ? 'visible' : 'hidden',
                            transition: 'max-height 0.3s ease-out, min-height 0.3s ease-out, height 0.3s ease-out',
                          }}
                        >
                          {testimonial.quote}
                        </blockquote>
                        {hasLongText && !isExpanded && (
                          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card via-card/95 to-transparent pointer-events-none" />
                        )}
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
