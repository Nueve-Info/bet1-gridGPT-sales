import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/content/landing";
import { useReveal, useRevealClass } from "@/hooks/useReveal";

export function Testimonials() {
  const { ref, isVisible } = useReveal();

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

        {/* Testimonials Carousel - horizontal scroll on mobile */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-5">
            {testimonials.items.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-sm min-w-[280px] snap-center md:min-w-0 flex-shrink-0"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Quote */}
                  <blockquote className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </blockquote>

                  {/* Author */}
                  <div className="mt-6 flex items-center gap-3">
                    {/* Avatar Placeholder */}
                    <div
                      className="w-10 h-10 rounded-full bg-muted shrink-0"
                      role="img"
                      aria-label={`${testimonial.author}'s avatar`}
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {testimonial.author}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
