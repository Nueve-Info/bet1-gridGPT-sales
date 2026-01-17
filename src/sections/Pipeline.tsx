import { pipeline } from "@/content/landing";
import { useReveal, useRevealClass } from "@/hooks/useReveal";
import { useEffect } from "react";

export function Pipeline() {
  const { ref, isVisible } = useReveal();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`pt-16 md:pt-24 pb-32 md:pb-48 bg-background ${useRevealClass(isVisible)}`}
      aria-labelledby="pipeline-heading"
    >
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2
            id="pipeline-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
          >
            {pipeline.headline}
          </h2>
          <p className="text-muted-foreground text-lg">
            Billion records scanned live to give you direct access to decision makers.
          </p>
        </div>

        {/* Vimeo Video */}
        <div className="w-full">
          <div
            className="w-full overflow-hidden"
            role="img"
            aria-label="Sales data process animation"
          >
            <div style={{ padding: "32.4% 0 0 0", position: "relative" }}>
              <iframe
                src="https://player.vimeo.com/video/1155567982?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                title="sales-table-process"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
