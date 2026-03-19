import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/lib/gallery";
import { withBasePath } from "@/lib/basePath";
import { BLUR_DATA_URL } from "@/lib/placeholder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Mossy Giraffe",
  description:
    "Collections: Spain, Paris, San Francisco, Pacific Northwest, and animals. Fine-art photography.",
};

export default function GalleryPage() {
  const collections = getCollections();
  return (
    <main className="mx-auto min-h-screen max-w-content px-6 py-12 md:px-8 lg:px-12 lg:py-16">
      <div className="mb-10">
        <h1 className="font-display font-bold tracking-tighter text-foreground text-hero md:text-hero-lg">
          Gallery
        </h1>
        <p className="mt-2 text-body text-muted">
          Travel and landscape collections.
        </p>
      </div>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((col) => (
          <li key={col.slug}>
            <Link
              href={`/gallery/${col.slug}`}
              className="group block overflow-hidden rounded-lg border border-border transition hover:border-muted hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
            >
              {col.images[0] && (
                <div className="aspect-[3/2] overflow-hidden bg-surface">
                  <Image
                    src={withBasePath(col.images[0].src)}
                    alt={col.images[0].alt}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
