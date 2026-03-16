import Link from 'next/link';
import { VideoEmbed } from '@/components/video-embed';
import { MEZZO_VIRTUAL_TOUR } from '@/lib/data/mezzo-content';

export function MezzoVirtualTour() {
  return (
    <section className="w-full bg-muted/50 py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="mb-6 font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {MEZZO_VIRTUAL_TOUR.heading}
            </h2>
            <Link
              href={MEZZO_VIRTUAL_TOUR.cta.href}
              className="inline-block rounded bg-amber-600 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-amber-700">
              {MEZZO_VIRTUAL_TOUR.cta.label}
            </Link>
          </div>
          <div>
            <VideoEmbed videoId={MEZZO_VIRTUAL_TOUR.videoId} provider="vimeo" title="Mezzo Farm School Virtual Tour" />
          </div>
        </div>
      </div>
    </section>
  );
}
