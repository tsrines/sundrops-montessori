import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ELEMENTARY_HERO } from '@/lib/data/elementary-content';

export function ElementaryHero() {
  return (
    <section className="relative w-full overflow-hidden bg-emerald-100 py-20 md:py-28">
      <Image
        src="/images/programs/elementary-hero.jpg"
        alt="Elementary School at Sundrops Montessori"
        fill
        className="object-cover opacity-20"
        priority
        sizes="100vw"
      />
      <div className="relative z-10 container mx-auto max-w-4xl px-4 text-center">
        <p className="font-script mb-3 text-lg text-primary md:text-xl">{ELEMENTARY_HERO.subtitle}</p>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {ELEMENTARY_HERO.title}
        </h1>
        <div className="mt-4">
          <Badge variant="secondary" className="text-sm">
            {ELEMENTARY_HERO.gradeRange}
          </Badge>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href={ELEMENTARY_HERO.cta.contact.href}>{ELEMENTARY_HERO.cta.contact.label}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={ELEMENTARY_HERO.cta.learnMore.href}>{ELEMENTARY_HERO.cta.learnMore.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
