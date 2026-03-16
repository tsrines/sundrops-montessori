'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { programs } from '@/lib/data/programs';
import { ProgramCard } from '@/components/program-card';

export function ProgramCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="programs" ref={sectionRef} className="bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Our Programs</p>
          <h2 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">Education for Every Stage</h2>
        </div>

        <div className="grid grid-cols-2 gap-0 md:grid-cols-3 lg:grid-cols-5">
          {programs.map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              className="w-full">
              <ProgramCard program={program} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
