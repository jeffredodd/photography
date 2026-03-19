import Link from "next/link";
import {
  getCollectionBySlug,
  getCollectionSlugs,
  getCollections,
} from "@/lib/gallery";
import { ImageGridWithLightbox } from "@/components/ImageGridWithLightbox";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getCollectionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Gallery — Mossy Giraffe" };
  return {
    title: `${collection.title} — Mossy Giraffe`,
    description: `Gallery: ${collection.title}`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  const all = getCollections();
  const index = all.findIndex((c) => c.slug === slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

  if (!collection) {
    return (
      <main className="min-h-screen px-6 py-12">
        <p>Collection not found.</p>
        <Link href="/gallery" className="text-gray-600 underline hover:text-gray-900">
          Back to gallery
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-8 md:px-8 lg:max-w-6xl lg:px-12 lg:py-12">
      <ImageGridWithLightbox
        collection={collection}
        prevSlug={prev?.slug ?? null}
        nextSlug={next?.slug ?? null}
      />
    </main>
  );
}
