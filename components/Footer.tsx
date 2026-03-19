const BLUESKY_URL = "https://bsky.app";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-content px-6 py-12 md:px-8 lg:px-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-foreground">Mossy Giraffe</p>
            <p className="mt-1 text-small text-muted">
              Fine-art photography rooted in the Pacific Northwest.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={BLUESKY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-small text-muted transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
            >
              Bluesky
            </a>
          </div>
        </div>
        <p className="mt-8 text-caption text-muted">
          © {new Date().getFullYear()} Mossy Giraffe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
