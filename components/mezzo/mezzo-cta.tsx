import Link from 'next/link';
import { MEZZO_CTA } from '@/lib/data/mezzo-content';

export function MezzoCta() {
  return (
    <section className="w-full bg-amber-50 px-4 py-12">
      <div className="mx-auto max-w-4xl text-center">
        <Link
          href={MEZZO_CTA.href}
          className="inline-block rounded bg-amber-600 px-10 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-amber-700">
          {MEZZO_CTA.label}
        </Link>
      </div>
    </section>
  );
}
