import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calendar | Sundrops Montessori Parent Portal',
};

export default function PortalCalendarPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold">School Calendar</h1>
        <p className="mt-1 text-muted-foreground">
          View upcoming events, holidays, and important dates.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=sundrops.montessori%40gmail.com&ctz=America%2FNew_York"
          className="h-[600px] w-full border-0"
          title="Sundrops Montessori School Calendar"
        />
      </div>
    </div>
  );
}
