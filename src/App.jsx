import { useState, useEffect, useRef } from "react";
import CustomCursor from "./components/CustomCursor";
import AmbientGlow from "./components/AmbientGlow";
import Loader from "./components/Loader";
import BackgroundGrid from "./components/BackgroundGrid";
import Navigation from "./components/Navigation";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Credentials from "./sections/Credentials";
import Contact from "./sections/Contact";
import useScrollReveal from "./hooks/useScrollReveal";

export default function App() {
  const [loading, setLoading] = useState(true);
  const progressBarRef = useRef(null);
  const tickingRef = useRef(false);

  // Hook for lightweight scroll-driven IntersectionObserver reveals
  useScrollReveal(!loading);

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
    // Run initial update
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <>
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5F1E8]">
          {/* Custom Cursor */}
          <CustomCursor />

          {/* Interactive Golden Ambient Glow (Mouse & Touch) */}
          <AmbientGlow />

          {/* Smooth Scroll Progress Indicator */}
          <div
            ref={progressBarRef}
            className="progress-line"
            style={{ width: "0%" }}
          />

          {/* Ambient Background Layout */}
          <BackgroundGrid />

          {/* Core Navigation */}
          <Navigation />

          {/* Grain texture overlay */}
          <div className="grain-overlay" />

          {/* Page content grids */}
          <main className="relative z-10 w-full">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Credentials />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}
