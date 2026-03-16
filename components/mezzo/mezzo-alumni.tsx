'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MEZZO_ALUMNI } from '@/lib/data/mezzo-content';

export function MezzoAlumni() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="w-full px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">{MEZZO_ALUMNI.subheading}</p>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">{MEZZO_ALUMNI.programLabel}</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 md:text-4xl">{MEZZO_ALUMNI.heading}</h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Video / Thumbnail */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
            {isPlaying ? (
              <iframe
                src={`https://player.vimeo.com/video/${MEZZO_ALUMNI.videoId}?autoplay=1&dnt=1`}
                className="absolute inset-0 h-full w-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Alumni spotlight - Nana Yeboah"
              />
            ) : (
              <>
                <Image
                  src={MEZZO_ALUMNI.thumbnail}
                  alt={`Alumni spotlight - ${MEZZO_ALUMNI.name}`}
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

          {/* Bio */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-gray-900">{MEZZO_ALUMNI.name}</h3>
            <blockquote className="mt-4">
              <p className="text-base leading-relaxed text-gray-700 italic">&ldquo;{MEZZO_ALUMNI.quote}&rdquo;</p>
            </blockquote>
            <dl className="mt-6 space-y-3">
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-gray-500">Years Attended</dt>
                <dd className="mt-1 text-sm text-gray-700">{MEZZO_ALUMNI.yearsAttended}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-gray-500">Sundrops Programs</dt>
                <dd className="mt-1 text-sm text-gray-700">{MEZZO_ALUMNI.programs}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-gray-500">Where To</dt>
                <dd className="mt-1 text-sm text-gray-700">{MEZZO_ALUMNI.whereTo}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
