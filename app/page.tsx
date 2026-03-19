import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="px-6 py-16 md:px-8 md:py-24 lg:max-w-4xl lg:px-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Venturing to Every Corner
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
          I capture places—mountains, cities, quiet streets, and everything in
          between. Whether it&apos;s a moody landscape, a vibrant cityscape, or a
          moment from traveling through Spain, my photography is about
          perspective. Take a look around, and if something resonates, prints
          are available.
        </p>
        <div className="mt-10">
          <Link
            href="/gallery"
            className="inline-block rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Visit Gallery
          </Link>
        </div>
      </section>
      <section className="border-t border-gray-100 px-6 py-16 md:px-8 md:py-24 lg:max-w-4xl lg:px-12">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
          Showcasing Raw Beauty
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-gray-600">
          Photography&apos;s how I share the beauty of the Pacific Northwest—its
          epic landscapes, moody skies, and quiet moments that make it so
          special. Check out the gallery and see some of my adventures.
        </p>
        <div className="mt-8">
          <Link
            href="/gallery"
            className="font-medium text-gray-900 underline decoration-gray-400 underline-offset-4 hover:decoration-gray-600"
          >
            View gallery →
          </Link>
        </div>
      </section>
      <section
        id="prints"
        className="border-t border-gray-100 px-6 py-12 md:px-8 lg:max-w-4xl lg:px-12"
      >
        <h2 className="text-xl font-semibold text-gray-900">Prints</h2>
        <p className="mt-2 text-gray-600">
          Interested in a print? Get in touch and we can arrange it.
        </p>
        <a
          href="mailto:hello@mossygiraffe.com?subject=Print%20inquiry"
          className="mt-4 inline-block font-medium text-gray-900 underline decoration-gray-400 underline-offset-4 hover:decoration-gray-600"
        >
          Contact for prints
        </a>
      </section>
    </main>
  );
}
