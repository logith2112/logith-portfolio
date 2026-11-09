import { useState, useEffect, useRef, lazy, Suspense } from "react";
import AmbientGlow from "./components/AmbientGlow";
import Loader from "./components/Loader";
import BackgroundGrid from "./components/BackgroundGrid";
import Navigation from "./components/Navigation";
import CustomCursor from "./components/CustomCursor";
import CommandPalette from "./components/CommandPalette";
import BookingModal from "./components/BookingModal";
import Footer from "./components/Footer";
import Home from "./sections/Home";
import Work from "./sections/Work";
import Process from "./sections/Process";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Lab from "./sections/Lab";
import Credentials from "./sections/Credentials";
import Contact from "./sections/Contact";
import useScrollReveal from "./hooks/useScrollReveal";

// Lazy-load the 3D Robot Assistant for optimal initial page load performance
const RobotAssistant = lazy(() => import("./components/RobotAssistant"));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const progressBarRef = useRef(null);
  const tickingRef = useRef(false);

  // Hook for lightweight scroll-driven IntersectionObserver reveals
  useScrollReveal(!loading);

  // Smooth scroll progress bar
  useEffect(() => {
    if (loading) return;

    const updateProgressBar = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0 && progressBarRef.current) {
        const progress = (window.scrollY / totalScroll) * 100;
        progressBarRef.current.style.width = `${progress}%`;
      }
      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(updateProgressBar);
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  // Handle direct hash navigation after loader completes (e.g. /#lab, /#work, /#about)
  useEffect(() => {
    if (!loading && window.location.hash) {
      const targetId = window.location.hash.slice(1);
      const el = document.getElementById(targetId);
      if (el) {
        const html = document.documentElement;
        const hadSmooth = html.classList.contains("scroll-smooth");
        if (hadSmooth) html.classList.remove("scroll-smooth");
        
        el.scrollIntoView({ block: "start" });

        if (hadSmooth) {
          requestAnimationFrame(() => {
            html.classList.add("scroll-smooth");
          });
        }
      }
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <div className="relative min-h-screen bg-[#080808] text-[#F5F2EA]">
          {/* Luxury Custom Golden Cursor (Desktop fine pointers) */}
          <CustomCursor />

          {/* Interactive Soft Borderless Golden Ambient Glow (Mouse & Touch) */}
          <AmbientGlow />

          {/* Smooth Scroll Progress Indicator */}
          <div
            ref={progressBarRef}
            className="progress-line"
            style={{ width: "0%" }}
          />

          {/* Ambient Background Layout */}
          <BackgroundGrid />

          {/* Core Navigation with Exact Requested Labels */}
          <Navigation onOpenBooking={() => setIsBookingOpen(true)} />

          {/* Quick Command Palette (Cmd+K / Ctrl+K) */}
          <CommandPalette onOpenBooking={() => setIsBookingOpen(true)} />

          {/* Grain texture overlay */}
          <div className="grain-overlay" />

          {/* Main Portfolio Sections */}
          <main className="relative z-10 w-full">
            {/* Phase 3: Home Section */}
            <Home onOpenBooking={() => setIsBookingOpen(true)} />

            {/* Phase 4: Work Section */}
            <Work />

            {/* Phase 5: Process Section */}
            <Process />

            {/* Phase 6: Who are we? Section */}
            <About />

            {/* Preserved Feature: Technical Toolkit */}
            <Skills />

            {/* Preserved Feature: Interactive Lab (Sentiment, IoT, Skill Map) */}
            <Lab />

            {/* Preserved Feature: Verified Credentials & Certifications */}
            <Credentials />

            {/* Phase 7: Contact Section */}
            <Contact onOpenBooking={() => setIsBookingOpen(true)} />
          </main>

          {/* Editorial Footer */}
          <Footer onOpenBooking={() => setIsBookingOpen(true)} />

          {/* Phase 8: Book a Call Modal */}
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
          />

          {/* Premium Interactive 3D Robot Assistant (Champagne Gold Three.js) */}
          <Suspense fallback={null}>
            <RobotAssistant onOpenBooking={() => setIsBookingOpen(true)} />
          </Suspense>
        </div>
      )}
    </>
  );
}
