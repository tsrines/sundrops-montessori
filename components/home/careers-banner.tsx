import Link from 'next/link';
import { cn } from '@/lib/utils';

export function CareersBanner() {
  return (
    <section className="bg-sundrops-warmth px-4 py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">Looking for a Montessori Career?</h2>
        <p className="max-w-2xl text-lg text-white/90">
          We&apos;re now accepting resumes. Join our team of dedicated educators.
        </p>
        <Link
          href="/careers/"
          className={cn(
            'inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-semibold',
            'bg-white text-sundrops-warmth shadow-lg transition-colors hover:bg-white/90'
          )}>
          View Open Positions
        </Link>
      </div>
    </section>
  );
}
