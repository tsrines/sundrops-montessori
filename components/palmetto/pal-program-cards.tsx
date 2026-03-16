import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PAL_PROGRAMS } from '@/lib/data/palmetto-content';

export function PalProgramCards() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3">
        {PAL_PROGRAMS.map((program) => (
          <Link
            key={program.name}
            href={program.href}
            className="group flex flex-col justify-between p-6 text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: program.bgColor }}>
            <div>
              <p className="text-lg font-bold">{program.name}</p>
              <p className="mt-1 text-sm font-medium uppercase tracking-wider">{program.subtitle}</p>
              <p className="mt-1 text-sm">{program.ageRange}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
