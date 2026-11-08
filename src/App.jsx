import { useState, useEffect, useRef, lazy, Suspense } from "react";
import AmbientGlow from "./components/AmbientGlow";
import Loader from "./components/Loader";
import BackgroundGrid from "./components/BackgroundGrid";
import Navigation from "./components/Navigation";
import CustomCursor from "./components/CustomCursor";
import CommandPalette from "./components/CommandPalette";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Lab from "./sections/Lab";
import Credentials from "./sections/Credentials";
import Contact from "./sections/Contact";
import useScrollReveal from "./hooks/useScrollReveal";

// Lazy-load the 3D Robot Assistant for optimal initial page load performance
const RobotAssistant = lazy(() => import("./components/RobotAssistant"));

export default function App() {
  const [loading, setLoading] = useState(true);
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

  // Handle direct hash navigation after loader completes (e.g. /#lab, /#projects)
  useEffect(() => {
    if (!loading && window.location.hash) {
      const targetId = window.location.hash.slice(1);
      const el = document.getElementById(targetId);
      if (el) {
        // Instant alignment on initial landing by temporarily removing scroll-smooth
        const html = document.documentElement;
        const hadSmooth = html.classList.contains("scroll-smooth");
        if (hadSmooth) html.classList.remove("scroll-smooth");
        
        el.scrollIntoView({ block: "start" });

        // Restore smooth scrolling for user clicks on next frame
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
        <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5F1E8]">
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

          {/* Core Floating Pill Navigation */}
          <Navigation />

          {/* Quick Command Palette (Cmd+K / Ctrl+K) */}
          <CommandPalette />

          {/* Grain texture overlay */}
          <div className="grain-overlay" />

          {/* Main Portfolio Sections */}
          <main className="relative z-10 w-full">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Lab />
            <Credentials />
            <Contact />
          </main>

          {/* Premium Interactive 3D Robot Assistant (Lazy-loaded) */}
          <Suspense fallback={null}>
            <RobotAssistant />
          </Suspense>
        </div>
      )}
    </>
  );
}
