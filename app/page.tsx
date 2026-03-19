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
      {/* Full-viewport hero with text overlay */}
      {heroImage && (
        <section className="relative h-[85vh] min-h-[500px] w-full overflow-hidden bg-foreground">
          <Image
            src={withBasePath(heroImage.src)}
            alt={heroImage.alt}
            width={1920}
            height={1280}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="100vw"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="relative flex h-full flex-col justify-end px-6 pb-16 md:px-8 md:pb-20 lg:px-12 lg:pb-24">
            <div className="mx-auto w-full max-w-content">
              <h1 className="animate-slide-up font-display font-bold tracking-tight text-white text-hero md:text-hero-lg lg:text-hero-xl">
                Venturing to
                <br />
                Every Corner
              </h1>
              <p className="mt-4 animate-slide-up text-body text-white/80 [animation-delay:150ms] md:text-lg">
                Landscapes, cityscapes, and the in-between—light, mood, and
                place.
              </p>
              <div className="mt-8 animate-slide-up [animation-delay:300ms]">
                <Link
                  href="/gallery"
                  className="inline-block border border-white/30 bg-white/10 px-8 py-3.5 text-small font-medium uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/80 focus-visible:ring-offset-black/50"
                >
                  View Gallery
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured collections */}
      <section className="mx-auto max-w-content px-6 py-20 md:px-8 md:py-28 lg:px-12 lg:py-32">
        <div className="mb-12 md:mb-16">
          <p className="text-small font-medium uppercase tracking-widest text-muted">
            Collections
          </p>
          <h2 className="mt-3 font-display text-section-lg font-bold tracking-tight text-foreground md:text-hero">
            Featured Work
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {collections.slice(0, 4).map((col, i) => (
            <Link
              key={col.slug}
              href={`/gallery/${col.slug}`}
              className="animate-scale-in group relative block aspect-[4/3] overflow-hidden bg-surface opacity-0"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {col.images[0] && (
                <Image
                  src={withBasePath(col.images[0].src)}
                  alt={col.images[0].alt}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-300 group-hover:from-black/60" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                  {col.title}
                </h3>
                {col.description && (
                  <p className="mt-1.5 text-small leading-relaxed text-white/80">
                    {col.description}
                  </p>
                )}
                <span className="mt-3 inline-block text-caption font-medium uppercase tracking-widest text-white/50">
                  {col.images.length} photos
                </span>
              </div>
            </Link>
          ))}
        </div>
        {collections.length > 4 && (
          <div className="mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-block border border-foreground px-8 py-3.5 text-small font-medium uppercase tracking-widest text-foreground transition hover:bg-foreground hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
            >
              View All Collections
            </Link>
          </div>
        )}
      </section>

      {/* About section */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-content px-6 py-20 md:px-8 md:py-28 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-small font-medium uppercase tracking-widest text-muted">
              About
            </p>
            <h2 className="mt-3 font-display text-section-lg font-bold tracking-tight text-foreground">
              Landscapes & Travel
            </h2>
            <p className="mt-6 text-body leading-relaxed text-muted">
              Work rooted in the Pacific Northwest—its light, weather, and
              scale—plus travel from Spain, Paris, and San Francisco. Each
              collection captures the character of a place through careful
              composition and natural light.
            </p>
            <div className="mt-8">
              <Link
                href="/gallery"
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition hover:decoration-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
              >
                Browse the gallery →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
