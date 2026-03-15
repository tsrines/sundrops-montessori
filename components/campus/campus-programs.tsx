import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

interface CampusProgramsProps {
  programs: string[];
}

const PROGRAM_SLUG_MAP: Record<string, string> = {
  'Infant (Nido)': '/infant-care/',
  'Toddler (Pee Wee)': '/toddler-programs/',
  'Toddler (Wee Casa)': '/toddler-programs/',
  'Preschool & K (Casa)': '/preschool-and-kindergarten/',
  Elementary: '/elementary-school/',
  'Middle School (Mezzo)': '/middle-school/',
};

export function CampusPrograms({ programs }: CampusProgramsProps) {
  return (
    <section className="w-full bg-muted/50 py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="mb-8 text-center font-serif text-3xl font-bold tracking-tight text-foreground">
          Programs Offered
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {programs.map((program) => {
            const href = PROGRAM_SLUG_MAP[program];
            const content = (
              <div className="flex items-center gap-3 rounded-lg border bg-background px-6 py-4 shadow-sm transition-shadow hover:shadow-md">
                <GraduationCap className="h-5 w-5 shrink-0 text-primary" />
                <span className="font-medium text-foreground">{program}</span>
              </div>
            );

            return href ? (
              <Link key={program} href={href}>
                {content}
              </Link>
            ) : (
              <div key={program}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
