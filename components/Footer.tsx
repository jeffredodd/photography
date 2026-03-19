const BLUESKY_URL = "https://bsky.app";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-content px-6 py-16 md:px-8 md:py-20 lg:px-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-foreground">
              Mossy Giraffe
            </p>
            <p className="mt-2 max-w-sm text-small leading-relaxed text-muted">
              Photography bridging engineering precision and artistic heritage—from
              Washington roots to San Francisco light, crafted for print.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={BLUESKY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-small font-medium uppercase tracking-widest text-muted transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
            >
              Bluesky
            </a>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-caption text-muted">
            © {new Date().getFullYear()} Mossy Giraffe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
