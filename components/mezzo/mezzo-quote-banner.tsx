import { MEZZO_STUDENT_QUOTE } from '@/lib/data/mezzo-content';

export function MezzoQuoteBanner() {
  return (
    <section className="w-full bg-[#E8956A] px-4 py-16 md:py-20">
      <div className="mx-auto max-w-3xl text-center text-white">
        <blockquote>
          <p className="font-serif text-2xl leading-relaxed md:text-3xl">&ldquo;{MEZZO_STUDENT_QUOTE.quote}&rdquo;</p>
          <footer className="mt-4 text-sm font-medium">{MEZZO_STUDENT_QUOTE.attribution}</footer>
        </blockquote>
      </div>
    </section>
  );
}
