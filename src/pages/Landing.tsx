import {
  Header,
  Hero,
  ValueProposition,
  Pipeline,
  GridGptFeatures,
  Testimonials,
  FinalCta,
  Faq,
  Footer,
} from "@/sections";

export function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <ValueProposition />
        <Pipeline />
        <GridGptFeatures />
        <Testimonials />
        <FinalCta />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
