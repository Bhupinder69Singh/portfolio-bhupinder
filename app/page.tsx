import Hero from "@/components/Hero";
import About from "@/components/About";
import BentoGrid from "@/components/BentoGrid";
import Projects from "@/components/Projects";
import EarlyProjects from "@/components/EarlyProjects";
import CareerJourney from "@/components/CareerJourney";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen page-mesh">
      <Hero />
      <About />
      <BentoGrid />
      <CareerJourney />
      <Projects />
      <EarlyProjects />
      <Footer />
    </main>
  );
}
