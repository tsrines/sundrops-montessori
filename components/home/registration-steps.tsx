'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ClipboardList, FileText, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    number: 1,
    icon: ClipboardList,
    title: 'Request Information',
    description:
      'Reach out to learn more about our programs and request information for your preferred campus location.',
  },
  {
    number: 2,
    icon: FileText,
    title: 'Complete Application',
    description:
      'Fill out the enrollment application for your child. Our admissions team will review and follow up promptly.',
  },
  {
    number: 3,
    icon: CheckCircle,
    title: 'Enrollment Process',
    description:
      'Schedule a campus tour, meet our educators, and complete the final enrollment steps to join the Sundrops family.',
  },
] as const;

export function RegistrationSteps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="bg-white px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">Begin Your Sundrops Journey</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
                className="relative rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                <div
                  className={cn(
                    'mx-auto mb-4 flex h-10 w-10 items-center justify-center',
                    'rounded-full bg-primary text-sm font-bold text-white'
                  )}>
                  {step.number}
                </div>
                <div className="mb-4 flex justify-center">
                  <Icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mb-2 font-serif text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact/"
            className={cn(
              'inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-semibold',
              'bg-primary text-white shadow-lg transition-colors hover:bg-primary/90'
            )}>
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
