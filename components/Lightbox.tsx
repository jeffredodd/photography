"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";

type GalleryImage = { src: string; alt: string };

type Props = {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const img = images[currentIndex];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  if (!img) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
        aria-label="Close"
      >
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <button
        type="button"
        onClick={onPrev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
        aria-label="Previous image"
        disabled={currentIndex <= 0}
      >
        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="relative max-h-[90vh] max-w-[90vw]">
        <Image
          src={`/${img.src}`}
          alt={img.alt}
          width={1600}
          height={1200}
          className="max-h-[90vh] w-auto object-contain"
          unoptimized
        />
      </div>
      <button
        type="button"
        onClick={onNext}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
        aria-label="Next image"
        disabled={currentIndex >= images.length - 1}
      >
        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
