import Image from 'next/image';
import { ELEMENTARY_BEYOND_BOOKS } from '@/lib/data/elementary-content';

export function ElementaryBeyondBooks() {
  return (
    <section className="w-full py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {ELEMENTARY_BEYOND_BOOKS.heading}
          </h2>
          <p className="mx-auto max-w-3xl leading-relaxed text-muted-foreground">{ELEMENTARY_BEYOND_BOOKS.body}</p>
        </div>
        <div className="space-y-4">
          {ELEMENTARY_BEYOND_BOOKS.gallery.rows.map((row, rowIndex) => (
            <div key={rowIndex} className={`grid gap-4 ${row.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
              {row.map((image, imageIndex) => (
                <div key={imageIndex} className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
