import Link from 'next/link';
import { cn } from '@/lib/utils';

export function MezzoBanner() {
  return (
    <div className="bg-primary text-white">
      <div className="mx-auto max-w-5xl px-4 py-6 text-center">
        <h3 className="mb-2 text-lg font-bold uppercase tracking-wide md:text-xl">
          Looking for an Alternative to Traditional Middle School?
        </h3>
        <p className="mx-auto mb-4 max-w-3xl text-sm leading-relaxed text-white/90 md:text-base">
          NOW ENROLLING for our Mezzo Montessori School. A middle school for 7th-9th grades designed to meet the needs
          of the adolescent through our integrated Farm School Program. Serving the greater Charleston, SC area.
        </p>
        <Link
          href="/middle-school/"
          className={cn(
            'inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-semibold',
            'bg-white text-primary transition-colors hover:bg-white/90'
          )}>
          Learn More
        </Link>
      </div>
    </div>
  );
}
