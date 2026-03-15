'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const VIDEO_ID = '1159695499';

export function AlumniSpotlight() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Alumni Spotlight</p>
          <h2 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">Hear From Our Graduates</h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
            {isPlaying ? (
              <iframe
                src={`https://player.vimeo.com/video/${VIDEO_ID}?autoplay=1`}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Alumni spotlight video"
              />
            ) : (
              <>
                <Image
                  src="/images/nana-overlay.jpg"
                  alt="Alumni spotlight - Nana Yeboah"
                  fill
                  className="object-cover"
                  quality={80}
                />
                <div className="absolute inset-0 bg-black/20" />
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className={cn(
                    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                    'flex h-20 w-20 items-center justify-center rounded-full',
                    'bg-white/90 shadow-xl transition-transform hover:scale-110'
                  )}
                  aria-label="Play alumni spotlight video">
                  <Play className="ml-1 h-8 w-8 text-primary" />
                </button>
              </>
            )}
          </div>

          <div>
            <blockquote className="mb-6">
              <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                &ldquo;Sundrops gave me the confidence to explore my interests and the tools to pursue them. The
                Montessori approach taught me how to learn, not just what to learn.&rdquo;
              </p>
            </blockquote>
            <div>
              <p className="font-serif text-lg font-bold text-gray-900">Nana Yeboah</p>
              <p className="text-sm text-gray-500">Sundrops Alumni</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
