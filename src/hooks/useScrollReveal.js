import { useEffect } from "react";

/**
 * useScrollReveal — High-performance scroll reveal using IntersectionObserver.
 * 
 * Automatically detects elements matching:
 *  - .reveal, .reveal-up
 *  - .reveal-left
 *  - .reveal-right
 *  - .stagger-container
 *  - .stagger-item
 * 
 * Adds the 'active' class when they enter the viewport and unobserves them
 * immediately so no ongoing scroll listeners or loops run.
 */
export default function useScrollReveal(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const selector =
      ".reveal, .reveal-up, .reveal-left, .reveal-right, .stagger-container, .stagger-item";

    // If reduced motion is preferred or IntersectionObserver not supported, activate everything immediately
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add("active");
      });
      return;
    }

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          if (entry.target.classList.contains("stagger-container")) {
            entry.target.querySelectorAll(".stagger-item").forEach((child) => {
              child.classList.add("active");
            });
          }
          // Unobserve once active to keep performance 60fps
          observer.unobserve(entry.target);
        }
      });
    };

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const observer = new IntersectionObserver(observerCallback, {
      threshold: isMobile ? 0.05 : 0.12,
      rootMargin: isMobile ? "0px 0px -20px 0px" : "0px 0px -40px 0px",
    });

    const observeElements = () => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        // Only observe if not already active
        if (!el.classList.contains("active")) {
          observer.observe(el);
        }
      });
    };

    // Initial pass with requestAnimationFrame to ensure DOM is painted
    const rafId = requestAnimationFrame(() => {
      observeElements();
    });

    // Fallback timer in case content finishes mounting slightly after
    const timerId = setTimeout(() => {
      observeElements();
    }, 150);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      observer.disconnect();
    };
  }, [enabled]);
}
