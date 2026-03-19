"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lightbox } from "./Lightbox";
import type { GalleryCollection } from "@/lib/gallery";

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
      <div className="mb-6 flex items-center gap-4 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          Mossy Giraffe
        </Link>
        <span>/</span>
        <Link href="/gallery" className="hover:underline">
          Gallery
        </Link>
        <span>/</span>
        <span className="text-gray-900">{collection.title}</span>
      </div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {collection.title}
        </h1>
        <div className="flex gap-6">
          {prevSlug && (
            <Link
              href={`/gallery/${prevSlug}`}
              className="text-gray-600 transition hover:text-gray-900"
            >
              ← Previous
            </Link>
          )}
          {nextSlug && (
            <Link
              href={`/gallery/${nextSlug}`}
              className="text-gray-600 transition hover:text-gray-900"
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
              className="group block w-full text-left"
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={`/${img.src}`}
                  alt={img.alt}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                  unoptimized
                />
              </div>
              <span className="mt-1 block text-xs text-gray-500">
                View fullsize
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
