'use client';

import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SchoolEvent } from '@/lib/data/events';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

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

const EVENT_TYPE_COLORS: Record<SchoolEvent['type'], string> = {
  tour: 'bg-blue-500',
  holiday: 'bg-red-500',
  event: 'bg-green-500',
  conference: 'bg-purple-500',
  'teacher-workday': 'bg-amber-500',
  'summer-camp': 'bg-orange-500',
};

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function dateToString(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function isDateInRange(dateStr: string, startStr: string, endStr?: string): boolean {
  if (!endStr) return dateStr === startStr;
  return dateStr >= startStr && dateStr <= endStr;
}

interface EventCalendarProps {
  year: number;
  month: number;
  events: SchoolEvent[];
  selectedDate: string | null;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (date: string) => void;
}

export function EventCalendar({
  year,
  month,
  events,
  selectedDate,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
}: EventCalendarProps) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, SchoolEvent[]>();
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = dateToString(year, month, day);
      const dayEvents = events.filter((event) => isDateInRange(dateStr, event.date, event.endDate));
      if (dayEvents.length > 0) {
        map.set(dateStr, dayEvents);
      }
    }
    return map;
  }, [events, year, month, daysInMonth]);

  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="rounded-xl border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <button
          onClick={onPrevMonth}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors"
          aria-label="Previous month">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h3 className="text-lg font-semibold text-foreground">
          {MONTH_NAMES[month]} {year}
        </h3>
        <button
          onClick={onNextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors"
          aria-label="Next month">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 border-b">
        {DAY_LABELS.map((label) => (
          <div key={label} className="py-2 text-center text-xs font-medium text-muted-foreground">
            {label}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {blanks.map((i) => (
          <div key={`blank-${i}`} className="min-h-[64px] border-b border-r p-1 last:border-r-0" />
        ))}
        {days.map((day) => {
          const dateStr = dateToString(year, month, day);
          const dayEvents = eventsByDate.get(dateStr);
          const isSelected = dateStr === selectedDate;
          const hasEvents = dayEvents && dayEvents.length > 0;

          return (
            <button
              key={day}
              onClick={() => onSelectDate(dateStr)}
              className={cn(
                'min-h-[64px] border-b border-r p-1 text-left transition-colors hover:bg-muted/50 last:border-r-0',
                isSelected && 'bg-primary/10'
              )}>
              <span
                className={cn(
                  'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs',
                  isSelected && 'bg-primary text-primary-foreground font-medium'
                )}>
                {day}
              </span>
              {hasEvents && (
                <div className="mt-0.5 flex flex-wrap gap-0.5">
                  {dayEvents.slice(0, 3).map((event) => (
                    <span key={event.id} className={cn('h-1.5 w-1.5 rounded-full', EVENT_TYPE_COLORS[event.type])} />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="border-t p-4">
          <h4 className="text-sm font-medium text-foreground">
            Events on{' '}
            {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </h4>
          {eventsByDate.get(selectedDate) ? (
            <ul className="mt-2 space-y-2">
              {eventsByDate.get(selectedDate)!.map((event) => (
                <li key={event.id} className="flex items-start gap-2">
                  <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', EVENT_TYPE_COLORS[event.type])} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">No events on this date.</p>
          )}
        </div>
      )}
    </div>
  );
}
