import Image from 'next/image';
import { siteConfig } from '@/lib/data/site-config';

export function FounderQuote() {
  const { founder } = siteConfig;

  return (
    <section className="relative bg-amber-100 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">
            A Word
            <br />
            <span className="italic">From Our Founder</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg">
            <Image src={founder.image} alt={founder.name} fill className="object-cover" quality={85} />
          </div>

          <div>
            <blockquote className="mb-6">
              <p className="text-lg leading-relaxed text-gray-700 md:text-xl">{founder.quote}</p>
            </blockquote>
            <p className="font-serif text-lg font-bold text-gray-900">- {founder.name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
