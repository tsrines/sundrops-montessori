'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const VIDEO_ID = '829806004';

export function AlumniSpotlight() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">Alumni Spotlight</h2>
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
                &ldquo;This program is amazing. They got this super scared, shy girl to this confident, outgoing person.
                I really feel like the Montessori way of learning helped me become a better student and a better
                person.&rdquo;
              </p>
            </blockquote>
            <div className="space-y-1">
              <p className="font-serif text-lg font-bold text-gray-900">Nana Yeboah</p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Years Attended:</span> 2019 - 2022
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Sundrops Programs:</span> Upper Elementary, Mezzo Middle School
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Where To:</span> College of Charleston
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
