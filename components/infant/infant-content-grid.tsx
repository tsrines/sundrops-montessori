import { INFANT_CONTENT_BLOCKS } from '@/lib/data/infant-content';

export function InfantContentGrid() {
  return (
    <section className="w-full">
      <div className="grid md:grid-cols-2">
        <div className="space-y-6 bg-[#2B90E2] px-8 py-16 md:px-12 md:py-20">
          <h2 className="mb-4 font-serif text-2xl font-bold uppercase tracking-wide text-white">
            {INFANT_CONTENT_BLOCKS.heading}
          </h2>
          {INFANT_CONTENT_BLOCKS.left.map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-white">
              {typeof paragraph === 'string' ? (
                paragraph
              ) : (
                <>
                  {paragraph.prefix}
                  <strong>{paragraph.bold}</strong>
                  {paragraph.suffix}
                </>
              )}
            </p>
          ))}
        </div>
        <div className="space-y-6 bg-[#2B90E2] px-8 py-16 md:px-12 md:py-20">
          {INFANT_CONTENT_BLOCKS.right.map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-white">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
