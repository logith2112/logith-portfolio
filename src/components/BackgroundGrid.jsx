import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BackgroundGrid() {
  const containerRef = useRef(null);

  useEffect(() => {
    const orbs = containerRef.current.querySelectorAll(".glow-orb");
    
    // Slow, drifting animation for ambient orbs
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        x: () => (Math.random() - 0.5) * 300,
        y: () => (Math.random() - 0.5) * 300,
        duration: 15 + i * 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Editorial grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.07] border-b border-cyber-border" />

      {/* Cyber glows */}
      <div
        className="glow-orb w-[600px] h-[600px] bg-cyber-lime/10 top-[-200px] left-[-200px]"
      />
      <div
        className="glow-orb w-[600px] h-[600px] bg-cyber-cyan/5 bottom-[-100px] right-[-100px]"
      />
      <div
        className="glow-orb w-[400px] h-[400px] bg-purple-500/5 top-[40%] left-[60%]"
      />
    </div>
  );
}
