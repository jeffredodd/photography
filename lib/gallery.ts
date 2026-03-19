import galleryData from "@/content/gallery.json";

export type GalleryImage = {
  src: string;
  alt: string;
};

export type GalleryCollection = {
  slug: string;
  title: string;
  images: GalleryImage[];
};

export type GalleryData = {
  collections: GalleryCollection[];
};

export function getGallery(): GalleryData {
  return galleryData as GalleryData;
}

export function getCollections(): GalleryCollection[] {
  return getGallery().collections;
}

export function getCollectionBySlug(slug: string): GalleryCollection | undefined {
  return getCollections().find((c) => c.slug === slug);
}

export function getCollectionSlugs(): string[] {
  return getCollections().map((c) => c.slug);
}
