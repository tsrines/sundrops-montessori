import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface CampusAvailabilityProps {
  campuses: string[];
}

const CAMPUS_SLUG_MAP: Record<string, string> = {
  'Bridge Campus': '/bridge-campus/',
  'Daniel Island Campus': '/daniel-island-campus/',
  'Palmetto Campus': '/palmetto-campus/',
};

export function CampusAvailability({ campuses }: CampusAvailabilityProps) {
  return (
    <section className="w-full bg-muted/50 py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="mb-8 text-center font-serif text-3xl font-bold tracking-tight text-foreground">Available At</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {campuses.map((campus) => {
            const href = CAMPUS_SLUG_MAP[campus];
            const content = (
              <div className="flex items-center gap-2 rounded-lg border bg-background px-6 py-4 shadow-sm transition-shadow hover:shadow-md">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">{campus}</span>
              </div>
            );

            return href ? (
              <Link key={campus} href={href}>
                {content}
              </Link>
            ) : (
              <div key={campus}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
