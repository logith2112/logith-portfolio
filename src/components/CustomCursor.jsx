import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only on desktop with a real pointer (mouse/trackpad)
    const isDesktop = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)"
    ).matches;
    if (!isDesktop) return;

    document.documentElement.classList.add("custom-cursor-enabled");
    setVisible(true);

    // Target mouse position (updated instantly on every move)
    const mouse = { x: -100, y: -100 };

    // Current rendered positions (lerped smoothly every frame)
    const dot = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };

    // Lerp factors — lower = smoother/more trailing
    const DOT_LERP = 0.28;   // dot follows closely but not instantly
    const RING_LERP = 0.10;  // ring trails softly behind

    let rafId;
    let isHovering = false;

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      // Smoothly interpolate positions each frame
      dot.x = lerp(dot.x, mouse.x, DOT_LERP);
      dot.y = lerp(dot.y, mouse.y, DOT_LERP);
      ring.x = lerp(ring.x, mouse.x, RING_LERP);
      ring.y = lerp(ring.y, mouse.y, RING_LERP);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseDown = () => {
      if (dotRef.current) {
        dotRef.current.style.opacity = "0.6";
        dotRef.current.style.scale = "0.5";
      }
      if (ringRef.current) {
        ringRef.current.style.borderColor = "#b5ff1a";
        ringRef.current.style.scale = "0.85";
      }
    };

    const onMouseUp = () => {
      if (dotRef.current) {
        dotRef.current.style.opacity = "1";
        dotRef.current.style.scale = "1";
      }
      if (ringRef.current) {
        ringRef.current.style.borderColor = "rgba(181, 255, 26, 0.35)";
        ringRef.current.style.scale = "1";
      }
    };

    const onMouseEnterLink = (e) => {
      const target = e.target.closest(
        "a, button, [role='button'], input, textarea, select, .interactive-hover"
      );
      if (!target) return;
      isHovering = true;

      if (ringRef.current) {
        ringRef.current.style.scale = "1.7";
        ringRef.current.style.backgroundColor = "rgba(181, 255, 26, 0.06)";
        ringRef.current.style.borderColor = "rgba(181, 255, 26, 0.5)";
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = "0.5";
      }

      // Magnetic pull on magnetic-btn elements
      if (target.classList.contains("magnetic-btn")) {
        const rect = target.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        gsap.to(target, {
          x: relX * 0.25,
          y: relY * 0.25,
          duration: 0.35,
          ease: "power3.out",
          overwrite: true,
        });
      }
    };

    const onMouseLeaveLink = (e) => {
      const target = e.target.closest(
        "a, button, [role='button'], input, textarea, select, .interactive-hover"
      );
      if (!target) return;
      isHovering = false;

      if (ringRef.current) {
        ringRef.current.style.scale = "1";
        ringRef.current.style.backgroundColor = "transparent";
        ringRef.current.style.borderColor = "rgba(181, 255, 26, 0.35)";
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = "1";
      }

      if (target.classList.contains("magnetic-btn")) {
        gsap.to(target, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
          overwrite: true,
        });
      }
    };

    // Hide ring when leaving the window
    const onMouseLeaveWindow = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onMouseEnterWindow = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseover", onMouseEnterLink, { passive: true });
    document.addEventListener("mouseout", onMouseLeaveLink, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeaveWindow);
    document.documentElement.addEventListener("mouseenter", onMouseEnterWindow);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseEnterLink);
      document.removeEventListener("mouseout", onMouseLeaveLink);
      document.documentElement.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.documentElement.removeEventListener("mouseenter", onMouseEnterWindow);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Dot — small, crisp, close follow */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "7px",
          height: "7px",
          marginLeft: "-3.5px",
          marginTop: "-3.5px",
          background: "#b5ff1a",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
          transition: "opacity 0.3s ease, scale 0.2s ease",
          mixBlendMode: "difference",
        }}
      />
      {/* Ring — larger, softer trail */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          marginLeft: "-18px",
          marginTop: "-18px",
          border: "1px solid rgba(181, 255, 26, 0.35)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
          transition:
            "scale 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease, background-color 0.35s ease, border-color 0.35s ease",
        }}
      />
    </>
  );
}
