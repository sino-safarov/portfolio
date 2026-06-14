export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{
        height: 80,
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div
        className="mx-auto flex h-full items-center justify-between px-3 sm:px-6"
        style={{ maxWidth: 1100 }}
      >
        <span className="text-caption text-text-secondary">
          &copy; 2026 Sino Safarov
        </span>

        <nav
          className="flex items-center"
          style={{ gap: 24 }}
          aria-label="Footer links"
        >
          <a
            href="https://github.com/sino-safarov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-caption text-text-secondary hover:text-text-primary"
            style={{ transition: "color 0.15s" }}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/sino-safarov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-caption text-text-secondary hover:text-text-primary"
            style={{ transition: "color 0.15s" }}
          >
            LinkedIn
          </a>
          <a
            href="mailto:sinosafarov555@gmail.com"
            className="text-caption text-text-secondary hover:text-text-primary"
            style={{ transition: "color 0.15s" }}
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
