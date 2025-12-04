import { Hero } from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { CEO } from "@/components/CEO";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { BlackFridayBanner } from "@/components/BlackFridayBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <BlackFridayBanner />
      <Hero />
      <VideoSection />
      <Features />
      <Testimonials />
      <CEO />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
