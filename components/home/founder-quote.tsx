import Image from 'next/image';
import { siteConfig } from '@/lib/data/site-config';

export function FounderQuote() {
  const { founder } = siteConfig;

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="flex justify-center">
          <div className="relative h-80 w-80 overflow-hidden rounded-full shadow-lg">
            <Image src="/images/founder.jpg" alt={founder.name} fill className="object-cover" quality={85} />
          </div>
        </div>

        <div className="relative">
          <span className="absolute -left-4 -top-8 select-none font-serif text-6xl leading-none text-primary/20">
            &ldquo;
          </span>

          <blockquote className="relative pl-4">
            <p className="text-lg leading-relaxed text-gray-700 md:text-xl">{founder.quote}</p>
          </blockquote>

          <span className="mt-2 inline-block select-none font-serif text-6xl leading-none text-primary/20">
            &rdquo;
          </span>

          <div className="mt-4">
            <p className="font-serif text-lg font-bold text-gray-900">{founder.name}</p>
            <p className="text-sm text-gray-500">{founder.title}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
