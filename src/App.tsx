import {
  Header,
  Hero,
  ValueProposition,
  SaveHours,
  Pipeline,
  GridGptFeatures,
  Testimonials,
  FinalCta,
  Faq,
  Footer,
} from "@/sections";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <ValueProposition />
        <SaveHours />
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

export default App;
