import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TODDLER_HERO } from '@/lib/data/toddler-content';

export function ToddlerHero() {
  return (
    <section className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden md:min-h-[600px]">
      <Image
        src="/images/programs/toddler-programs-hero.jpg"
        alt="Toddler Programs at Sundrops Montessori"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#8300E9] to-transparent" />
      <div className="relative z-10 container mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          {TODDLER_HERO.title}
        </h1>
        <p className="font-script mt-3 text-lg tracking-wider text-white md:text-xl">{TODDLER_HERO.subtitle}</p>
        <p className="mt-2 text-lg text-white">{TODDLER_HERO.ageRange}</p>
        <div className="mt-8">
          <Button asChild size="lg" className="border border-black bg-white text-black hover:bg-white/90">
            <Link href={TODDLER_HERO.cta.href}>{TODDLER_HERO.cta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
