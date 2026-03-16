import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DI_HERO } from '@/lib/data/daniel-island-content';

export function DiHero() {
  return (
    <section className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden md:min-h-[600px]">
      <Image
        src="/images/campuses/daniel-island-hero.jpg"
        alt="Daniel Island Campus - Authentic Montessori School in Charleston, SC"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#8300E9] to-transparent" />
      <div className="relative z-10 container mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          {DI_HERO.titleLine1}
        </h1>
        <p className="font-script mt-3 text-lg tracking-wider text-white md:text-xl">{DI_HERO.titleLine2}</p>
        <div className="mt-8">
          <Button asChild size="lg" className="border border-black bg-white text-black hover:bg-white/90">
            <Link href={DI_HERO.cta.href}>{DI_HERO.cta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
