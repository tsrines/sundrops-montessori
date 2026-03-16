import Image from 'next/image';
import { INFANT_BEYOND_BOOKS } from '@/lib/data/infant-content';

export function InfantBeyondBooks() {
  return (
    <section className="w-full">
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center bg-[#F7F7F7] px-8 py-16 md:px-12 md:py-20">
          <h2 className="mb-6 font-serif text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
            {INFANT_BEYOND_BOOKS.heading}
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">{INFANT_BEYOND_BOOKS.body}</p>
        </div>
        <div className="relative min-h-[400px]">
          <Image
            src={INFANT_BEYOND_BOOKS.image.src}
            alt={INFANT_BEYOND_BOOKS.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
