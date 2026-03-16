import Image from 'next/image';
import { MEZZO_STAFF } from '@/lib/data/mezzo-content';

export function MezzoOurPeople() {
  return (
    <section className="w-full px-4 py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">Our People</h2>
          <p className="mt-2 text-base text-gray-600">Meet the Farm School Guides</p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {MEZZO_STAFF.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <div className="relative h-64 w-64 overflow-hidden rounded-lg">
                <Image src={member.image} alt={member.name} fill className="object-cover" sizes="256px" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.title}</p>
              {'emailLabel' in member && member.emailLabel && member.emailHref && (
                <a href={member.emailHref} className="mt-1 text-sm text-primary underline-offset-4 hover:underline">
                  {member.emailLabel}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
