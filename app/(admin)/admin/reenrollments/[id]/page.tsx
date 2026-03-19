'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
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
  adminNotes: string | null;
  createdAt: string;
  child: {
    id: string;
    firstName: string;
    lastName: string;
    campusSlug: string;
    programSlug: string;
    sessionType: string;
  };
}

export default function ReenrollmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [reenrollment, setReenrollment] = useState<Reenrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<{ reenrollment: Reenrollment }>(`/api/admin/reenrollments/${id}`)
      .then((res) => {
        setReenrollment(res.reenrollment);
        setAdminNotes(res.reenrollment.adminNotes ?? '');
      })
      .catch(() => setError('Failed to load re-enrollment'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (status: string) => {
    if (!reenrollment) return;
    setSaving(true);
    try {
      const res = await api.patch<{ reenrollment: Reenrollment }>(`/api/admin/reenrollments/${id}/status`, {
        status,
        adminNotes,
      });
      setReenrollment(res.reenrollment);
    } catch {
      setError('Failed to update status');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!reenrollment) {
    return <div className="py-12 text-center text-muted-foreground">{error || 'Re-enrollment not found'}</div>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/reenrollments">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-serif text-2xl font-semibold">
            {reenrollment.child.firstName} {reenrollment.child.lastName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{reenrollment.schoolYear}</p>
        </div>
        <StatusBadge status={reenrollment.status} />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="grid gap-6 sm:grid-cols-2">
        <section className="space-y-3 rounded-lg border bg-card p-5">
          <h2 className="font-semibold">Current Enrollment</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Campus</dt>
              <dd className="capitalize">{reenrollment.child.campusSlug.replace(/-/g, ' ')}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Program</dt>
              <dd className="capitalize">{reenrollment.child.programSlug.replace(/-/g, ' ')}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Session</dt>
              <dd className="capitalize">{reenrollment.child.sessionType.replace(/-/g, ' ')}</dd>
            </div>
          </dl>
        </section>

        <section className="space-y-3 rounded-lg border bg-card p-5">
          <h2 className="font-semibold">Requested for {reenrollment.schoolYear}</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Campus</dt>
              <dd className="capitalize">{reenrollment.campusSlug.replace(/-/g, ' ')}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Program</dt>
              <dd className="capitalize">{reenrollment.programSlug.replace(/-/g, ' ')}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Session</dt>
              <dd className="capitalize">{reenrollment.sessionType.replace(/-/g, ' ')}</dd>
            </div>
          </dl>
        </section>
      </div>

      {reenrollment.notes && (
        <section className="space-y-2 rounded-lg border bg-card p-5">
          <h2 className="font-semibold">Parent Notes</h2>
          <p className="text-sm text-muted-foreground">{reenrollment.notes}</p>
        </section>
      )}

      <section className="space-y-3 rounded-lg border bg-card p-5">
        <h2 className="font-semibold">Admin Notes</h2>
        <textarea
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          rows={3}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Internal notes..."
        />
      </section>

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => handleStatusChange('confirmed')}
          disabled={saving || reenrollment.status === 'confirmed'}
          className="bg-green-600 hover:bg-green-700">
          Confirm
        </Button>
        <Button
          onClick={() => handleStatusChange('declined')}
          disabled={saving || reenrollment.status === 'declined'}
          variant="destructive">
          Decline
        </Button>
        <Button
          onClick={() => handleStatusChange('pending')}
          disabled={saving || reenrollment.status === 'pending'}
          variant="outline">
          Reset to Pending
        </Button>
      </div>
    </div>
  );
}
