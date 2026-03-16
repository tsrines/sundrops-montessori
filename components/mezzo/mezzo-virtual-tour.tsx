import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
            <Button asChild size="lg">
              <Link href={MEZZO_VIRTUAL_TOUR.cta.href}>{MEZZO_VIRTUAL_TOUR.cta.label}</Link>
            </Button>
          </div>
          <div>
            <VideoEmbed videoId={MEZZO_VIRTUAL_TOUR.videoId} provider="vimeo" title="Mezzo Program Virtual Tour" />
          </div>
        </div>
      </div>
    </section>
  );
}
