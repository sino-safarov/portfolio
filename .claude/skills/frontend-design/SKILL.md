# Frontend Design Skill

Rules for all UI work in this portfolio project.

## Colors
- Always use CSS variables from `src/styles/tokens.css`
- Never use inline hex values or hardcoded color strings
- Never use generic Tailwind color utilities (no `blue-500`, no `gray-100`)

## Spacing
- Always use 8px grid multiples (`--space-1` through `--space-16`)
- Map to Tailwind custom spacing tokens defined in `tailwind.config.ts`

## Typography
- Use the defined type scale variables (`--text-display`, `--text-heading`, etc.)
- No arbitrary font sizes — only the five scale steps defined in tokens.css

## Animation
- Framer Motion only — no CSS transitions for enter/exit animations
- Always add `useReducedMotion()` guard before applying motion values
- Entrance animation standard: opacity `0→1`, y `20→0`, duration `0.5s`
- Stagger children by `0.1s` when animating lists or card grids

## Design elements
- No generic Tailwind defaults as final styles (can use them as base, must override)
- Every section must have one signature design element (e.g., accent line, glow, grid overlay)
- Mobile-first: all components designed from `375px` base width upward

## Reduced motion
- Wrap all Framer Motion variants in a `useReducedMotion()` check
- When reduced motion is preferred, skip transform animations; keep opacity fades at 0.1s max
