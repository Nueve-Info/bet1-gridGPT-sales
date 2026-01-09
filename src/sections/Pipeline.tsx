import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pipeline } from "@/content/landing";
import { useReveal, useRevealClass } from "@/hooks/useReveal";

export function Pipeline() {
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref}
      className={`py-16 md:py-24 bg-muted/30 ${useRevealClass(isVisible)}`}
      aria-labelledby="pipeline-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2
            id="pipeline-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
          >
            {pipeline.headline}
          </h2>
        </div>

        {/* Pipeline Columns */}
        <div className="grid gap-6 md:grid-cols-3">
          {pipeline.columns.map((column, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">{column.title}</CardTitle>
                <CardDescription>{column.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items List */}
                <ul className="space-y-2">
                  {column.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Highlight Badge (if exists) */}
                {column.highlight && (
                  <Badge variant="secondary" className="mt-4">
                    {column.highlight}
                  </Badge>
                )}

                {/* Placeholder for visual */}
                <div
                  className="aspect-[4/3] w-full rounded-md bg-muted mt-4"
                  role="img"
                  aria-label={`${column.title} visualization`}
                >
                  <div className="h-full flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">
                      Visual placeholder
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
