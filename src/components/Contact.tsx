"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Contact() {
  const reduced = useReducedMotion() ?? false;
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText("sinosafarov555@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.1 : 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <>
      {/* Signature element: full-width hairline above section */}
      <div style={{ width: "100%", height: 1, background: "var(--color-border)" }} />

      <section
        id="contact"
        className="mx-auto w-full px-4 py-16"
        style={{ maxWidth: 640 }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <motion.p
            variants={itemVariants}
            className="mb-2 text-caption uppercase text-accent"
            style={{ letterSpacing: "0.08em" }}
          >
            Contact
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="mb-3 text-heading font-semibold text-text-primary"
          >
            Let&apos;s work together.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mb-8 text-body text-text-secondary"
            style={{ maxWidth: 480, lineHeight: 1.7 }}
          >
            I&apos;m open to internship opportunities at data teams in Prague.
            Feel free to reach out.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center"
            style={{ gap: 16 }}
          >
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-md font-semibold"
              style={{
                padding: "12px 24px",
                minWidth: "280px",
                color: "#f5f0e8",
                background: "#1a5c3a",
              }}
            >
              <span aria-hidden="true">{copied ? "✓" : "✉"}</span>
              {copied ? "Copied!" : "sinosafarov555@gmail.com"}
            </button>

            <a
              href="https://linkedin.com/in/sino-safarov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-border font-semibold text-text-secondary hover:border-accent"
              style={{ padding: "12px 24px", transition: "border-color 0.15s" }}
            >
              <span aria-hidden="true">↗</span>
              LinkedIn
            </a>

            <a
              href="https://github.com/sino-safarov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-border font-semibold text-text-secondary hover:border-accent"
              style={{ padding: "12px 24px", transition: "border-color 0.15s" }}
            >
              <span aria-hidden="true">↗</span>
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
