import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/lib/gallery";
import { withBasePath } from "@/lib/basePath";
import { BLUR_DATA_URL } from "@/lib/placeholder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Mossy Giraffe",
  description:
    "Browse curated photography collections — European travel, Pacific Northwest landscapes, San Francisco cityscapes, and wildlife portraits by Mossy Giraffe.",
};

export default function GalleryPage() {
  const collections = getCollections();
  return (
    <main className="mx-auto min-h-screen max-w-content px-6 py-12 md:px-8 lg:px-12 lg:py-16">
      <div className="mb-12 md:mb-16">
        <p className="text-small font-medium uppercase tracking-widest text-muted">
          Browse
        </p>
        <h1 className="mt-3 font-display font-bold tracking-tight text-foreground text-hero md:text-hero-lg">
          Gallery
        </h1>
        <p className="mt-3 max-w-lg text-body text-muted">
          Curated collections of landscape, travel, and wildlife photography.
        </p>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
        {collections.map((col, i) => (
          <li
            key={col.slug}
            className="animate-scale-in opacity-0"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <Link
              href={`/gallery/${col.slug}`}
              className="group relative block aspect-[3/2] overflow-hidden bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
            >
              {col.images[0] && (
                <Image
                  src={withBasePath(col.images[0].src)}
                  alt={col.images[0].alt}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
              )}
              <div className="image-gradient-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 group-hover:from-black/80" />
              <div className="text-on-image text-on-image-backdrop absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h2 className="font-display text-lg font-semibold text-white md:text-xl">
                  {col.title}
                </h2>
                {col.description && (
                  <p className="mt-1 text-caption leading-relaxed text-white/80 transition-colors group-hover:text-white/90">
                    {col.description}
                  </p>
                )}
                <span className="mt-2 inline-block text-caption font-medium uppercase tracking-widest text-white/70">
                  {col.images.length} photos
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
