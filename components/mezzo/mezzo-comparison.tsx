import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MEZZO_COMPARISON } from '@/lib/data/mezzo-content';

export function MezzoComparison() {
  return (
    <section className="w-full px-4 py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{MEZZO_COMPARISON.subheading}</p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 md:text-4xl">{MEZZO_COMPARISON.heading}</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600">{MEZZO_COMPARISON.description}</p>

        <div className="mt-10 overflow-hidden rounded-lg border border-gray-200">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_auto_auto]">
            <div className="bg-gray-100 p-4" />
            <div className="flex w-36 flex-col items-center justify-center bg-[#E8956A] p-4 text-center text-white sm:w-44">
              <p className="text-xs font-bold uppercase tracking-wide">Traditional</p>
              <p className="text-[11px] leading-tight">Middle School</p>
            </div>
            <div className="flex w-36 flex-col items-center justify-center bg-[#4A9A8E] p-4 text-center text-white sm:w-44">
              <p className="text-xs font-bold uppercase tracking-wide">Mezzo</p>
              <p className="text-[11px] leading-tight">Montessori Middle School</p>
            </div>
          </div>

          {/* Table Rows */}
          {MEZZO_COMPARISON.items.map((item, index) => (
            <div
              key={item.label}
              className={cn(
                'grid grid-cols-[1fr_auto_auto] border-t border-gray-200',
                index % 2 === 0 && 'bg-gray-50'
              )}>
              <div className="flex items-center p-4">
                <span className={cn('text-sm', !item.traditional && !item.mezzo && 'text-gray-400')}>{item.label}</span>
              </div>
              <div className="flex w-36 items-center justify-center p-4 sm:w-44">
                {item.traditional ? (
                  <Check className="h-5 w-5 text-[#E8956A]" />
                ) : (
                  <span className="text-gray-300">&mdash;</span>
                )}
              </div>
              <div className="flex w-36 items-center justify-center p-4 sm:w-44">
                {item.mezzo === 'strikethrough' ? (
                  <span className="text-sm text-gray-400 line-through">Test-Based Model</span>
                ) : item.mezzo ? (
                  <Check className="h-5 w-5 text-[#4A9A8E]" />
                ) : (
                  <span className="text-gray-300">&mdash;</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
