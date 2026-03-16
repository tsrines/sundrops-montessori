import Image from 'next/image';
import { ELEMENTARY_INTRO } from '@/lib/data/elementary-content';

export function ElementaryIntro() {
  return (
    <section className="w-full py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="mb-6 font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {ELEMENTARY_INTRO.heading}
            </h2>
            <div className="space-y-4">
              {ELEMENTARY_INTRO.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[5rem]">
            <Image
              src={ELEMENTARY_INTRO.image.src}
              alt={ELEMENTARY_INTRO.image.alt}
              width={ELEMENTARY_INTRO.image.width}
              height={ELEMENTARY_INTRO.image.height}
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
