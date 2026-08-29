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

  // Split into characters, preserving spaces as non-breaking
  const renderChars = (str) => {
    return str.split("").map((char, i) => (
      <span
        key={i}
        className="sh-char inline-block cursor-default select-none"
        style={{
          display: "inline-block",
          willChange: "transform, color",
          // Spaces need a small explicit width so they don't collapse
          minWidth: char === " " ? "0.25em" : undefined,
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <Tag
      ref={containerRef}
      className={className}
      style={{ display: "block" }}
    >
      {renderChars(text)}
    </Tag>
  );
}
