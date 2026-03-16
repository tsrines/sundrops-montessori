import Image from 'next/image';
import type { Campus } from '@/lib/data/campuses';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CampusHeroProps {
  campus: Campus;
}

export function CampusHero({ campus }: CampusHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-primary to-primary/80 py-20 text-primary-foreground md:py-28">
      <Image
        src={campus.heroImage}
        alt={`${campus.name} campus`}
        fill
        className="object-cover opacity-20"
        priority
        sizes="100vw"
      />
      <div className="relative z-10 container mx-auto max-w-4xl px-4 text-center">
        <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">{campus.name}</h1>
        <div className="mt-4 flex items-center justify-center gap-2 text-primary-foreground/90">
          <MapPin className="h-5 w-5" />
          <span className="text-lg">{campus.location}</span>
        </div>
        <div className="mt-4">
          <Badge variant="secondary" className="text-sm">
            {campus.hours}
          </Badge>
        </div>
      </div>
    </section>
  );
}
