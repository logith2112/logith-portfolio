import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const mainCursorRef = useRef(null);
  const secondaryCursorRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on desktops
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    document.documentElement.classList.add("custom-cursor-enabled");
    setVisible(true);

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Fast main cursor dot
      gsap.to(mainCursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // Slower lagging ring
      gsap.to(secondaryCursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    // Event delegation for hover states
    const onMouseOver = (e) => {
      const target = e.target.closest("a, button, [role='button'], input, textarea, select, .interactive-hover");
      if (target) {
        setHovered(true);
        // Subtle magnetic suction effect on hover target
        if (target.classList.contains("magnetic-btn")) {
          const rect = target.getBoundingClientRect();
          const relX = e.clientX - rect.left - rect.width / 2;
          const relY = e.clientY - rect.top - rect.height / 2;
          gsap.to(target, {
            x: relX * 0.3,
            y: relY * 0.3,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }
    };

    const onMouseOut = (e) => {
      const target = e.target.closest("a, button, [role='button'], input, textarea, select, .interactive-hover");
      if (target) {
        setHovered(false);
        if (target.classList.contains("magnetic-btn")) {
          gsap.to(target, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Tiny solid dot cursor */}
      <div
        ref={mainCursorRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-cyber-lime rounded-full pointer-events-none z-[99999] mix-blend-difference transition-transform duration-200 ${
          clicked ? "scale-50" : "scale-100"
        }`}
      />
      {/* Outer tracking ring */}
      <div
        ref={secondaryCursorRef}
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border border-cyber-lime/40 rounded-full pointer-events-none z-[99998] transition-transform duration-300 ${
          hovered ? "scale-150 bg-cyber-lime/10 border-cyber-lime" : "scale-100"
        } ${clicked ? "scale-75 border-cyber-lime" : ""}`}
      />
    </>
  );
}
