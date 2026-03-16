import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MEZZO_HERO } from '@/lib/data/mezzo-content';

export function MezzoHero() {
  return (
    <section className="relative w-full overflow-hidden bg-violet-100 py-20 md:py-28">
      <Image
        src="/images/programs/middle-school-hero.jpg"
        alt="Middle School at Sundrops Montessori"
        fill
        className="object-cover opacity-20"
        priority
        sizes="100vw"
      />
      <div className="relative z-10 container mx-auto max-w-4xl px-4 text-center">
        <p className="font-script mb-3 text-lg text-primary md:text-xl">{MEZZO_HERO.subtitle}</p>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">{MEZZO_HERO.title}</h1>
        <div className="mt-4">
          <Badge variant="secondary" className="text-sm">
            {MEZZO_HERO.gradeRange}
          </Badge>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href={MEZZO_HERO.cta.contact.href}>{MEZZO_HERO.cta.contact.label}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={MEZZO_HERO.cta.learnMore.href}>{MEZZO_HERO.cta.learnMore.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
