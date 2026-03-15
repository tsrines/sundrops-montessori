import type { Campus } from '@/lib/data/campuses';
import { MapPin, Phone, Mail } from 'lucide-react';

interface CampusInfoProps {
  campus: Campus;
}

export function CampusInfo({ campus }: CampusInfoProps) {
  return (
    <section className="w-full py-16 md:py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-6 rounded-xl border bg-card p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-foreground">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">{campus.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <a href={`tel:${campus.phone}`} className="text-muted-foreground hover:text-foreground">
                  {campus.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <a href={`mailto:${campus.email}`} className="text-muted-foreground hover:text-foreground">
                  {campus.email}
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-2xl font-bold text-foreground">About This Campus</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{campus.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
