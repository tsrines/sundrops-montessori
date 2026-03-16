import Image from 'next/image';
import type { Program } from '@/lib/data/programs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProgramHeroProps {
  program: Program;
}

export function ProgramHero({ program }: ProgramHeroProps) {
  return (
    <section className={cn('relative w-full overflow-hidden py-20 md:py-28', program.color)}>
      <Image
        src={program.image}
        alt={`${program.name} at Sundrops Montessori`}
        fill
        className="object-cover opacity-20"
        priority
        sizes="100vw"
      />
      <div className="relative z-10 container mx-auto max-w-4xl px-4 text-center">
        <p className="font-script mb-3 text-lg text-primary md:text-xl">{program.montessoriName}</p>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">{program.name}</h1>
        <div className="mt-4">
          <Badge variant="secondary" className="text-sm">
            {program.ageRange}
          </Badge>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{program.description}</p>
      </div>
    </section>
  );
}
