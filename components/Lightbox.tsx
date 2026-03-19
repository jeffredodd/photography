"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";

type GalleryImage = { src: string; alt: string };

type Props = {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const CROSSFADE_MS = 250;

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const previousIndexRef = useRef<number>(currentIndex);
  const containerRef = useRef<HTMLDivElement>(null);

  const img = images[currentIndex];
  const prevImg = previousIndex !== null ? images[previousIndex] : null;

  // Crossfade: when currentIndex changes, show previous fading out and current fading in
  useEffect(() => {
    if (currentIndex === previousIndexRef.current) return;
    setPreviousIndex(previousIndexRef.current);
    previousIndexRef.current = currentIndex;
    const t = setTimeout(() => setPreviousIndex(null), CROSSFADE_MS);
    return () => clearTimeout(t);
  }, [currentIndex]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => onClose(), 200);
  }, [onClose]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
      // Focus trap: Tab / Shift+Tab
      if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const list = Array.from(focusable);
        const i = list.indexOf(document.activeElement as HTMLElement);
        if (i === -1 && list.length) {
          e.preventDefault();
          list[0].focus();
        } else if (e.shiftKey) {
          if (i <= 0) {
            e.preventDefault();
            list[list.length - 1]?.focus();
          }
        } else {
          if (i >= list.length - 1) {
            e.preventDefault();
            list[0]?.focus();
          }
        }
      }
    },
    [handleClose, onPrev, onNext]
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
      ref={containerRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 ${isClosing ? "animate-fade-out" : "animate-fade-in"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        type="button"
        onClick={handleClose}
        className="absolute right-4 top-4 z-10 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/80 focus-visible:ring-offset-black/50"
        aria-label="Close"
      >
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <button
        type="button"
        onClick={onPrev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/80 focus-visible:ring-offset-black/50 disabled:opacity-30"
        aria-label="Previous image"
        disabled={currentIndex <= 0}
      >
        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="relative max-h-[90vh] max-w-[90vw]">
        {/* Previous image (fading out) */}
        {prevImg && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ animation: `fade-out ${CROSSFADE_MS}ms ease-out forwards` }}
          >
            <Image
              src={withBasePath(prevImg.src)}
              alt={prevImg.alt}
              width={1600}
              height={1200}
              className="max-h-[90vh] w-auto object-contain"
              unoptimized
              aria-hidden
            />
          </div>
        )}
        {/* Current image (fading in when changing index) */}
        <div
          className={`flex items-center justify-center ${previousIndex !== null ? "animate-fade-in" : ""}`}
          style={previousIndex !== null ? { animationDuration: `${CROSSFADE_MS}ms` } : undefined}
        >
          <Image
            src={withBasePath(img.src)}
            alt={img.alt}
            width={1600}
            height={1200}
            className="max-h-[90vh] w-auto object-contain"
            unoptimized
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onNext}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/80 focus-visible:ring-offset-black/50 disabled:opacity-30"
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
