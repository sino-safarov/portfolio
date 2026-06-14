"use client";

import { motion, useReducedMotion } from "framer-motion";

const SKILLS = [
  "Python",      "pandas",
  "SQL",         "PostgreSQL",
  "scikit-learn","NumPy",
  "Matplotlib",  "Power BI",
];

export default function About() {
  const reduced = useReducedMotion() ?? false;

  const leftVariants = {
    hidden: { opacity: 0, x: reduced ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reduced ? 0.1 : 0.6, ease: "easeOut" as const },
    },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reduced ? 0.1 : 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="about"
      className="relative mx-auto w-full overflow-hidden px-4 py-16"
      style={{ maxWidth: 1100, background: "var(--color-bg-about)" }}
    >
      <div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">

        {/* Left — Bio (60%) */}
        <motion.div
          variants={leftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="md:col-span-3"
        >
          <p
            className="mb-2 text-caption uppercase text-accent"
            style={{ letterSpacing: "0.08em" }}
          >
            About
          </p>

          {/* Signature element: vertical accent line beside heading */}
          <div className="mb-4 flex items-center gap-2">
            <div className="shrink-0 bg-accent" style={{ width: 2, height: 48, opacity: 0.8 }} />
            <h2 className="text-heading font-semibold text-text-primary">
              Turning data into decisions.
            </h2>
          </div>

          <p
            className="mb-3 text-body text-text-secondary"
            style={{ lineHeight: 1.7 }}
          >
            I&apos;m Sino — an aspiring data analyst based in Prague. This autumn
            I&apos;m starting a Master&apos;s in Applied Data Analytics &amp; AI at
            VŠE Praha (Faculty of Informatics and Statistics).
          </p>
          <p className="text-body text-text-secondary" style={{ lineHeight: 1.7 }}>
            My focus is on the full analytics workflow: from writing complex SQL
            queries and cleaning messy datasets to building ML models and
            communicating findings clearly. I&apos;m looking for internship
            opportunities at Prague-based data teams.
          </p>
        </motion.div>

        {/* Right — Stack (40%) */}
        <motion.div
          variants={rightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="md:col-span-2"
        >
          <p
            className="mb-2 text-caption uppercase text-accent"
            style={{ letterSpacing: "0.08em" }}
          >
            Stack
          </p>

          <div className="grid grid-cols-2" style={{ gap: 12 }}>
            {SKILLS.map((skill) => (
              <div
                key={skill}
                className="flex items-center text-body text-text-primary"
              >
                <span className="mr-1 text-accent">—</span>
                {skill}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
      </div>
    </section>
  );
}
