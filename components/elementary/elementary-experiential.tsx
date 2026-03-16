import { ELEMENTARY_EXPERIENTIAL } from '@/lib/data/elementary-content';

export function ElementaryExperiential() {
  return (
    <section className="w-full bg-muted/50 py-16 md:py-20">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-6 font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {ELEMENTARY_EXPERIENTIAL.heading}
        </h2>
        <div className="space-y-4">
          {ELEMENTARY_EXPERIENTIAL.paragraphs.map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
