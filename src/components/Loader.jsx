import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Prevent scrolling during load
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete();
      }
    });

    // 1. Animate drawing of monogram border and characters
    tl.fromTo(
      pathRef.current,
      { strokeDasharray: 500, strokeDashoffset: 500 },
      { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }
    );

    // 2. Staggered fade in text logo details
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.6"
    );

    // 3. Immersive transition out
    tl.to(containerRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.4,
    });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#090A0C] z-[99999] flex flex-col items-center justify-center select-none"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      <div className="relative flex flex-col items-center gap-4">
        {/* SVG Monogram Box */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          className="w-24 h-24 sm:w-28 sm:h-28"
        >
          {/* Animated border path */}
          <rect
            ref={pathRef}
            x="5"
            y="5"
            width="90"
            height="90"
            rx="16"
            fill="none"
            stroke="#b5ff1a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Static Monogram letters */}
          <text
            x="50%"
            y="68%"
            textAnchor="middle"
            fill="#e2e8f0"
            fontSize="48"
            fontWeight="bold"
            fontFamily="sans-serif"
            className="tracking-tighter"
          >
            LI
          </text>
        </svg>

        {/* Supporting branding */}
        <div ref={textRef} className="text-center">
          <div className="text-[10px] sm:text-xs tracking-[0.4em] text-cyber-lime font-display font-medium uppercase">
            LOGITH T
          </div>
          <div className="text-[8px] sm:text-[10px] tracking-[0.2em] text-[#6b6f7a] font-sans mt-1">
            AI / ML ENGINEERING
          </div>
        </div>
      </div>

      {/* Aesthetic grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-10 pointer-events-none" />
    </div>
  );
}
