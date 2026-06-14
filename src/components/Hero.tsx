"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

// ── Typewriter ────────────────────────────────────────────────────────────────

const ROLES = ["Data Analyst", "SQL Developer", "ML Enthusiast", "Data Storyteller"];

function useTypewriter(reduced: boolean) {
  const [displayText, setDisplayText] = useState(reduced ? ROLES[0] : "");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      const role = ROLES[roleIndex];
      if (!isDeleting) {
        charIndex++;
        setDisplayText(role.slice(0, charIndex));
        if (charIndex === role.length) {
          isDeleting = true;
          timeoutId = setTimeout(tick, 1800);
        } else {
          timeoutId = setTimeout(tick, 80);
        }
      } else {
        charIndex--;
        setDisplayText(role.slice(0, charIndex));
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
          timeoutId = setTimeout(tick, 80);
        } else {
          timeoutId = setTimeout(tick, 40);
        }
      }
    }

    timeoutId = setTimeout(tick, 80);
    return () => clearTimeout(timeoutId);
  }, [reduced]);

  return { displayText, cursorVisible: reduced ? false : cursorVisible };
}

// ── Stagger variant helper ────────────────────────────────────────────────────

function item(delay: number, reduced: boolean) {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.1 : 0.5, delay, ease: "easeOut" as const },
    },
  };
}

// ── Particle canvas ───────────────────────────────────────────────────────────

const CANVAS_W = 420;
const CANVAS_H = 480;
const PARTICLE_COUNT = 45;
const LINE_DIST = 90;

function useParticleCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  reduced: boolean,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_W * dpr;
    canvas.height = CANVAS_H * dpr;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    // Assign to typed const so closures below see CanvasRenderingContext2D (not nullable)
    const ctx: CanvasRenderingContext2D = maybeCtx;
    ctx.scale(dpr, dpr);

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * CANVAS_W,
      y: Math.random() * CANVAS_H,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
    }));

    function drawFrame() {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DIST) {
            const alpha = ((1 - dist / LINE_DIST) * 0.4).toFixed(3);
            ctx.strokeStyle = `rgba(26,92,58,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = "rgba(26,92,58,0.45)";
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (reduced) {
      drawFrame();
      return;
    }

    let animId: number;

    function animate() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > CANVAS_W) p.vx *= -1;
        if (p.y < 0 || p.y > CANVAS_H) p.vy *= -1;
      }
      drawFrame();
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [canvasRef, reduced]);
}

// ── SQL typer ─────────────────────────────────────────────────────────────────

type SqlLine = { text: string; color: string };

const SQL_LINES: SqlLine[] = [
  { text: "-- Revenue by category",    color: "#6b6560" },
  { text: "SELECT",                     color: "#6ee7b7" },
  { text: "  category,",               color: "#9FE1CB" },
  { text: "  SUM(price) AS revenue",   color: "#9FE1CB" },
  { text: "FROM orders o",             color: "#6ee7b7" },
  { text: "JOIN products p",           color: "#6ee7b7" },
  { text: "  ON o.product_id = p.id",  color: "#9FE1CB" },
  { text: "GROUP BY category",         color: "#6ee7b7" },
  { text: "ORDER BY revenue DESC;",    color: "#6ee7b7" },
];

function useSQLTyper(reduced: boolean) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  const done = lineIdx >= SQL_LINES.length;

  // Cursor blink — static when reduced
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(id);
  }, [reduced]);

  // Typing state machine
  useEffect(() => {
    if (reduced || done) return;
    const line = SQL_LINES[lineIdx];
    if (charIdx < line.text.length) {
      const id = setTimeout(() => setCharIdx((c) => c + 1), 80);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, 400);
    return () => clearTimeout(id);
  }, [reduced, done, lineIdx, charIdx]);

  const displayLines: (SqlLine & { displayed: string })[] = reduced
    ? SQL_LINES.map((l) => ({ ...l, displayed: l.text }))
    : [
        ...SQL_LINES.slice(0, lineIdx).map((l) => ({ ...l, displayed: l.text })),
        ...(done ? [] : [{ ...SQL_LINES[lineIdx], displayed: SQL_LINES[lineIdx].text.slice(0, charIdx) }]),
      ];

  return { displayLines, cursorVisible };
}

// ── SQL Terminal overlay ──────────────────────────────────────────────────────

function SQLTerminal({ reduced }: { reduced: boolean }) {
  const { displayLines, cursorVisible } = useSQLTyper(reduced);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 360,
        background: "rgba(20,20,20,0.90)",
        border: "1px solid rgba(26,92,58,0.35)",
        borderRadius: 8,
        padding: "20px 24px",
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: "#6b6560",
          letterSpacing: "0.08em",
          marginBottom: 10,
          fontFamily: "'Courier New', monospace",
        }}
      >
        analysis.sql
      </div>

      <div
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 14,
          lineHeight: 1.7,
        }}
      >
        {displayLines.map((line, i) => (
          <div key={i} style={{ color: line.color }}>
            {line.displayed}
            {i === displayLines.length - 1 && (
              <span style={{ color: "#1a5c3a", opacity: cursorVisible ? 1 : 0 }}>
                █
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero() {
  const reduced = useReducedMotion() ?? false;
  const { displayText, cursorVisible } = useTypewriter(reduced);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef, reduced);

  return (
    <section className="flex min-h-screen items-center gap-8 px-4 lg:px-6">

      {/* ── Left column ── */}
      <div style={{ flex: "0 0 auto", maxWidth: 560, textAlign: "center" }}>

        <motion.span
          variants={item(0, reduced)}
          initial="hidden"
          animate="visible"
          className="mb-4 inline-block text-caption uppercase tracking-widest text-accent"
          style={{
            border: "1px solid rgba(26,92,58,0.2)",
            background: "rgba(26,92,58,0.07)",
            padding: "6px 14px",
            borderRadius: "100px",
          }}
        >
          Available for internships · Prague
        </motion.span>

        <motion.div
          variants={item(0.1, reduced)}
          initial="hidden"
          animate="visible"
          className="mb-2 bg-accent"
          style={{ width: 32, height: 2, margin: "0 auto" }}
        />

        <motion.h1
          variants={item(0.2, reduced)}
          initial="hidden"
          animate="visible"
          className="font-bold leading-tight"
          style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
        >
          <div>
            <span
              className="block"
              style={{ color: "var(--color-text-primary)", fontWeight: 700 }}
            >
              Sino
            </span>
            <span
              className="block"
              style={{
                WebkitTextStroke: "1px var(--color-text-primary)",
                color: "transparent",
              }}
            >
              Safarov
            </span>
          </div>
        </motion.h1>

        <motion.p
          variants={item(0.3, reduced)}
          initial="hidden"
          animate="visible"
          className="mt-2 mb-3 text-subheading font-medium text-accent"
        >
          {displayText}
          <span aria-hidden="true" style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
        </motion.p>

        <motion.p
          variants={item(0.4, reduced)}
          initial="hidden"
          animate="visible"
          className="text-subheading text-text-secondary"
          style={{ maxWidth: 520, margin: "0 auto 32px" }}
        >
          Turning messy data into clear decisions.
          <br />
          Incoming MS student in Applied Data Analytics &amp; AI at VŠE Praha.
        </motion.p>

        <motion.div
          variants={item(0.5, reduced)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <motion.a
            href="#projects"
            whileHover={reduced ? {} : { y: -2 }}
            className="rounded-md font-semibold"
            style={{ padding: "12px 28px", color: "#f5f0e8", background: "#1a5c3a" }}
          >
            View Projects →
          </motion.a>
          <motion.a
            href="https://github.com/sino-safarov"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduced ? {} : { y: -2 }}
            className="rounded-md border border-border font-semibold text-text-secondary hover:border-accent"
            style={{ padding: "12px 28px" }}
          >
            GitHub
          </motion.a>
        </motion.div>

      </div>

      {/* ── Right column: particle network + SQL terminal ── */}
      <motion.div
        className="hidden lg:flex"
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        initial={{ opacity: reduced ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 0.8, delay: 0.6, ease: "easeOut" as const }
        }
      >
        <div style={{ position: "relative", width: 540, height: 560 }}>
          <canvas
            ref={canvasRef}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          />
          <SQLTerminal reduced={reduced} />
        </div>
      </motion.div>

    </section>
  );
}
