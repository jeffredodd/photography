import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-content px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <h1 className="font-bold tracking-tight text-foreground text-hero md:text-hero-lg">
          Venturing to Every Corner
        </h1>
        <p className="mt-6 max-w-2xl text-body leading-relaxed text-muted">
          I capture places—mountains, cities, quiet streets, and everything in
          between. Whether it&apos;s a moody landscape, a vibrant cityscape, or a
          moment from traveling through Spain, my photography is about
          perspective. Take a look around, and if something resonates, prints
          are available.
        </p>
        <div className="mt-10">
          <Link
            href="/gallery"
            className="inline-block rounded-md bg-foreground px-6 py-3 text-small font-medium text-background transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
          >
            Visit Gallery
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-content border-t border-border px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <h2 className="text-section font-semibold tracking-tight text-foreground">
          Showcasing Raw Beauty
        </h2>
        <p className="mt-4 max-w-2xl text-body leading-relaxed text-muted">
          Photography&apos;s how I share the beauty of the Pacific Northwest—its
          epic landscapes, moody skies, and quiet moments that make it so
          special. Check out the gallery and see some of my adventures.
        </p>
        <div className="mt-8">
          <Link
            href="/gallery"
            className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
          >
            View gallery →
          </Link>
        </div>
      </section>
      <section
        id="prints"
        className="mx-auto max-w-content border-t border-border px-6 py-16 md:px-8 md:py-24 lg:px-12"
      >
        <h2 className="text-section font-semibold text-foreground">Prints</h2>
        <p className="mt-2 text-body text-muted">
          Interested in a print? Get in touch and we can arrange it.
        </p>
        <a
          href="mailto:hello@mossygiraffe.com?subject=Print%20inquiry"
          className="mt-4 inline-block font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
        >
          Contact for prints
        </a>
      </section>
    </main>
  );
}
