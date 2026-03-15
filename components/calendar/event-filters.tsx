'use client';

import { cn } from '@/lib/utils';
import type { SchoolEvent } from '@/lib/data/events';

const EVENT_TYPE_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'tour', label: 'Tours' },
  { value: 'holiday', label: 'Holidays' },
  { value: 'event', label: 'Events' },
  { value: 'conference', label: 'Conferences' },
  { value: 'teacher-workday', label: 'Teacher Workdays' },
  { value: 'summer-camp', label: 'Summer Camp' },
] as const;

export type EventTypeFilter = SchoolEvent['type'] | 'all';

const VIEW_MODES = [
  { value: 'calendar', label: 'Calendar' },
  { value: 'list', label: 'List' },
] as const;

export type ViewMode = (typeof VIEW_MODES)[number]['value'];

interface EventFiltersProps {
  activeType: EventTypeFilter;
  onTypeChange: (type: EventTypeFilter) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function EventFilters({ activeType, onTypeChange, viewMode, onViewModeChange }: EventFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Event Type Filters */}
      <div className="flex flex-wrap gap-2">
        {EVENT_TYPE_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onTypeChange(filter.value as EventTypeFilter)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              activeType === filter.value
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            )}>
            {filter.label}
          </button>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-1 rounded-lg border bg-muted p-1">
        {VIEW_MODES.map((mode) => (
          <button
            key={mode.value}
            onClick={() => onViewModeChange(mode.value)}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
              viewMode === mode.value
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}>
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
}
