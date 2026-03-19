import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/lib/gallery";
import { withBasePath } from "@/lib/basePath";
import { BLUR_DATA_URL } from "@/lib/placeholder";

export default function Home() {
  const collections = getCollections();
  const heroImage = collections[0]?.images[0];

  return (
    <main>
      {heroImage && (
        <section className="w-full">
          <div className="aspect-[3/2] w-full overflow-hidden bg-surface">
            <Image
              src={withBasePath(heroImage.src)}
              alt={heroImage.alt}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="100vw"
              unoptimized
              priority
            />
          </div>
        </section>
      )}
      <section className="mx-auto max-w-content px-6 py-20 md:px-8 md:py-28 lg:px-12">
        <h1 className="font-display font-bold tracking-tighter text-foreground text-hero md:text-hero-lg">
          Where Light Tells the Story
        </h1>
        <p className="mt-6 max-w-2xl text-body leading-relaxed text-muted">
          Fine-art photography capturing the quiet drama of landscapes,
          architecture, and wildlife—from the misty Pacific Northwest to the
          sun-warmed streets of Europe.
        </p>
        <div className="mt-10">
          <Link
            href="/gallery"
            className="inline-block rounded-md bg-foreground px-6 py-3 text-small font-medium text-background transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
          >
            Explore the collections
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-content border-t border-border px-6 py-20 md:px-8 md:py-28 lg:px-12">
        <h2 className="font-display text-section font-semibold tracking-tight text-foreground">
          From the Northwest to the world
        </h2>
        <p className="mt-4 max-w-2xl text-body leading-relaxed text-muted">
          Every collection begins with a sense of place. The fog-draped
          coastlines and ancient forests of the Pacific Northwest. The
          golden-hour glow over Spanish plazas and Parisian rooftops. The bold
          geometry of San Francisco against the Pacific sky. Each image is an
          invitation to pause and look closer.
        </p>
        <div className="mt-8">
          <Link
            href="/gallery"
            className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
          >
            Start exploring →
          </Link>
        </div>
      </section>
    </main>
  );
}
