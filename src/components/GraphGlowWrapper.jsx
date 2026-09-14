import { useEffect, useRef } from "react";

/**
 * GraphGlowWrapper
 * 
 * Separates the Graph Content from the Decorative Golden Glow Layer.
 * Architecture:
 * .graph-container (relative, overflow hidden)
 *   ├── .graph-content (relative, z-index 1, opacity 1, visibility visible, display block)
 *   │      └── children (canvas / chart / SVG)
 *   └── .graph-glow (absolute, z-index 2, pointer-events none, filter blur 22px)
 * 
 * Features:
 * - Graph content is guaranteed 100% visible and untouched
 * - Zero transforms applied to the graph or container
 * - Soft champagne-gold alpha radial gradient with filter blur(22px)
 * - Safe alpha blending: NO mix-blend-mode to avoid WebKit/Safari compositing bugs
 * - Smooth lerp (0.15) tracking via requestAnimationFrame
 * - Pointer events support: mouse, touch, pen
 * - Mobile touch blooms and tracks smoothly, fading out on release (0.4s)
 * - Zero preventDefault: 100% smooth scrolling, swiping, clicking
 * - Respects prefers-reduced-motion
 */
export default function GraphGlowWrapper({ children, className = "" }) {
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    // Accessibility check
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      glow.style.display = "none";
      return;
    }

    // Responsive radius: ~260px diameter desktop / ~200px diameter mobile
    const updateSize = () => {
      const isMobile = window.innerWidth < 768;
      const radius = isMobile ? "100px" : "135px";
      glow.style.setProperty("--glow-radius", radius);
    };
    updateSize();
    window.addEventListener("resize", updateSize, { passive: true });

    // Target vs Current coordinates (in percentages)
    const target = { x: 50, y: 50 };
    const current = { x: 50, y: 50 };
    let isTracking = false;
    let rafId = null;
    let touchFadeTimer = null;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      // Smooth interpolation at 0.15 factor
      current.x = lerp(current.x, target.x, 0.15);
      current.y = lerp(current.y, target.y, 0.15);

      const posX = `${current.x.toFixed(2)}%`;
      const posY = `${current.y.toFixed(2)}%`;

      glow.style.setProperty("--touch-x", posX);
      glow.style.setProperty("--touch-y", posY);
      glow.style.setProperty("--mouse-x", posX);
      glow.style.setProperty("--mouse-y", posY);

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    // Calculate relative coordinates in percentage
    const updatePointerCoords = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const rawX = clientX - rect.left;
      const rawY = clientY - rect.top;

      const pctX = Math.max(0, Math.min(100, (rawX / rect.width) * 100));
      const pctY = Math.max(0, Math.min(100, (rawY / rect.height) * 100));

      if (!isTracking) {
        // Snap immediately on entry to avoid flying in from afar
        current.x = pctX;
        current.y = pctY;
        isTracking = true;
      }

      target.x = pctX;
      target.y = pctY;
    };

    const showGlow = () => {
      glow.style.opacity = "1";
    };

    const hideGlow = () => {
      isTracking = false;
      glow.style.opacity = "0";
    };

    const handlePointerEnter = (e) => {
      updatePointerCoords(e.clientX, e.clientY);
      showGlow();
    };

    const handlePointerMove = (e) => {
      updatePointerCoords(e.clientX, e.clientY);
      showGlow();
    };

    const handlePointerLeave = () => {
      hideGlow();
    };

    const handlePointerDown = (e) => {
      if (touchFadeTimer) clearTimeout(touchFadeTimer);
      updatePointerCoords(e.clientX, e.clientY);
      showGlow();
    };

    const handlePointerUp = (e) => {
      if (e.pointerType === "touch") {
        if (touchFadeTimer) clearTimeout(touchFadeTimer);
        touchFadeTimer = setTimeout(() => {
          hideGlow();
        }, 400);
      }
    };

    // Capture phase listeners ensure coordinates are received even if child elements consume events
    container.addEventListener("pointerenter", handlePointerEnter, { capture: true, passive: true });
    container.addEventListener("pointermove", handlePointerMove, { capture: true, passive: true });
    container.addEventListener("pointerleave", handlePointerLeave, { capture: true, passive: true });
    container.addEventListener("pointerdown", handlePointerDown, { capture: true, passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener("resize", updateSize);
      if (rafId) cancelAnimationFrame(rafId);
      if (touchFadeTimer) clearTimeout(touchFadeTimer);

      container.removeEventListener("pointerenter", handlePointerEnter, { capture: true });
      container.removeEventListener("pointermove", handlePointerMove, { capture: true });
      container.removeEventListener("pointerleave", handlePointerLeave, { capture: true });
      container.removeEventListener("pointerdown", handlePointerDown, { capture: true });
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`graph-container relative overflow-hidden rounded-lg w-full ${className}`}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* 1. Underlying Graph Content Layer - ALWAYS 100% visible, untouched, z-index: 1 */}
      <div
        className="graph-content w-full h-full relative"
        style={{
          position: "relative",
          zIndex: 1,
          opacity: 1,
          visibility: "visible",
          display: "block",
        }}
      >
        {children}
      </div>

      {/* 2. Separate Decorative Golden Glow Layer - z-index: 2, pointer-events: none */}
      <div
        ref={glowRef}
        className="graph-glow pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
          opacity: 0,
          background: `radial-gradient(
            circle var(--glow-radius, 135px) at var(--touch-x, var(--mouse-x, 50%)) var(--touch-y, var(--mouse-y, 50%)),
            rgba(229, 199, 107, 0.20) 0%,
            rgba(201, 162, 39, 0.11) 25%,
            rgba(201, 162, 39, 0.04) 48%,
            transparent 75%
          )`,
          filter: "blur(22px)",
          transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
