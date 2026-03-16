import Image from 'next/image';
import { MEZZO_PHILOSOPHY } from '@/lib/data/mezzo-content';

export function MezzoPhilosophy() {
  const { adolescent, deepConnection } = MEZZO_PHILOSOPHY;

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-20">
      <Image
        src="/images/programs/middle-school-hero.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gray-900/80" />
      <div className="relative z-10 container mx-auto max-w-6xl px-4">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="mb-6 font-serif text-3xl font-bold tracking-tight text-white md:text-4xl">
              {adolescent.heading}
            </h2>
            <div className="space-y-4">
              {adolescent.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-gray-200">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-6 font-serif text-3xl font-bold tracking-tight text-white md:text-4xl">
              {deepConnection.heading}
            </h2>
            <div className="space-y-4">
              {deepConnection.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-gray-200">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
