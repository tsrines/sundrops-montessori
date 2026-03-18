'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';

interface Application {
  id: string;
  status: string;
  childFirstName: string;
  childLastName: string;
  dateOfBirth: string;
  gender: string | null;
  address: string;
  state: string;
  zip: string;
  desiredStartDate: string;
  previousSchool: string | null;
  siblings: string | null;
  siblingsAges: string | null;
  parent1FirstName: string;
  parent1LastName: string;
  parent1Phone: string;
  parent1Employer: string | null;
  parent1Position: string | null;
  parent1WorkPhone: string | null;
  parent2FirstName: string | null;
  parent2LastName: string | null;
  parent2Phone: string | null;
  parent2Employer: string | null;
  parent2Position: string | null;
  parent2WorkPhone: string | null;
  email1: string;
  email2: string | null;
  campusSlug: string;
  programSlug: string;
  sessionType: string;
  notes: string | null;
  createdAt: string;
}

const ACTION_STATUSES = ['pending', 'under_review', 'accepted', 'waitlisted', 'declined', 'withdrawn'] as const;

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<{ application: Application }>(`/api/admin/applications/${id}`)
      .then((res) => {
        setApplication(res.application);
        setNotes(res.application.notes ?? '');
      })
      .catch(() => setError('Failed to load application'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (status: string) => {
    if (!application) return;
    setSaving(true);
    try {
      const res = await api.patch<{ application: Application }>(`/api/admin/applications/${id}/status`, { status });
      setApplication(res.application);
    } catch {
      setError('Failed to update status');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = async () => {
    setSaving(true);
    try {
      const res = await api.patch<{ application: Application }>(`/api/admin/applications/${id}/notes`, { notes });
      setApplication(res.application);
    } catch {
      setError('Failed to save notes');
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

  if (!application) {
    return <div className="py-12 text-center text-muted-foreground">{error || 'Application not found'}</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/applications">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-serif text-2xl font-semibold">
            {application.childFirstName} {application.childLastName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Submitted {new Date(application.createdAt).toLocaleDateString()}
          </p>
        </div>
        <StatusBadge status={application.status} />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {/* Actions */}
      <div className="flex flex-wrap gap-2 rounded-lg border bg-muted/30 p-4">
        <p className="w-full text-sm font-medium text-muted-foreground">Change Status:</p>
        {ACTION_STATUSES.map((s) => (
          <Button
            key={s}
            size="sm"
            variant={application.status === s ? 'default' : 'outline'}
            onClick={() => handleStatusChange(s)}
            disabled={saving || application.status === s}
            className="capitalize">
            {s.replace(/_/g, ' ')}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Child Information */}
        <section className="space-y-3 rounded-lg border bg-card p-5">
          <h2 className="font-semibold">Child Information</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Date of Birth</dt>
              <dd>{application.dateOfBirth}</dd>
            </div>
            {application.gender && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Gender</dt>
                <dd>{application.gender}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Address</dt>
              <dd className="text-right">
                {application.address}, {application.state} {application.zip}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Desired Start</dt>
              <dd>{application.desiredStartDate}</dd>
            </div>
            {application.previousSchool && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Previous School</dt>
                <dd>{application.previousSchool}</dd>
              </div>
            )}
            {application.siblings && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Siblings</dt>
                <dd>{application.siblings}</dd>
              </div>
            )}
          </dl>
        </section>

        {/* Program Selection */}
        <section className="space-y-3 rounded-lg border bg-card p-5">
          <h2 className="font-semibold">Program Selection</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Campus</dt>
              <dd className="capitalize">{application.campusSlug.replace(/-/g, ' ')}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Program</dt>
              <dd className="capitalize">{application.programSlug.replace(/-/g, ' ')}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Session</dt>
              <dd className="capitalize">{application.sessionType.replace(/-/g, ' ')}</dd>
            </div>
          </dl>
        </section>

        {/* Parent 1 */}
        <section className="space-y-3 rounded-lg border bg-card p-5">
          <h2 className="font-semibold">Parent / Guardian 1</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Name</dt>
              <dd>
                {application.parent1FirstName} {application.parent1LastName}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>{application.parent1Phone}</dd>
            </div>
            {application.parent1Employer && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Employer</dt>
                <dd>
                  {application.parent1Employer}
                  {application.parent1Position ? ` — ${application.parent1Position}` : ''}
                </dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>{application.email1}</dd>
            </div>
            {application.email2 && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Email 2</dt>
                <dd>{application.email2}</dd>
              </div>
            )}
          </dl>
        </section>

        {/* Parent 2 */}
        {application.parent2FirstName && (
          <section className="space-y-3 rounded-lg border bg-card p-5">
            <h2 className="font-semibold">Parent / Guardian 2</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Name</dt>
                <dd>
                  {application.parent2FirstName} {application.parent2LastName}
                </dd>
              </div>
              {application.parent2Phone && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd>{application.parent2Phone}</dd>
                </div>
              )}
              {application.parent2Employer && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Employer</dt>
                  <dd>
                    {application.parent2Employer}
                    {application.parent2Position ? ` — ${application.parent2Position}` : ''}
                  </dd>
                </div>
              )}
            </dl>
          </section>
        )}
      </div>

      {/* Admin Notes */}
      <section className="space-y-3 rounded-lg border bg-card p-5">
        <h2 className="font-semibold">Internal Notes</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Add internal notes visible only to staff..."
        />
        <Button onClick={handleSaveNotes} disabled={saving} size="sm">
          {saving ? 'Saving...' : 'Save Notes'}
        </Button>
      </section>
    </div>
  );
}
