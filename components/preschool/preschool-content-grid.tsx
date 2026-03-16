import { PRESCHOOL_CONTENT_BLOCKS } from '@/lib/data/preschool-content';

export function PreschoolContentGrid() {
  return (
    <section className="w-full">
      <div className="grid md:grid-cols-2">
        <div className="space-y-10 bg-[#4685DD] px-8 py-16 md:px-12 md:py-20">
          <div>
            <h2 className="mb-4 font-serif text-2xl font-bold uppercase tracking-wide text-white">
              {PRESCHOOL_CONTENT_BLOCKS.left.heading}
            </h2>
            <div className="space-y-3">
              {PRESCHOOL_CONTENT_BLOCKS.left.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-white">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-10 bg-[#4685DD] px-8 py-16 md:px-12 md:py-20">
          <div>
            <h2 className="mb-4 font-serif text-2xl font-bold uppercase tracking-wide text-white">
              {PRESCHOOL_CONTENT_BLOCKS.right.heading}
            </h2>
            <p className="mb-4 leading-relaxed text-white">{PRESCHOOL_CONTENT_BLOCKS.right.intro}</p>
            <ul className="space-y-3">
              {PRESCHOOL_CONTENT_BLOCKS.right.yearCycle.map((year) => (
                <li key={year.label} className="leading-relaxed text-white">
                  <span className="font-semibold italic">{year.label}</span> &ndash; {year.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
