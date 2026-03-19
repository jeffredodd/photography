import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/lib/gallery";
import { withBasePath } from "@/lib/basePath";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Mossy Giraffe",
  description:
    "Collections: Spain, Paris, San Francisco, Pacific Northwest, and animals. Fine-art photography.",
};

export default function GalleryPage() {
  const collections = getCollections();
  return (
    <main className="mx-auto min-h-screen max-w-content px-6 py-8 md:px-8 lg:px-12 lg:py-12">
      <div className="mb-8">
        <h1 className="font-bold tracking-tight text-foreground text-hero md:text-hero-lg">
          Gallery
        </h1>
        <p className="mt-2 text-body text-muted">
          Travel and landscape collections.
        </p>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((col) => (
          <li key={col.slug}>
            <Link
              href={`/gallery/${col.slug}`}
              className="group block overflow-hidden rounded-lg border border-border transition hover:border-muted hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
            >
              {col.images[0] && (
                <div className="aspect-[4/3] overflow-hidden bg-surface">
                  <Image
                    src={withBasePath(col.images[0].src)}
                    alt={col.images[0].alt}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                    unoptimized
                  />
                </div>
              )}
              <span className="block p-4 font-medium text-foreground">
                {col.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
