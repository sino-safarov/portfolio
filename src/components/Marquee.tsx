"use client";

import { useReducedMotion } from "framer-motion";
import styles from "./Marquee.module.css";

const ITEMS = [
  "100k+ Orders Analyzed",
  "PostgreSQL",
  "Python",
  "scikit-learn",
  "pandas",
  "Data Analytics",
  "Prague",
  "Open to Internships",
  "SQL",
  "Machine Learning",
];

// 3 repetitions per strip ensures density at any viewport width
const REPEATED = Array.from({ length: 3 }, () => ITEMS).flat();

function Strip({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center whitespace-nowrap"
      aria-hidden={hidden || undefined}
    >
      {REPEATED.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="text-caption uppercase tracking-widest text-text-secondary">
            {item}
          </span>
          <span className="mx-2 text-accent">·</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const reduced = useReducedMotion() ?? false;

  return (
    <div
      aria-label="Skills and highlights"
      className="h-6 w-full overflow-hidden border-y border-border bg-surface"
    >
      <div
        className={`${styles.track} flex h-full items-center`}
        style={{ animationPlayState: reduced ? "paused" : "running" }}
      >
        <Strip />
        <Strip hidden />
      </div>
    </div>
  );
}
