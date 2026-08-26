import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function BackgroundGrid() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    const orbs = containerRef.current.querySelectorAll(".glow-orb");
    
    // Slow, drifting animation for ambient orbs
    orbs.forEach((orb, i) => {
      // Don't animate more than 2 orbs on mobile to preserve resources
      if (window.innerWidth < 768 && i >= 2) return;

      gsap.to(orb, {
        x: () => (Math.random() - 0.5) * (window.innerWidth < 768 ? 100 : 300),
        y: () => (Math.random() - 0.5) * (window.innerWidth < 768 ? 100 : 300),
        duration: 15 + i * 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Editorial grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.07] border-b border-cyber-border" />

      {/* Cyber glows */}
      <div
        className={`glow-orb bg-cyber-lime/10 top-[-200px] left-[-200px] will-change-transform ${
          isMobile ? "w-[300px] h-[300px] blur-[80px]" : "w-[600px] h-[600px] blur-[120px]"
        }`}
      />
      <div
        className={`glow-orb bg-cyber-cyan/5 bottom-[-100px] right-[-100px] will-change-transform ${
          isMobile ? "w-[300px] h-[300px] blur-[80px]" : "w-[600px] h-[600px] blur-[120px]"
        }`}
      />
      
      {/* Hide third orb completely on mobile */}
      {!isMobile && (
        <div
          className="glow-orb w-[400px] h-[400px] bg-purple-500/5 top-[40%] left-[60%] will-change-transform blur-[120px]"
        />
      )}
    </div>
  );
}
