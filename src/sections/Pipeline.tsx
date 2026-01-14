import { pipeline } from "@/content/landing";
import { useReveal, useRevealClass } from "@/hooks/useReveal";
import Lottie from "lottie-react";
import animationData from "../../assets/sales-process.json";

export function Pipeline() {
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref}
      className={`py-16 md:py-24 bg-background ${useRevealClass(isVisible)}`}
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
        </div>

        {/* Lottie Animation */}
        <div className="w-full">
          <div
            className="w-full overflow-hidden"
            role="img"
            aria-label="Sales data process animation"
          >
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
