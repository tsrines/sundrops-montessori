'use client';

import Link from 'next/link';
import { VideoEmbed } from '@/components/video-embed';

export function VideoTour() {
  return (
    <section className="bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <h2 className="mb-2 font-serif text-3xl font-bold uppercase text-gray-900 md:text-4xl">Video Tour</h2>
          <h4 className="mb-4 font-serif text-lg text-gray-700 md:text-xl">Sundrops Montessori at our Bridge Campus</h4>
          <Link href="/contact/" className="text-sm font-semibold uppercase tracking-wide text-primary hover:underline">
            Request More Info
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl shadow-lg">
          <VideoEmbed videoId="1159695499" provider="vimeo" />
        </div>
      </div>
    </section>
  );
}
