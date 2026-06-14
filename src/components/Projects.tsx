"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ProjectStatus = "live" | "wip" | "soon";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  status: ProjectStatus;
}

const PROJECTS: Project[] = [
  {
    title: "E-Commerce Sales Analysis",
    description:
      "SQL analysis of 100k+ real orders from the Brazilian Olist dataset. Uncovered that Beauty & Health leads revenue at $1.26M, while Watches & Gifts has the highest average order value.",
    tags: ["PostgreSQL", "SQL", "Data Analysis"],
    link: "https://github.com/sino-safarov/ecommerce-sql-analysis",
    status: "live",
  },
  {
    title: "Customer Churn Prediction",
    description:
      "ML model to predict customer churn using classification algorithms. Feature engineering, model selection, and evaluation with precision/recall tradeoffs.",
    tags: ["Python", "scikit-learn", "pandas"],
    status: "wip",
  },
  {
    title: "Prague Rental Market EDA",
    description:
      "Exploratory analysis of Prague rental listings. Price distribution by district, correlation between flat size and price, seasonal trends.",
    tags: ["Python", "pandas", "Matplotlib"],
    status: "soon",
  },
];

const STATUS_LABELS: Record<"wip" | "soon", { text: string; colorClass: string }> = {
  wip:  { text: "In Progress", colorClass: "text-accent" },
  soon: { text: "Coming Soon", colorClass: "text-text-secondary" },
};

function ProjectCard({ project, reduced, isFeatured }: { project: Project; reduced: boolean; isFeatured: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isDimmed = project.status !== "live";
  const badge = project.status !== "live" ? STATUS_LABELS[project.status] : null;

  const cardVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 30 },
    visible: {
      opacity: isDimmed ? 0.7 : 1,
      y: 0,
      transition: { duration: reduced ? 0.1 : 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex flex-col rounded-lg border"
      style={{
        padding: 28,
        background: "#ede8df",
        borderColor: hovered ? "rgba(26,92,58,0.35)" : "var(--color-border)",
        borderTop: isFeatured ? "2px solid var(--color-accent)" : undefined,
        boxShadow: hovered ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
    >
      {badge && (
        <span
          className={`mb-1 text-caption font-medium uppercase ${badge.colorClass}`}
          style={{ letterSpacing: "0.08em" }}
        >
          {badge.text}
        </span>
      )}

      <h3 className="mb-2 text-subheading font-semibold text-text-primary">
        {project.title}
      </h3>

      <p className="flex-1 text-body leading-relaxed text-text-secondary">
        {project.description}
      </p>

      {isFeatured && (
        <>
          {/* Separator above metrics */}
          <div className="mt-3 mb-3 border-t border-border" />

          {/* Metrics row */}
          <div className="flex" style={{ gap: 12 }}>
            {[
              { value: "100k+",  line1: "Orders",       line2: "Analyzed" },
              { value: "95%+",   line1: "Delivery",     line2: "Rate"     },
              { value: "$1.26M", line1: "Top Category", line2: "Revenue"  },
            ].map(({ value, line1, line2 }) => (
              <div key={value} className="flex flex-1 flex-col">
                <span className="font-bold leading-none text-accent" style={{ fontSize: "1.5rem" }}>
                  {value}
                </span>
                <span
                  className="text-caption text-text-secondary"
                  style={{ marginTop: 4 }}
                >
                  {line1}
                </span>
                <span className="text-caption text-text-secondary">
                  {line2}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded text-caption text-accent"
            style={{
              padding: "4px 10px",
              background: "rgba(26,92,58,0.07)",
              border: "1px solid rgba(26,92,58,0.15)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-caption text-accent"
          style={{
            fontWeight: 500,
            textDecoration: "underline",
            textUnderlineOffset: 3,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          View on GitHub →
        </a>
      )}
    </motion.article>
  );
}

export default function Projects() {
  const reduced = useReducedMotion() ?? false;

  const headingVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.1 : 0.5, ease: "easeOut" as const },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : 0.15 },
    },
  };

  return (
    <section
      id="projects"
      className="mx-auto w-full px-4 py-16"
      style={{ maxWidth: 1100 }}
    >
      <motion.h2
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-8 text-heading font-semibold text-text-primary"
      >
        Projects
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-3 md:grid-cols-3"
      >
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.title} project={project} reduced={reduced} isFeatured={index === 0} />
        ))}
      </motion.div>
    </section>
  );
}
