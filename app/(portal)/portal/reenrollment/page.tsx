'use client';

import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { api } from '@/lib/api-client';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';

interface Reenrollment {
  id: string;
  schoolYear: string;
  status: string;
  campusSlug: string;
  programSlug: string;
  sessionType: string;
  notes: string | null;
  child: {
    firstName: string;
    lastName: string;
    campusSlug: string;
    programSlug: string;
    sessionType: string;
  };
}

export default function ReenrollmentPage() {
  const [reenrollments, setReenrollments] = useState<Reenrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<{ reenrollments: Reenrollment[] }>('/api/portal/reenrollments')
      .then((res) => {
        setReenrollments(res.reenrollments);
        const initialNotes: Record<string, string> = {};
        res.reenrollments.forEach((r) => {
          initialNotes[r.id] = r.notes ?? '';
        });
        setNotes(initialNotes);
      })
      .catch(() => setError('Failed to load re-enrollment information'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (reenrollment: Reenrollment) => {
    setSaving(reenrollment.id);
    try {
      await api.put(`/api/portal/reenrollments/${reenrollment.id}`, {
        campusSlug: reenrollment.campusSlug,
        programSlug: reenrollment.programSlug,
        sessionType: reenrollment.sessionType,
        notes: notes[reenrollment.id] || undefined,
      });
      setSaved((prev) => ({ ...prev, [reenrollment.id]: true }));
    } catch {
      setError('Failed to submit re-enrollment');
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (reenrollments.length === 0) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="font-serif text-2xl font-semibold">Re-enrollment</h1>
        <div className="rounded-xl border bg-card p-10 text-center">
          <p className="text-muted-foreground">
            Re-enrollment is not currently open. Check back later or contact the school.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold">Re-enrollment</h1>
        <p className="mt-1 text-muted-foreground">
          Confirm re-enrollment for each child for the upcoming school year.
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="space-y-4">
        {reenrollments.map((r) => (
          <div key={r.id} className="rounded-lg border bg-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">
                  {r.child.firstName} {r.child.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">{r.schoolYear}</p>
              </div>
              <StatusBadge status={r.status} />
            </div>

            <dl className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Campus</dt>
                <dd className="mt-0.5 capitalize font-medium">
                  {r.campusSlug.replace(/-/g, ' ')}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Program</dt>
                <dd className="mt-0.5 capitalize font-medium">
                  {r.programSlug.replace(/-/g, ' ')}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Session</dt>
                <dd className="mt-0.5 capitalize font-medium">
                  {r.sessionType.replace(/-/g, ' ')}
                </dd>
              </div>
            </dl>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Notes (optional)
              </label>
              <textarea
                value={notes[r.id] ?? ''}
                onChange={(e) => setNotes((prev) => ({ ...prev, [r.id]: e.target.value }))}
                rows={2}
                disabled={r.status === 'confirmed'}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Any questions or notes for the school..."
              />
            </div>

            {saved[r.id] ? (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                Submitted successfully
              </div>
            ) : (
              <Button
                onClick={() => handleSubmit(r)}
                disabled={saving === r.id || r.status === 'confirmed'}
                size="sm">
                {saving === r.id
                  ? 'Submitting...'
                  : r.status === 'confirmed'
                    ? 'Confirmed'
                    : 'Confirm Re-enrollment'}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
