"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimate,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

const SVG_H = 24;

const BARS = [
  { x: 0,  normalH: SVG_H * 0.40, hoverH: SVG_H * 0.90 },
  { x: 7,  normalH: SVG_H * 0.70, hoverH: SVG_H * 0.50 },
  { x: 14, normalH: SVG_H * 0.55, hoverH: SVG_H * 0.80 },
  { x: 21, normalH: SVG_H * 0.90, hoverH: SVG_H * 0.40 },
  { x: 28, normalH: SVG_H * 0.65, hoverH: SVG_H * 0.75 },
];

const LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const reduced = useReducedMotion() ?? false;
  const [scope, animateEl] = useAnimate();
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Entrance: slide down from y:-64, fade in
  useEffect(() => {
    if (reduced || !scope.current) return;
    animateEl(
      scope.current,
      { y: [-64, 0], opacity: [0, 1] },
      { duration: 0.4, ease: "easeOut" as const },
    );
  }, [reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll hide (down) / show (up)
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (reduced || !scope.current) return;
    const prev = lastScrollY.current;
    if (latest > prev && latest > 80) {
      animateEl(scope.current, { y: -80 }, { type: "spring" as const, stiffness: 400, damping: 30 });
    } else if (latest < prev) {
      animateEl(scope.current, { y: 0 }, { type: "spring" as const, stiffness: 400, damping: 30 });
    }
    lastScrollY.current = latest;
  });

  function handleAnchor(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header
      ref={scope}
      className="fixed inset-x-0 top-0 z-50 flex h-8 items-center justify-between border-b border-border px-3 sm:px-6"
      style={{
        backdropFilter: "blur(12px)",
        background: "rgba(245,240,232,0.88)",
        opacity: reduced ? 1 : 0,
        boxShadow: "0 1px 0 rgba(26,92,58,0.08), 0 4px 16px rgba(0,0,0,0.04)",
      }}
    >
      {/* Animated bar chart logo — scrolls to top on click */}
      <motion.div
        className="cursor-pointer"
        initial={reduced ? "visible" : "hidden"}
        animate="visible"
        whileHover={reduced ? undefined : "hover"}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <svg
          width={32}
          height={SVG_H}
          viewBox={`0 0 32 ${SVG_H}`}
          aria-hidden="true"
        >
          {BARS.map((bar, i) => (
            <motion.rect
              key={bar.x}
              x={bar.x}
              width={4}
              rx={2}
              fill="var(--color-accent)"
              variants={{
                hidden: {
                  height: 0,
                  y: SVG_H,
                },
                visible: {
                  height: bar.normalH,
                  y: SVG_H - bar.normalH,
                  transition: {
                    duration: 0.4,
                    delay: reduced ? 0 : i * 0.08,
                    ease: "easeOut" as const,
                  },
                },
                hover: {
                  height: bar.hoverH,
                  y: SVG_H - bar.hoverH,
                  transition: { duration: 0.25, ease: "easeOut" as const },
                },
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Desktop nav links */}
      <nav className="hidden items-center gap-4 sm:flex">
        {LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleAnchor(e, href)}
            className="no-underline text-caption uppercase text-text-secondary transition-colors duration-200 hover:text-text-primary"
            style={{ letterSpacing: "0.08em" }}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Mobile: placeholder text */}
      <span
        className="text-caption uppercase text-text-secondary sm:hidden"
        style={{ letterSpacing: "0.08em" }}
      >
        Menu
      </span>
    </header>
  );
}
