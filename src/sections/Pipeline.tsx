import { pipeline } from "@/content/landing";
import { useReveal, useRevealClass } from "@/hooks/useReveal";

export function Pipeline() {
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref}
      className={`py-16 md:py-24 bg-background ${useRevealClass(isVisible)}`}
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

        {/* Video */}
        <div className="w-full">
          <div
            className="w-full rounded-lg bg-muted overflow-hidden"
            role="img"
            aria-label="Video"
          >
            <div style={{ padding: "42.02% 0 0 0", position: "relative" }}>
              <iframe
                src="https://player.vimeo.com/video/1153677560?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-2px",
                  width: "calc(100% + 2px)",
                  height: "100%",
                }}
                title="process"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
