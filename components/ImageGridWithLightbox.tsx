"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lightbox } from "./Lightbox";
import type { GalleryCollection } from "@/lib/gallery";
import { withBasePath } from "@/lib/basePath";

type Props = {
  collection: GalleryCollection;
  prevSlug: string | null;
  nextSlug: string | null;
};

export function ImageGridWithLightbox({
  collection,
  prevSlug,
  nextSlug,
}: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setLightboxIndex(index), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : Math.max(0, i - 1)));
  }, []);
  const goNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : Math.min(collection.images.length - 1, i + 1)
    );
  }, [collection.images.length]);

  return (
    <>
      <div className="mb-6 flex items-center gap-4 text-small text-muted">
        <Link href="/" className="hover:text-foreground hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring">
          Mossy Giraffe
        </Link>
        <span>/</span>
        <Link href="/gallery" className="hover:text-foreground hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring">
          Gallery
        </Link>
        <span>/</span>
        <span className="text-foreground">{collection.title}</span>
      </div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-section font-bold tracking-tight text-foreground">
          {collection.title}
        </h1>
        <div className="flex gap-6">
          {prevSlug && (
            <Link
              href={`/gallery/${prevSlug}`}
              className="text-muted transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
            >
              ← Previous
            </Link>
          )}
          {nextSlug && (
            <Link
              href={`/gallery/${nextSlug}`}
              className="text-muted transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
            >
              Next →
            </Link>
          )}
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
        {collection.images.map((img, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring rounded-lg"
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-surface">
                <Image
                  src={withBasePath(img.src)}
                  alt={img.alt}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                  unoptimized
                />
              </div>
              <span className="mt-1 flex items-center justify-center gap-1 text-caption text-muted group-hover:text-foreground">
                <svg
                  className="h-3.5 w-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25h-4.5m4.5 0v4.5m0-4.5L15 9M5.25 20.25h-4.5m4.5 0v-4.5m0 4.5L9 15m-5.25 5.25v-4.5m0 4.5h4.5m-4.5 0L15 15"
                  />
                </svg>
                View full size
              </span>
            </button>
          </li>
        ))}
      </ul>
      {lightboxIndex !== null && (
        <Lightbox
          images={collection.images}
          currentIndex={lightboxIndex}
          onClose={close}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}
