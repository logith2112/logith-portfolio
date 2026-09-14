import { useEffect, useRef } from "react";

/**
 * AmbientGlow
 * 
 * A soft, luxurious golden light source that smoothly follows the cursor (desktop)
 * and touch gestures (mobile) across the entire portfolio website.
 * 
 * Features:
 * - Champagne Gold (#C9A227) & Luminous Highlight Gold (#E5C76B) tones
 * - Fluid lerp smoothing (target vs current interpolation) via requestAnimationFrame
 * - GPU-accelerated translate3d transforms (zero layout thrashing)
 * - Full desktop mouse tracking + graceful fade-in/fade-out
 * - Full mobile touch tracking with passive listeners (zero scroll interference)
 * - Viewport-fixed non-blocking layer (pointer-events: none)
 * - Respects prefers-reduced-motion accessibility preference
 */
export default function AmbientGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    // Respect user accessibility preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      if (glowRef.current) {
        glowRef.current.style.display = "none";
      }
      return;
    }

    const glow = glowRef.current;
    if (!glow) return;

    // Responsive glow sizing: 300px on desktop, 200px on mobile
    let isMobile = window.innerWidth < 768;
    let size = isMobile ? 200 : 300;
    let halfSize = size / 2;

    const updateDimensions = () => {
      isMobile = window.innerWidth < 768;
      size = isMobile ? 200 : 300;
      halfSize = size / 2;
      if (glow) {
        glow.style.width = `${size}px`;
        glow.style.height = `${size}px`;
        glow.style.marginLeft = `-${halfSize}px`;
        glow.style.marginTop = `-${halfSize}px`;
      }
    };
    updateDimensions();

    // Coordinate state
    const target = { x: -500, y: -500 };
    const current = { x: -500, y: -500 };

    // Fluid smoothing factor (0.12 gives natural, luxurious floating trail)
    const LERP_FACTOR = isMobile ? 0.16 : 0.12;

    let rafId = null;
    let isVisible = false;
    let touchFadeTimeout = null;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    // GPU-accelerated animation loop
    const animate = () => {
      current.x = lerp(current.x, target.x, LERP_FACTOR);
      current.y = lerp(current.y, target.y, LERP_FACTOR);

      if (glow) {
        glow.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    // Show glow helper
    const showGlow = () => {
      if (!isVisible) {
        isVisible = true;
        if (glow) glow.style.opacity = isMobile ? "0.14" : "0.18";
      }
    };

    // Hide glow helper
    const hideGlow = () => {
      if (isVisible) {
        isVisible = false;
        if (glow) glow.style.opacity = "0";
      }
    };

    // 1. Desktop Mouse Movement
    const onMouseMove = (e) => {
      // If entering for the first time from off-screen, snap initial current pos to prevent flying across screen
      if (target.x === -500 && target.y === -500) {
        current.x = e.clientX;
        current.y = e.clientY;
      }
      target.x = e.clientX;
      target.y = e.clientY;
      showGlow();
    };

    // Cursor leaves the browser window
    const onMouseLeave = () => {
      hideGlow();
    };

    // Cursor returns to the window
    const onMouseEnter = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      showGlow();
    };

    // 2. Mobile Touch Interactions (passive, non-blocking)
    const onTouchStart = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      if (touchFadeTimeout) clearTimeout(touchFadeTimeout);

      const touch = e.touches[0];
      // Instant snap on touch down so light blooms directly under finger
      current.x = touch.clientX;
      current.y = touch.clientY;
      target.x = touch.clientX;
      target.y = touch.clientY;
      showGlow();
    };

    const onTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      if (touchFadeTimeout) clearTimeout(touchFadeTimeout);

      const touch = e.touches[0];
      target.x = touch.clientX;
      target.y = touch.clientY;
      showGlow();
    };

    const onTouchEnd = () => {
      // Smoothly fade out approximately 450ms after touch concludes
      if (touchFadeTimeout) clearTimeout(touchFadeTimeout);
      touchFadeTimeout = setTimeout(() => {
        hideGlow();
      }, 450);
    };

    // Attach listeners
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("resize", updateDimensions, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (touchFadeTimeout) clearTimeout(touchFadeTimeout);

      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);

      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 25,
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "300px",
          height: "300px",
          marginLeft: "-150px",
          marginTop: "-150px",
          borderRadius: "50%",
          pointerEvents: "none",
          background:
            "radial-gradient(circle, rgba(229, 199, 107, 0.18) 0%, rgba(201, 162, 39, 0.10) 25%, rgba(201, 162, 39, 0.04) 45%, transparent 70%)",
          filter: "blur(36px)",
          willChange: "transform, opacity",
          opacity: 0,
          transition: "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}
