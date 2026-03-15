import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { SchoolEvent } from '@/lib/data/events';

const EVENT_TYPE_LABELS: Record<SchoolEvent['type'], string> = {
  tour: 'Tour',
  holiday: 'Holiday',
  event: 'Event',
  conference: 'Conference',
  'teacher-workday': 'Teacher Workday',
  'summer-camp': 'Summer Camp',
};

const EVENT_TYPE_BADGE_COLORS: Record<SchoolEvent['type'], string> = {
  tour: 'bg-blue-100 text-blue-800 border-blue-200',
  holiday: 'bg-red-100 text-red-800 border-red-200',
  event: 'bg-green-100 text-green-800 border-green-200',
  conference: 'bg-purple-100 text-purple-800 border-purple-200',
  'teacher-workday': 'bg-amber-100 text-amber-800 border-amber-200',
  'summer-camp': 'bg-orange-100 text-orange-800 border-orange-200',
};

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function formatDateRange(startStr: string, endStr?: string): string {
  if (!endStr) return formatDate(startStr);
  return `${formatDate(startStr)} - ${formatDate(endStr)}`;
}

function getMonthKey(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return `${date.getFullYear()}-${date.getMonth()}`;
}

function getMonthLabel(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

interface EventListProps {
  events: SchoolEvent[];
}

export function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted-foreground">No events match your current filter.</p>
      </div>
    );
  }

  // Group events by month
  const grouped = events.reduce<{ key: string; label: string; events: SchoolEvent[] }[]>((acc, event) => {
    const key = getMonthKey(event.date);
    const existing = acc.find((group) => group.key === key);
    if (existing) {
      existing.events.push(event);
    } else {
      acc.push({ key, label: getMonthLabel(event.date), events: [event] });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-8">
      {grouped.map((group) => (
        <div key={group.key}>
          <h3 className="mb-4 text-lg font-semibold text-foreground">{group.label}</h3>
          <div className="space-y-3">
            {group.events.map((event) => (
              <div key={event.id} className="rounded-lg border bg-card p-4 transition-shadow hover:shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">{event.title}</h4>
                      <Badge className={cn('text-xs', EVENT_TYPE_BADGE_COLORS[event.type])} variant="outline">
                        {EVENT_TYPE_LABELS[event.type]}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
                    {event.campus && <p className="mt-1 text-xs text-muted-foreground">Campus: {event.campus}</p>}
                  </div>
                  <p className="shrink-0 text-sm font-medium text-primary">
                    {formatDateRange(event.date, event.endDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
