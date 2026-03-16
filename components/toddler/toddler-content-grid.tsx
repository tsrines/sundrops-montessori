import { TODDLER_CONTENT_BLOCKS } from '@/lib/data/toddler-content';

export function ToddlerContentGrid() {
  return (
    <section className="w-full">
      <div className="grid md:grid-cols-2">
        <div className="space-y-10 bg-[#3B7FDD] px-8 py-16 md:px-12 md:py-20">
          {TODDLER_CONTENT_BLOCKS.left.map((block) => (
            <div key={block.heading}>
              <h2 className="mb-4 font-serif text-2xl font-bold uppercase tracking-wide text-white">
                {block.heading}
              </h2>
              <div className="space-y-3">
                {block.paragraphs.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed text-white">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-10 bg-[#3B7FDD] px-8 py-16 md:px-12 md:py-20">
          {TODDLER_CONTENT_BLOCKS.right.map((block) => (
            <div key={block.heading}>
              <h2 className="mb-4 font-serif text-2xl font-bold uppercase tracking-wide text-white">
                {block.heading}
              </h2>
              <div className="space-y-3">
                {block.paragraphs.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed text-white">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
