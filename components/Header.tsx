import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Mossy Giraffe
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/gallery"
            className="text-gray-600 transition hover:text-gray-900"
          >
            Gallery
          </Link>
          <Link
            href="/#prints"
            className="text-gray-600 transition hover:text-gray-900"
          >
            Prints
          </Link>
        </nav>
      </div>
    </header>
  );
}
