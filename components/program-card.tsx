'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Program } from '@/lib/data/programs';
import { cn } from '@/lib/utils';

interface ProgramCardProps {
  program: Program;
  className?: string;
}

export function ProgramCard({ program, className }: ProgramCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn('h-full', className)}>
      <Link
        href={`/${program.slug}/`}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <div
          className="flex h-full flex-col items-start justify-between px-6 py-10 text-left transition-shadow duration-300 hover:shadow-lg lg:py-16"
          style={{ backgroundColor: program.color }}>
          <div>
            <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-white">{program.name}</h3>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/80">
              {program.montessoriName}
            </p>
            <p className="text-xs text-white/70">{program.ageRange}</p>
          </div>
          <svg className="mt-6 text-white" width="60" height="12" viewBox="0 0 60 12" fill="none">
            <path d="M0 6h54M54 6l-5-5M54 6l-5 5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
