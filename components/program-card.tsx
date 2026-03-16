'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
        className="block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <div
          className={cn(
            'flex h-full flex-col items-center justify-center rounded-lg p-6 text-center transition-shadow duration-300 hover:shadow-lg',
            program.color
          )}>
          <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-gray-800">{program.name}</h3>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-600">{program.montessoriName}</p>
          <p className="mb-3 text-xs text-gray-500">{program.ageRange}</p>
          <ArrowRight className="h-4 w-4 text-gray-400" />
        </div>
      </Link>
    </motion.div>
  );
}
