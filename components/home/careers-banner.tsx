import Link from 'next/link';
import { cn } from '@/lib/utils';

export function CareersBanner() {
  return (
    <section className="bg-sundrops-gold px-4 py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
        <h3 className="text-xl font-bold uppercase tracking-wide text-white">Looking for a Montessori Career?</h3>
        <h2 className="font-serif text-3xl font-bold uppercase text-white md:text-4xl">
          We&apos;re Now Accepting Resumes
        </h2>
        <Link
          href="/careers/"
          className={cn(
            'mt-2 inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-semibold uppercase',
            'bg-white text-sundrops-gold shadow-lg transition-colors hover:bg-white/90'
          )}>
          Learn More
        </Link>
      </div>
    </section>
  );
}
