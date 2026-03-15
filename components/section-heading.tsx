import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({ eyebrow, title, description, centered = false }: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 max-w-3xl', centered && 'mx-auto text-center')}>
      {eyebrow && (
        <p className="font-script mb-2 text-lg text-primary md:text-xl" aria-label={eyebrow}>
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-lg text-muted-foreground">{description}</p>}
    </div>
  );
}
