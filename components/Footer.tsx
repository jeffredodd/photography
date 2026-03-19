import Link from "next/link";

const BLUESKY_URL = "https://bsky.app";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-gray-900">Mossy Giraffe</p>
            <p className="mt-1 text-sm text-gray-600">
              Venturing to every corner.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={BLUESKY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              Follow on BlueSky
            </a>
            <Link
              href="/#prints"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              Prints
            </Link>
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-500">
          © {new Date().getFullYear()} Mossy Giraffe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
