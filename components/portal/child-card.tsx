import Link from 'next/link';
import { GraduationCap, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ChildCardProps {
  id: string;
  firstName: string;
  lastName: string;
  campusSlug: string;
  programSlug: string;
  classroom?: string | null;
  sessionType: string;
  enrollmentStatus: string;
}

const CAMPUS_LABELS: Record<string, string> = {
  bridge: 'Bridge Campus',
  'daniel-island': 'Daniel Island',
  palmetto: 'Palmetto Campus',
  farm: 'Farm Campus',
};

const PROGRAM_LABELS: Record<string, string> = {
  nido: 'Nido (Infant)',
  'pee-wee-wee-casa': 'Pee Wee / Wee Casa',
  casa: 'Casa',
  elementary: 'Elementary',
  mezzo: 'Mezzo',
};

const SESSION_LABELS: Record<string, string> = {
  'half-day': 'Half Day',
  'school-day': 'School Day',
  'full-day': 'Full Day',
};

export function ChildCard({
  id,
  firstName,
  lastName,
  campusSlug,
  programSlug,
  classroom,
  sessionType,
  enrollmentStatus,
}: ChildCardProps) {
  return (
    <Link href={`/portal/children/${id}`}>
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {firstName} {lastName}
            </CardTitle>
            <span
              className={cn(
                'rounded-full px-2.5 py-0.5 text-xs font-medium',
                enrollmentStatus === 'active'
                  ? 'bg-green-100 text-green-800'
                  : enrollmentStatus === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
              )}>
              {enrollmentStatus}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>{CAMPUS_LABELS[campusSlug] || campusSlug}</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>
              {PROGRAM_LABELS[programSlug] || programSlug}
              {classroom && ` - ${classroom}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            <span>{SESSION_LABELS[sessionType] || sessionType}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
