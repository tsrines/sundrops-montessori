'use client';

import { VideoEmbed } from '@/components/video-embed';

export function VideoTour() {
  return (
    <section className="bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <h2 className="mb-4 font-serif text-3xl font-bold text-gray-900 md:text-4xl">Take a Virtual Tour</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Step inside our classrooms and see the Montessori difference. Our prepared environments are designed to
            inspire independence, creativity, and a lifelong love of learning.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl shadow-lg">
          <VideoEmbed videoId="1159695499" provider="vimeo" />
        </div>
      </div>
    </section>
  );
}
