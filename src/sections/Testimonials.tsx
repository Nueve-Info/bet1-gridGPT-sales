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
      className={`relative w-full py-24 md:py-32 bg-muted/30 z-0 ${useRevealClass(isVisible)}`}
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16 w-full overflow-x-hidden">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            id="testimonials-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-4"
          >
            {testimonials.headline}
          </h2>
          {testimonials.description && (
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              {testimonials.description}
            </p>
          )}
        </div>

        {/* Testimonials Carousel - automatyczna karuzela */}
        <div className="relative overflow-hidden">
          <div className="testimonials-carousel">
            <div className="flex gap-6 animate-scroll">
              {duplicatedItems.map((testimonial, index) => {
                const isExpanded = expandedCards.has(index);
                // Sprawdzamy czy tekst jest dłuższy niż ~5 linii (około 250-300 znaków)
                const hasLongText = testimonial.quote.length > 250;
                
                return (
                  <Card
                    key={index}
                    className={`shadow-sm min-w-[320px] max-w-[320px] flex-shrink-0 flex flex-col ${
                      isExpanded ? '' : 'h-[280px]'
                    }`}
                  >
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Author - nad tekstem */}
                      <div className="mb-4 flex items-center gap-3 shrink-0">
                        {/* Avatar Icon */}
                        <div
                          className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-r from-[#F1F7FD] to-[#D9F4E6]"
                          role="img"
                          aria-label={`${testimonial.author}'s avatar`}
                        >
                          <User className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-base">
                            {testimonial.author}
                          </div>
                          {testimonial.role && testimonial.company && (
                            <div className="text-sm text-muted-foreground">
                              {testimonial.role}, {testimonial.company}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quote */}
                      <div className="relative flex-1">
                        <blockquote
                          onClick={() => hasLongText && toggleCard(index)}
                          className={`text-base text-muted-foreground leading-relaxed whitespace-pre-line ${
                            hasLongText ? 'cursor-pointer' : ''
                          }`}
                          style={{
                            maxHeight: isExpanded ? 'none' : '160px',
                            minHeight: isExpanded ? 'auto' : '160px',
                            height: isExpanded ? 'auto' : '160px',
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
