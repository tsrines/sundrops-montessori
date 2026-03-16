'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ClipboardList, FileText, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MEZZO_REGISTRATION } from '@/lib/data/mezzo-content';

const STEP_ICONS = [ClipboardList, FileText, CheckCircle] as const;

export function MezzoRegistration() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden py-16 md:py-20">
      <Image
        src="/images/programs/middle-school-hero.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gray-900/80" />
      <div className="relative z-10 container mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="mb-2 font-serif text-3xl font-bold tracking-tight text-white md:text-4xl">
              {MEZZO_REGISTRATION.heading}
            </h2>
            <h3 className="mb-4 text-lg font-medium text-gray-300">{MEZZO_REGISTRATION.subheading}</h3>
            <p className="leading-relaxed text-gray-200">{MEZZO_REGISTRATION.description}</p>
          </div>
          <div className="flex flex-col gap-6">
            {MEZZO_REGISTRATION.steps.map((step, index) => {
              const Icon = STEP_ICONS[index];
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
                  className="rounded-xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center',
                        'rounded-full bg-primary text-sm font-bold text-white'
                      )}>
                      {step.number}
                    </div>
                    {Icon && <Icon className="h-5 w-5 text-primary" />}
                    <h4 className="font-serif text-lg font-bold text-white">{step.title}</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300">{step.description}</p>
                  {'campusLinks' in step && step.campusLinks && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {step.campusLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-sm font-medium text-primary underline-offset-4 hover:underline">
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
