'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { Campus } from '@/lib/data/campuses';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CampusCardProps {
  campus: Campus;
  className?: string;
}

export function CampusCard({ campus, className }: CampusCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn('h-full', className)}>
      <Link
        href={`/${campus.slug}/`}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl">
        <Card className="group h-full transition-shadow duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">{campus.name}</CardTitle>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>{campus.location}</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{campus.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {campus.programs.map((program) => (
                <Badge key={program} variant="outline" className="text-xs">
                  {program}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <span className="text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
              View Campus &rarr;
            </span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
