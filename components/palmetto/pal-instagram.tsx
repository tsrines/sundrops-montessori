import Image from 'next/image';
import { PAL_INSTAGRAM } from '@/lib/data/palmetto-content';

export function PalInstagram() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-3xl font-bold text-gray-900 md:text-4xl">
          Follow Palmetto Campus on{' '}
          <a
            href={PAL_INSTAGRAM.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E1306C] hover:underline">
            Instagram
          </a>
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-5">
          {PAL_INSTAGRAM.posts.map((post) => (
            <a
              key={post.href}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-gray-100">
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                className="object-cover transition-opacity duration-200 group-hover:opacity-80"
              />
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            disabled
            className="rounded bg-gray-100 px-6 py-2 text-sm font-semibold text-gray-500 cursor-not-allowed">
            Load More...
          </button>
          <a
            href={PAL_INSTAGRAM.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-[#E1306C] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#c1255b]">
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
