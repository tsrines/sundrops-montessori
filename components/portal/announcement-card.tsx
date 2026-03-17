import { AlertCircle, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnnouncementCardProps {
  title: string;
  body: string;
  priority: string;
  publishedAt: string;
  campusSlug?: string | null;
}

const CAMPUS_LABELS: Record<string, string> = {
  bridge: 'Bridge',
  'daniel-island': 'Daniel Island',
  palmetto: 'Palmetto',
  farm: 'Farm',
};

export function AnnouncementCard({ title, body, priority, publishedAt, campusSlug }: AnnouncementCardProps) {
  const isUrgent = priority === 'urgent';
  const date = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card className={cn(isUrgent && 'border-destructive/50 bg-destructive/5')}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className={cn('mt-0.5 flex-shrink-0', isUrgent ? 'text-destructive' : 'text-primary')}>
            {isUrgent ? <AlertCircle className="h-5 w-5" /> : <Info className="h-5 w-5" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium">{title}</h3>
              <div className="flex flex-shrink-0 items-center gap-2">
                {campusSlug && (
                  <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                    {CAMPUS_LABELS[campusSlug] || campusSlug}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">{date}</span>
              </div>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
