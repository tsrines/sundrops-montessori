import Image from 'next/image';
import Link from 'next/link';
import { MEZZO_PROGRAM_HERO } from '@/lib/data/mezzo-program-content';

export function MezzoProgramHero() {
  return (
    <section className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden md:min-h-[600px]">
      <Image
        src="/images/campuses/farm/FarmSchool-2.jpg"
        alt="The Sundrops Mezzo Program yurt campus"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#6B2D8B]/85 to-[#2B6CB0]/85" />
      <div className="relative z-10 container mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          {MEZZO_PROGRAM_HERO.title}
        </h1>
        <h3 className="font-script mt-3 text-lg tracking-wider text-white md:text-xl">{MEZZO_PROGRAM_HERO.subtitle}</h3>
        <p className="mt-2 text-lg text-white">{MEZZO_PROGRAM_HERO.gradeRange}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={MEZZO_PROGRAM_HERO.cta.contact.href}
            className="inline-block rounded border-2 border-white bg-transparent px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/20">
            {MEZZO_PROGRAM_HERO.cta.contact.label}
          </Link>
          <Link
            href={MEZZO_PROGRAM_HERO.cta.learnMore.href}
            className="inline-block rounded bg-[#4CAF50] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#43A047]">
            {MEZZO_PROGRAM_HERO.cta.learnMore.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
