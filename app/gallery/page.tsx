import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/lib/gallery";
import { withBasePath } from "@/lib/basePath";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Mossy Giraffe",
  description:
    "Adventures, animals, and landscapes — Spain, Paris, San Francisco, Pacific Northwest.",
};

export default function GalleryPage() {
  const collections = getCollections();
  return (
    <main className="min-h-screen px-6 py-8 md:px-8 lg:max-w-6xl lg:px-12 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
        <p className="mt-2 text-gray-600">
          adventures, animals, and landscapes
        </p>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((col) => (
          <li key={col.slug}>
            <Link
              href={`/gallery/${col.slug}`}
              className="group block overflow-hidden rounded-lg border border-gray-200 transition hover:border-gray-400 hover:shadow-lg"
            >
              {col.images[0] && (
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
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
              <span className="block p-4 font-medium text-gray-900">
                {col.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
