import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CtaBannerProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  variant?: 'primary' | 'accent';
}

export function CtaBanner({ title, description, buttonText, buttonHref, variant = 'primary' }: CtaBannerProps) {
  return (
    <section
      className={cn(
        'w-full py-16 md:py-20',
        variant === 'primary' && 'bg-primary text-primary-foreground',
        variant === 'accent' && 'bg-accent text-accent-foreground'
      )}>
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        {description && <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">{description}</p>}
        <div className="mt-8">
          <Button asChild size="lg" variant={variant === 'primary' ? 'secondary' : 'default'} className="text-base">
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
