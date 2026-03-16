import Image from 'next/image';
import { DI_ADMINISTRATORS } from '@/lib/data/daniel-island-content';

export function DiOurPeople() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-[#E7EDF9] py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-4xl font-bold text-gray-900 md:text-5xl">Our People</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
          Meet the Administrators and Lead Guides of the Daniel Island Campus of Sundrops Montessori
        </p>
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 md:max-w-2xl">
          {DI_ADMINISTRATORS.map((admin) => (
            <div key={admin.name} className="flex flex-col items-start">
              <div className="relative h-64 w-64 overflow-hidden rounded-md">
                <Image src={admin.image} alt={admin.name} fill className="object-cover" sizes="256px" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#1a3a4a]">{admin.name}</h3>
              <p className="text-sm text-gray-500">{admin.title}</p>
              <a href={admin.emailHref} className="mt-1 text-sm text-[#0C80D3] hover:underline">
                {admin.emailLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
