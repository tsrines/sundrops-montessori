import Image from 'next/image';
import { DI_CAMPUS_LIFE_IMAGES } from '@/lib/data/daniel-island-content';

export function DiCampusLife() {
  return (
    <section className="w-full bg-[#F3F7F0] py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-4xl font-bold text-gray-900 md:text-5xl">Campus Life</h2>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Row 1: 2 wide images spanning 3 columns */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:col-span-2">
            <Image
              src={DI_CAMPUS_LIFE_IMAGES[0].src}
              alt={DI_CAMPUS_LIFE_IMAGES[0].alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 66vw, 100vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={DI_CAMPUS_LIFE_IMAGES[1].src}
              alt={DI_CAMPUS_LIFE_IMAGES[1].alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>

          {/* Row 2: 3 equal images */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={DI_CAMPUS_LIFE_IMAGES[2].src}
              alt={DI_CAMPUS_LIFE_IMAGES[2].alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={DI_CAMPUS_LIFE_IMAGES[3].src}
              alt={DI_CAMPUS_LIFE_IMAGES[3].alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={DI_CAMPUS_LIFE_IMAGES[4].src}
              alt={DI_CAMPUS_LIFE_IMAGES[4].alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>

          {/* Row 3: 1 wide image spanning all columns */}
          <div className="relative aspect-[3/1] overflow-hidden rounded-lg md:col-span-3">
            <Image
              src={DI_CAMPUS_LIFE_IMAGES[5].src}
              alt={DI_CAMPUS_LIFE_IMAGES[5].alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Row 4: 3 equal images */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={DI_CAMPUS_LIFE_IMAGES[6].src}
              alt={DI_CAMPUS_LIFE_IMAGES[6].alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={DI_CAMPUS_LIFE_IMAGES[7].src}
              alt={DI_CAMPUS_LIFE_IMAGES[7].alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={DI_CAMPUS_LIFE_IMAGES[8].src}
              alt={DI_CAMPUS_LIFE_IMAGES[8].alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
