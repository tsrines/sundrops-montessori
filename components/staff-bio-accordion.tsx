'use client';

import type { ReactNode } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface StaffBioAccordionProps {
  staffName: string;
  bio: string[];
  quote?: string;
  children: ReactNode;
}

export function StaffBioAccordion({ staffName, bio, quote, children }: StaffBioAccordionProps) {
  return (
    <div className="flex w-48 flex-col items-center">
      {children}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={staffName} className="border-0">
          <AccordionTrigger className="justify-center gap-2 text-xs text-primary hover:no-underline">
            Read Bio
          </AccordionTrigger>
          <AccordionContent className="text-left text-sm text-muted-foreground">
            {quote && (
              <blockquote className="mb-3 border-l-2 border-primary/30 pl-3 italic">&ldquo;{quote}&rdquo;</blockquote>
            )}
            {bio.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mb-2 last:mb-0">
                {paragraph}
              </p>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
