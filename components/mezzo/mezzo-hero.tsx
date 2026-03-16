import Image from 'next/image';
import Link from 'next/link';
import { MEZZO_HERO } from '@/lib/data/mezzo-content';

export function MezzoHero() {
  return (
    <section className="relative flex min-h-[60vh] w-full items-center overflow-hidden">
      <Image
        src="/images/programs/middle-school-hero.jpg"
        alt="Students at the Mezzo Farm School"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 container mx-auto max-w-4xl px-4 py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold tracking-tight md:text-6xl">{MEZZO_HERO.titleLine1}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg md:text-xl">{MEZZO_HERO.titleLine2}</p>
        <p className="mt-3 text-base font-semibold tracking-wide">{MEZZO_HERO.gradeRange}</p>
        <div className="mt-8">
          <Link
            href={MEZZO_HERO.cta.href}
            className="inline-block rounded bg-amber-600 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-amber-700">
            {MEZZO_HERO.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
