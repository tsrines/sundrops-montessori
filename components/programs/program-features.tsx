import { CheckCircle } from 'lucide-react';

interface ProgramFeaturesProps {
  features: string[];
}

export function ProgramFeatures({ features }: ProgramFeaturesProps) {
  return (
    <section className="w-full py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="mb-10 text-center font-serif text-3xl font-bold tracking-tight text-foreground">
          Program Highlights
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
