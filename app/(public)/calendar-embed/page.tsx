'use client';

import { useState, useMemo, useCallback } from 'react';
import { schoolEvents, type SchoolEvent } from '@/lib/data/events';
import { EventFilters, type EventTypeFilter, type ViewMode } from '@/components/calendar/event-filters';
import { EventCalendar } from '@/components/calendar/event-calendar';
import { EventList } from '@/components/calendar/event-list';

export default function CalendarEmbedPage() {
  const [activeType, setActiveType] = useState<EventTypeFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentMonth, setCurrentMonth] = useState(7); // August (0-indexed)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    if (activeType === 'all') return schoolEvents;
    return schoolEvents.filter((event: SchoolEvent) => event.type === activeType);
  }, [activeType]);

  const handlePrevMonth = useCallback(() => {
    setSelectedDate(null);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }, [currentMonth]);

  const handleNextMonth = useCallback(() => {
    setSelectedDate(null);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }, [currentMonth]);

  const handleSelectDate = useCallback(
    (date: string) => {
      setSelectedDate(date === selectedDate ? null : date);
    },
    [selectedDate]
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-primary/5 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            School Calendar 2025-2026
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Stay up to date with important school dates, events, tours, and holidays throughout the year.
          </p>
        </div>
      </section>

      {/* Calendar Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          {/* Filters */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <EventFilters
              activeType={activeType}
              onTypeChange={setActiveType}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>

          {/* Calendar or List View */}
          {viewMode === 'calendar' ? (
            <EventCalendar
              year={currentYear}
              month={currentMonth}
              events={filteredEvents}
              selectedDate={selectedDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onSelectDate={handleSelectDate}
            />
          ) : (
            <EventList events={filteredEvents} />
          )}

          {/* Legend */}
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-lg border bg-muted/50 p-4">
            <span className="text-xs font-medium text-muted-foreground">Legend:</span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Tours
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> Holidays
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" /> Events
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-500" /> Conferences
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Teacher Workdays
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-500" /> Summer Camp
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
