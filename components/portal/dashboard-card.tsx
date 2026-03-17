import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  href: string;
  className?: string;
}

export function DashboardCard({ title, value, description, icon: Icon, href, className }: DashboardCardProps) {
  return (
    <Link href={href}>
      <Card className={cn('transition-shadow hover:shadow-md', className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
