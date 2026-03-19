"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lightbox } from "./Lightbox";
import type { GalleryCollection } from "@/lib/gallery";
import { withBasePath } from "@/lib/basePath";
import { BLUR_DATA_URL } from "@/lib/placeholder";

type Props = {
  collection: GalleryCollection;
  slug: string;
  prevSlug: string | null;
  nextSlug: string | null;
  initialImageIndex?: number;
};

export function ImageGridWithLightbox({
  collection,
  slug,
  prevSlug,
  nextSlug,
  initialImageIndex,
}: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(
    initialImageIndex ?? null
  );
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Open lightbox from URL on mount (e.g. shared link or refresh with ?image=N)
  useEffect(() => {
    const imageParam = searchParams.get("image");
    if (imageParam != null && lightboxIndex === null) {
      const idx = Math.max(0, Math.min(Number.parseInt(imageParam, 10), collection.images.length - 1));
      if (!Number.isNaN(idx)) setLightboxIndex(idx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const open = useCallback(
    (index: number) => {
      lastFocusRef.current = document.activeElement as HTMLElement | null;
      setLightboxIndex(index);
      router.replace(`/gallery/${slug}?image=${index}`, { scroll: false });
    },
    [slug, router]
  );
  const close = useCallback(() => {
    setLightboxIndex(null);
    router.replace(`/gallery/${slug}`, { scroll: false });
  }, [slug, router]);
  const goPrev = useCallback(() => {
    setLightboxIndex((i) => {
      const next = i === null ? null : Math.max(0, i - 1);
      if (next !== null) router.replace(`/gallery/${slug}?image=${next}`, { scroll: false });
      return next;
    });
  }, [slug, router]);
  const goNext = useCallback(() => {
    setLightboxIndex((i) => {
      const next =
        i === null ? null : Math.min(collection.images.length - 1, i + 1);
      if (next !== null) router.replace(`/gallery/${slug}?image=${next}`, { scroll: false });
      return next;
    });
  }, [collection.images.length, slug, router]);

  useEffect(() => {
    if (lightboxIndex === null && lastFocusRef.current) {
      lastFocusRef.current.focus();
      lastFocusRef.current = null;
    }
  }, [lightboxIndex]);

  return (
    <>
      <div className="mb-6 flex items-center gap-2 text-small text-muted">
        <Link href="/" className="hover:text-foreground hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring">
          Mossy Giraffe
        </Link>
        <span className="text-border">/</span>
        <Link href="/gallery" className="hover:text-foreground hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring">
          Gallery
        </Link>
        <span className="text-border">/</span>
        <span className="text-foreground">{collection.title}</span>
      </div>
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="font-display text-section-lg font-bold tracking-tight text-foreground md:text-hero">
            {collection.title}
          </h1>
          <p className="mt-1 text-small text-muted">
            {collection.images.length} photographs
          </p>
        </div>
        <div className="flex gap-6">
          {prevSlug && (
            <Link
              href={`/gallery/${prevSlug}`}
              className="text-small font-medium text-muted transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
            >
              ← Previous
            </Link>
          )}
          {nextSlug && (
            <Link
              href={`/gallery/${nextSlug}`}
              className="text-small font-medium text-muted transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
            >
              Next →
            </Link>
          )}
        </div>
      </div>

      {/* Featured first image - large */}
      {collection.images.length > 0 && (
        <div className="mb-4 md:mb-6">
          <button
            type="button"
            onClick={() => open(0)}
            className="animate-scale-in group block w-full text-left opacity-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
          >
            <div className="aspect-[3/2] w-full overflow-hidden bg-surface">
              <Image
                src={withBasePath(collection.images[0].src)}
                alt={collection.images[0].alt}
                width={1200}
                height={800}
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 768px) 100vw, 72rem"
                unoptimized
              />
            </div>
          </button>
        </div>
      )}

      {/* Remaining images in grid */}
      {collection.images.length > 1 && (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
          {collection.images.slice(1).map((img, i) => (
            <li
              key={i + 1}
              className="animate-stagger-in opacity-0"
              style={{ animationDelay: `${(i + 1) * 50}ms` }}
            >
              <button
                type="button"
                onClick={() => open(i + 1)}
                className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-surface">
                  <Image
                    src={withBasePath(img.src)}
                    alt={img.alt}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    unoptimized
                  />
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

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
