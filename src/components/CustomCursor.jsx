import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const mainCursorRef = useRef(null);
  const secondaryCursorRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on desktops with a pointing device (mouse/trackpad)
    const isDesktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    if (!isDesktop) return;

    document.documentElement.classList.add("custom-cursor-enabled");
    setVisible(true);

    let xToMain, yToMain, xToSec, yToSec;

    // Use a small timeout to make sure references are mounted
    const timer = setTimeout(() => {
      if (!mainCursorRef.current || !secondaryCursorRef.current) return;
      
      xToMain = gsap.quickTo(mainCursorRef.current, "x", { duration: 0.16, ease: "power3.out" });
      yToMain = gsap.quickTo(mainCursorRef.current, "y", { duration: 0.16, ease: "power3.out" });
      xToSec = gsap.quickTo(secondaryCursorRef.current, "x", { duration: 0.42, ease: "power3.out" });
      yToSec = gsap.quickTo(secondaryCursorRef.current, "y", { duration: 0.42, ease: "power3.out" });
    }, 50);

    const onMouseMove = (e) => {
      if (xToMain && yToMain && xToSec && yToSec) {
        xToMain(e.clientX);
        yToMain(e.clientY);
        xToSec(e.clientX);
        yToSec(e.clientY);
      }
    };

    // Direct DOM manipulation instead of React state updates to prevent re-renders
    const onMouseDown = () => {
      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = "scale(0.5)";
      }
      if (secondaryCursorRef.current) {
        secondaryCursorRef.current.style.transform = "scale(0.75)";
        secondaryCursorRef.current.style.borderColor = "#b5ff1a";
      }
    };

    const onMouseUp = () => {
      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = "scale(1)";
      }
      if (secondaryCursorRef.current) {
        secondaryCursorRef.current.style.transform = "scale(1)";
        secondaryCursorRef.current.style.borderColor = "rgba(181, 255, 26, 0.4)";
      }
    };

    const onMouseOver = (e) => {
      const target = e.target.closest("a, button, [role='button'], input, textarea, select, .interactive-hover");
      if (target) {
        if (secondaryCursorRef.current) {
          secondaryCursorRef.current.style.transform = "scale(1.5)";
          secondaryCursorRef.current.style.backgroundColor = "rgba(181, 255, 26, 0.1)";
          secondaryCursorRef.current.style.borderColor = "#b5ff1a";
        }
        // Subtle magnetic suction effect on hover target
        if (target.classList.contains("magnetic-btn")) {
          const rect = target.getBoundingClientRect();
          const relX = e.clientX - rect.left - rect.width / 2;
          const relY = e.clientY - rect.top - rect.height / 2;
          gsap.to(target, {
            x: relX * 0.3,
            y: relY * 0.3,
            duration: 0.35,
            ease: "power3.out",
          });
        }
      }
    };

    const onMouseOut = (e) => {
      const target = e.target.closest("a, button, [role='button'], input, textarea, select, .interactive-hover");
      if (target) {
        if (secondaryCursorRef.current) {
          secondaryCursorRef.current.style.transform = "scale(1)";
          secondaryCursorRef.current.style.backgroundColor = "transparent";
          secondaryCursorRef.current.style.borderColor = "rgba(181, 255, 26, 0.4)";
        }
        if (target.classList.contains("magnetic-btn")) {
          gsap.to(target, {
            x: 0,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
          });
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    return () => {
      clearTimeout(timer);
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
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-cyber-lime rounded-full pointer-events-none z-[99999] mix-blend-difference transition-transform duration-100 ease-out origin-center"
      />
      {/* Outer tracking ring */}
      <div
        ref={secondaryCursorRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border border-cyber-lime/40 rounded-full pointer-events-none z-[99998] transition-transform duration-200 ease-out origin-center"
      />
    </>
  );
}
