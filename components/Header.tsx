import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-8 lg:px-12">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
        >
          Mossy Giraffe
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/gallery"
            className="text-muted transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
          >
            Gallery
          </Link>
          <Link
            href="/#prints"
            className="text-muted transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
          >
            Prints
          </Link>
        </nav>
      </div>
    </header>
  );
}
