import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MEZZO_BEYOND_BOOKS } from '@/lib/data/mezzo-content';

export function MezzoBeyondBooks() {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-20">
      <Image
        src="/images/programs/middle-school-hero.jpg"
        alt=""
        fill
        className="object-cover opacity-15"
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="relative z-10 container mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-6 font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {MEZZO_BEYOND_BOOKS.heading}
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{MEZZO_BEYOND_BOOKS.body}</p>
        <Button asChild size="lg">
          <Link href={MEZZO_BEYOND_BOOKS.cta.href}>{MEZZO_BEYOND_BOOKS.cta.label}</Link>
        </Button>
      </div>
    </section>
  );
}
