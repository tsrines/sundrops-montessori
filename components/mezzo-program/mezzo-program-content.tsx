import Image from 'next/image';
import { MEZZO_PROGRAM_CONTENT } from '@/lib/data/mezzo-program-content';

export function MezzoProgramContent() {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
              {MEZZO_PROGRAM_CONTENT.adolescent.heading}
            </h2>
            {MEZZO_PROGRAM_CONTENT.adolescent.paragraphs.map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
              {MEZZO_PROGRAM_CONTENT.deepConnection.heading}
            </h2>
            {MEZZO_PROGRAM_CONTENT.deepConnection.paragraphs.map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-gray-600">
                {paragraph}
              </p>
            ))}
            <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/images/campuses/farm/farm-4.jpg"
                alt="Students connecting with nature at the Mezzo Farm School"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
