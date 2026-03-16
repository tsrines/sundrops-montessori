'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    number: '01',
    title: 'Request Information',
    description: 'Reach out to learn more about our programs and request information for your preferred campus.',
    cta: { label: 'Select a Campus', href: '/contact/' },
  },
  {
    number: '02',
    title: 'Complete Provided Application',
    description: 'Fill out the enrollment application provided by your campus admissions team.',
  },
  {
    number: '03',
    title: 'Enrollment Process',
    description: "We'll contact you as soon as enrollment is determined.",
  },
] as const;

export function RegistrationSteps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="bg-sundrops-sand/30 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 text-center">
          <h2 className="font-serif text-3xl font-bold uppercase text-gray-900 md:text-4xl">Registration</h2>
          <div className="mx-auto mt-2 h-1 w-16 bg-primary" />
        </div>
        <div className="mb-12 text-center">
          <h3 className="mb-4 font-serif text-xl text-gray-700 md:text-2xl">How To Register Your Child for Sundrops</h3>
          <p className="mx-auto max-w-2xl text-gray-600">
            We welcome you to learn more about our Montessori programs and begin the enrollment process for your child.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
              className="relative rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
              <p className="mb-4 text-4xl font-bold text-primary">{step.number}</p>
              <h4 className="mb-2 font-serif text-xl font-bold text-gray-900">{step.title}</h4>
              <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
              {'cta' in step && (
                <Link
                  href={step.cta.href}
                  className={cn(
                    'mt-4 inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-semibold',
                    'bg-primary text-white transition-colors hover:bg-primary/90'
                  )}>
                  {step.cta.label}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
