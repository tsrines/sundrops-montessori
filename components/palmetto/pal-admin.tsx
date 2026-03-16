import Image from 'next/image';
import { PAL_ADMIN, PAL_GENERAL_INFO } from '@/lib/data/palmetto-content';

export function PalAdmin() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
        {/* Left: Director */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">{PAL_ADMIN.heading}</h2>
          <div className="relative mt-8 h-48 w-48 overflow-hidden rounded-full">
            <Image src={PAL_ADMIN.image} alt={PAL_ADMIN.name} fill className="object-cover" sizes="192px" />
          </div>
          <p className="mt-6 text-lg font-bold text-gray-900">{PAL_ADMIN.name}</p>
          <p className="text-sm text-gray-500">{PAL_ADMIN.title}</p>
        </div>

        {/* Right: General Info */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">General Info</h2>
          <div className="mt-8 rounded-lg bg-gray-100 p-8">
            <div className="space-y-6">
              {PAL_GENERAL_INFO.contacts.map((contact) => (
                <div key={contact.role}>
                  <p className="text-sm font-bold text-gray-900">
                    {contact.role}: <span className="font-normal">{contact.name}</span>
                  </p>
                  {'emailHref' in contact && (
                    <a href={contact.emailHref} className="text-sm text-blue-600 underline hover:no-underline">
                      {contact.emailLabel}
                    </a>
                  )}
                </div>
              ))}
              <div>
                <p className="text-sm font-bold text-gray-900">
                  Grade Levels: <span className="font-normal">{PAL_GENERAL_INFO.gradeLevels}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
