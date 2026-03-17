import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const STATUS_STYLES: Record<string, string> = {
  // Application statuses
  pending: 'bg-yellow-100 text-yellow-800',
  under_review: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  waitlisted: 'bg-purple-100 text-purple-800',
  declined: 'bg-red-100 text-red-800',
  withdrawn: 'bg-gray-100 text-gray-600',
  // Re-enrollment statuses
  confirmed: 'bg-green-100 text-green-800',
  // Incident statuses
  draft: 'bg-gray-100 text-gray-600',
  submitted: 'bg-blue-100 text-blue-800',
  parent_notified: 'bg-yellow-100 text-yellow-800',
  acknowledged: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-500',
  // Severity
  minor: 'bg-yellow-100 text-yellow-800',
  moderate: 'bg-orange-100 text-orange-800',
  serious: 'bg-red-100 text-red-800',
  // Enrollment statuses
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-600',
  // Announcement priority
  normal: 'bg-gray-100 text-gray-700',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

const STATUS_LABELS: Record<string, string> = {
  under_review: 'Under Review',
  parent_notified: 'Parent Notified',
  'pee-wee-wee-casa': 'Toddler',
  'daniel-island': 'Daniel Island',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-600';
  const label = STATUS_LABELS[status] ?? status.replace(/_/g, ' ').replace(/-/g, ' ');

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
        style,
        className,
      )}>
      {label}
    </span>
  );
}
