import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/content/landing";
import { track } from "@/lib/analytics";
import { useReveal, useRevealClass } from "@/hooks/useReveal";

export function Faq() {
  const { ref, isVisible } = useReveal();

  const handleToggle = (question: string) => {
    track("faq:toggle", { question });
  };

  return (
    <section
      ref={ref}
      className={`py-16 md:py-24 bg-muted/30 ${useRevealClass(isVisible)}`}
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <h2
            id="faq-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-8 text-center"
          >
            {faq.headline}
          </h2>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faq.items.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger
                  data-analytics={`faq:toggle_${index}`}
                  onClick={() => handleToggle(item.question)}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
