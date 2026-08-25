import { useState, useEffect } from "react";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";
import BackgroundGrid from "./components/BackgroundGrid";
import Navigation from "./components/Navigation";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Credentials from "./sections/Credentials";
import Contact from "./sections/Contact";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <div className="relative min-h-screen bg-[#090A0C] text-[#e2e8f0]">
          {/* Custom Cursor */}
          <CustomCursor />

          {/* Smooth Scroll Progress Indicator */}
          <div
            className="progress-line"
            style={{ width: `${scrollProgress}%` }}
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
