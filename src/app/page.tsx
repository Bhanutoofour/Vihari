import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Experience from "@/components/home/Experience";
import StaysPricing from "@/components/home/StaysPricing";
import Retreats from "@/components/home/Retreats";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <main className="bg-white overflow-x-hidden">
      <Hero />
      <About />
      <Experience />
      <StaysPricing />
      <Retreats />
      <ContactCTA />
    </main>
  );
}
