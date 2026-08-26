import SequenceScroll from "@/components/SequenceScroll";
import About from "@/components/About";
import Bento from "@/components/Bento";
import PromoPoints from "@/components/PromoPoints";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import HashScrollHandler from "@/components/HashScrollHandler";

export default function Home() {
  return (
    <main className="relative bg-spill-blue">
      <HashScrollHandler />

      {/* Hero: sticky canvas scrollytelling, 400vh scroll runway */}
      <SequenceScroll />

      {/*
        Everything below is pulled up by -mt-[100vh] so it slides in and
        closes over the hero's sticky canvas as soon as the 400vh runway
        finishes. relative z-10 keeps it above the sticky hero.
      */}
      <div className="relative z-10 -mt-[100vh]">
        <About />
        <Bento />
        <PromoPoints / >
        <Stats />
        <Testimonials />
        <FAQ />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
