import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import StaysPricing from "@/components/StaysPricing";
import Retreats from "@/components/Retreats";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <StaysPricing />
      <Retreats />
      <ContactCTA />
      <Footer />
    </main>
  );
}
