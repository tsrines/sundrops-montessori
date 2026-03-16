import Image from 'next/image';
import { DI_LEAD_GUIDES } from '@/lib/data/daniel-island-content';

export function DiLeadGuides() {
  return (
    <section className="w-full bg-[#63936E54] py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-3xl font-bold uppercase tracking-wide text-gray-900 md:text-4xl">
          Daniel Island Lead Guides
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          {DI_LEAD_GUIDES.map((guide) => (
            <div key={guide.name} className="flex flex-col items-center text-center">
              <div className="relative h-56 w-56 overflow-hidden rounded-md">
                <Image src={guide.image} alt={guide.name} fill className="object-cover" sizes="224px" />
              </div>
              <p className="mt-4 text-base font-bold text-gray-900">{guide.name}</p>
              <p className="mt-1 text-sm text-gray-500">{guide.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
