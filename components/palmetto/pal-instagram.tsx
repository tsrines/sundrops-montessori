import { Instagram } from 'lucide-react';
import { PAL_INSTAGRAM } from '@/lib/data/palmetto-content';

export function PalInstagram() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">Follow Palmetto Campus on Instagram</h2>
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-12 py-10">
            <Instagram className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-sm text-gray-500">Instagram feed from {PAL_INSTAGRAM.handle}</p>
          </div>
          <a
            href={PAL_INSTAGRAM.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline">
            <Instagram className="h-4 w-4" />
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
