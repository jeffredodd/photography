import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-content px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <h1 className="font-bold tracking-tight text-foreground text-hero md:text-hero-lg">
          Venturing to Every Corner
        </h1>
        <p className="mt-6 max-w-2xl text-body leading-relaxed text-muted">
          Landscapes, cityscapes, and the in-between. From the Pacific Northwest
          to Spain and beyond, I focus on light, mood, and place. Browse the
          gallery—prints are available for any image you see.
        </p>
        <div className="mt-10">
          <Link
            href="/gallery"
            className="inline-block rounded-md bg-foreground px-6 py-3 text-small font-medium text-background transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
          >
            View gallery
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-content border-t border-border px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <h2 className="text-section font-semibold tracking-tight text-foreground">
          Landscapes & travel
        </h2>
        <p className="mt-4 max-w-2xl text-body leading-relaxed text-muted">
          A lot of my work is rooted in the Pacific Northwest—its light, weather,
          and scale. The gallery also includes travel work from Spain, Paris, and
          San Francisco.
        </p>
        <div className="mt-8">
          <Link
            href="/gallery"
            className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
          >
            Browse the gallery →
          </Link>
        </div>
      </section>
      <section
        id="prints"
        className="mx-auto max-w-content border-t border-border px-6 py-16 md:px-8 md:py-24 lg:px-12"
      >
        <h2 className="text-section font-semibold text-foreground">Prints</h2>
        <p className="mt-2 text-body text-muted">
          Prints are available for any image in the gallery. Inquiries welcome.
        </p>
        <a
          href="mailto:hello@mossygiraffe.com?subject=Print%20inquiry"
          className="mt-4 inline-block font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
        >
          Inquire about prints
        </a>
      </section>
    </main>
  );
}
