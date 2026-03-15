'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Program } from '@/lib/data/programs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl">
        <Card className="group h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
          <div className={cn('relative h-48 w-full overflow-hidden', program.color)}>
            <Image
              src={program.image}
              alt={program.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="text-lg">{program.name}</CardTitle>
                <p className="font-script mt-1 text-sm text-primary">{program.montessoriName}</p>
              </div>
              <Badge variant="secondary" className="shrink-0">
                {program.ageRange}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3 text-sm text-muted-foreground">{program.description}</p>
          </CardContent>
          <CardFooter>
            <span className="text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
              Learn More &rarr;
            </span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
