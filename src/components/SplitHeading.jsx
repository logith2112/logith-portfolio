import { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * SplitHeading — splits a heading string into individual characters,
 * each getting a smooth scale + lift zoom on hover.
 *
 * Props:
 *   text      — string, the heading text
 *   as        — HTML tag: "h1" | "h2" | "h3" (default "h2")
 *   className — additional Tailwind/CSS classes for the wrapper element
 */
export default function SplitHeading({ text, as: Tag = "h2", className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const chars = containerRef.current?.querySelectorAll(".sh-char");
    if (!chars || chars.length === 0) return;

    const handlers = [];

    chars.forEach((char) => {
      const onEnter = () => {
        gsap.to(char, {
          scale: 1.18,
          y: -4,
          color: "#b5ff1a",
          duration: 0.32,
          ease: "power3.out",
          overwrite: true,
        });
      };

      const onLeave = () => {
        gsap.to(char, {
          scale: 1,
          y: 0,
          color: "", // revert to inherited color
          duration: 0.42,
          ease: "power3.out",
          overwrite: true,
        });
      };

      char.addEventListener("mouseenter", onEnter);
      char.addEventListener("mouseleave", onLeave);
      handlers.push({ char, onEnter, onLeave });
    });

    return () => {
      handlers.forEach(({ char, onEnter, onLeave }) => {
        char.removeEventListener("mouseenter", onEnter);
        char.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [text]);

  // Split into words; within each word split into characters.
  // Words are wrapped in inline-block so they never break mid-word.
  const renderChars = (str) => {
    return str.split(" ").map((word, wi) => (
      <span key={wi} className="inline-block whitespace-nowrap">
        {word.split("").map((char, ci) => (
          <span
            key={ci}
            className="sh-char inline-block cursor-default"
            style={{ willChange: "transform, color" }}
          >
            {char}
          </span>
        ))}
        {/* Re-add the space between words as a non-animating gap */}
        {wi < str.split(" ").length - 1 && (
          <span className="inline-block" style={{ minWidth: "0.28em" }}>&nbsp;</span>
        )}
      </span>
    ));
  };

  return (
    <Tag
      ref={containerRef}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", gap: "0 0.02em" }}
    >
      {renderChars(text)}
    </Tag>
  );
}
