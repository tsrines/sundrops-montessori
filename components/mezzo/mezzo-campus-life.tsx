import Image from 'next/image';
import { MEZZO_CAMPUS_LIFE_IMAGES } from '@/lib/data/mezzo-content';

export function MezzoCampusLife() {
  return (
    <section className="w-full bg-[#F3F7F0] px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-4xl font-bold text-gray-900 md:text-5xl">Campus Life</h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {/* Row 1: 3 images */}
          {MEZZO_CAMPUS_LIFE_IMAGES.slice(0, 3).map((img) => (
            <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
          ))}

          {/* Row 2: 2 images */}
          {MEZZO_CAMPUS_LIFE_IMAGES.slice(3, 5).map((img) => (
            <div
              key={img.src}
              className="relative aspect-[4/3] overflow-hidden rounded-lg md:col-span-1 sm:first:col-span-1">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
          ))}
          {/* Spacer for 2-image row on 3-col grid */}
          <div className="hidden md:block" />

          {/* Row 3: 3 images */}
          {MEZZO_CAMPUS_LIFE_IMAGES.slice(5, 8).map((img) => (
            <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
