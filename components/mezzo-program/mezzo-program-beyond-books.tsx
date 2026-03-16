import Image from 'next/image';
import Link from 'next/link';
import { MEZZO_PROGRAM_BEYOND_BOOKS } from '@/lib/data/mezzo-program-content';

export function MezzoProgramBeyondBooks() {
  return (
    <section className="w-full">
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center bg-[#F2C94C] px-8 py-16 md:px-12 md:py-20">
          <h2 className="mb-6 font-serif text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
            {MEZZO_PROGRAM_BEYOND_BOOKS.heading}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-800">{MEZZO_PROGRAM_BEYOND_BOOKS.body}</p>
          <div>
            <Link
              href={MEZZO_PROGRAM_BEYOND_BOOKS.cta.href}
              className="inline-block rounded bg-[#4CAF50] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#43A047]">
              {MEZZO_PROGRAM_BEYOND_BOOKS.cta.label}
            </Link>
          </div>
        </div>
        <div className="relative min-h-[400px]">
          <Image
            src={MEZZO_PROGRAM_BEYOND_BOOKS.image.src}
            alt={MEZZO_PROGRAM_BEYOND_BOOKS.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
