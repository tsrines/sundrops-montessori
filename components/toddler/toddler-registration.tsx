import Link from 'next/link';
import { TODDLER_REGISTRATION } from '@/lib/data/toddler-content';

const STEP_COLORS = ['text-[#2B76DF]', 'text-[#FF7355]', 'text-[#74BC19]'] as const;

export function ToddlerRegistration() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-[#E3E3E8] py-16 md:py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="mb-2 font-serif text-3xl font-bold tracking-tight text-gray-800">
          {TODDLER_REGISTRATION.heading}
        </h2>
        <p className="mb-4 text-gray-500">{TODDLER_REGISTRATION.subheading}</p>
        <p className="mb-12 max-w-2xl leading-relaxed text-gray-500">{TODDLER_REGISTRATION.description}</p>

        <div className="grid gap-10 md:grid-cols-3">
          {TODDLER_REGISTRATION.steps.map((step, index) => (
            <div key={step.number}>
              <p className={`mb-1 font-serif text-4xl font-bold ${STEP_COLORS[index]}`}>
                {String(step.number).padStart(2, '0')}.
              </p>
              <h3 className="mb-2 text-xl font-bold text-gray-800">{step.title}</h3>
              <p className="leading-relaxed text-gray-500">{step.description}</p>
              {'campusLinks' in step && step.campusLinks && (
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                  {step.campusLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm font-medium text-gray-800 underline underline-offset-4 hover:text-gray-600">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
