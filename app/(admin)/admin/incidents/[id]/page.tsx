'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { api } from '@/lib/api-client';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';

interface Incident {
  id: string;
  incidentDate: string;
  incidentTime: string | null;
  location: string | null;
  description: string;
  actionTaken: string | null;
  witnesses: string | null;
  severity: string;
  status: string;
  campusSlug: string;
  parentNotified: boolean;
  parentNotifiedAt: string | null;
  parentAcknowledged: boolean;
  parentAcknowledgedAt: string | null;
  followUpRequired: boolean;
  followUpNotes: string | null;
  createdAt: string;
  child: {
    firstName: string;
    lastName: string;
  };
}

const STATUS_FLOW = ['draft', 'submitted', 'parent_notified', 'acknowledged', 'closed'] as const;

export default function IncidentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);
  const [followUpNotes, setFollowUpNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<{ incident: Incident }>(`/api/admin/incidents/${id}`)
      .then((res) => {
        setIncident(res.incident);
        setFollowUpNotes(res.incident.followUpNotes ?? '');
      })
      .catch(() => setError('Failed to load incident'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (patch: Record<string, unknown>) => {
    setSaving(true);
    try {
      const res = await api.patch<{ incident: Incident }>(`/api/admin/incidents/${id}`, patch);
      setIncident(res.incident);
    } catch {
      setError('Failed to update incident');
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

  if (!incident) {
    return <div className="py-12 text-center text-muted-foreground">{error || 'Incident not found'}</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/incidents">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-serif text-2xl font-semibold">
            Incident — {incident.child.firstName} {incident.child.lastName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {new Date(incident.incidentDate).toLocaleDateString()}
            {incident.incidentTime ? ` at ${incident.incidentTime}` : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={incident.severity} />
          <StatusBadge status={incident.status} />
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {/* Status Flow */}
      <div className="flex flex-wrap gap-2 rounded-lg border bg-muted/30 p-4">
        <p className="w-full text-sm font-medium text-muted-foreground">Status:</p>
        {STATUS_FLOW.map((s) => (
          <Button
            key={s}
            size="sm"
            variant={incident.status === s ? 'default' : 'outline'}
            onClick={() => handleUpdate({ status: s })}
            disabled={saving || incident.status === s}
            className="capitalize">
            {s.replace(/_/g, ' ')}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-3 rounded-lg border bg-card p-5">
          <h2 className="font-semibold">Incident Details</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Campus</dt>
              <dd className="capitalize">{incident.campusSlug.replace(/-/g, ' ')}</dd>
            </div>
            {incident.location && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Location</dt>
                <dd>{incident.location}</dd>
              </div>
            )}
            {incident.witnesses && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Witnesses</dt>
                <dd>{incident.witnesses}</dd>
              </div>
            )}
          </dl>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Description</p>
            <p className="text-sm">{incident.description}</p>
          </div>
          {incident.actionTaken && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Action Taken</p>
              <p className="text-sm">{incident.actionTaken}</p>
            </div>
          )}
        </section>

        <section className="space-y-3 rounded-lg border bg-card p-5">
          <h2 className="font-semibold">Parent Communication</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Notified</dt>
              <dd className="flex items-center gap-2">
                {incident.parentNotified ? (
                  <span className="text-green-600">
                    Yes{' '}
                    {incident.parentNotifiedAt ? `— ${new Date(incident.parentNotifiedAt).toLocaleDateString()}` : ''}
                  </span>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdate({ parentNotified: true, status: 'parent_notified' })}
                    disabled={saving}>
                    Mark Notified
                  </Button>
                )}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Acknowledged</dt>
              <dd>
                {incident.parentAcknowledged ? (
                  <span className="text-green-600">
                    Yes{' '}
                    {incident.parentAcknowledgedAt
                      ? `— ${new Date(incident.parentAcknowledgedAt).toLocaleDateString()}`
                      : ''}
                  </span>
                ) : (
                  <span className="text-muted-foreground">Pending</span>
                )}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="space-y-3 rounded-lg border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Follow-up Notes</h2>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={incident.followUpRequired}
              onChange={(e) => handleUpdate({ followUpRequired: e.target.checked })}
              className="h-4 w-4"
            />
            Follow-up required
          </label>
        </div>
        <textarea
          value={followUpNotes}
          onChange={(e) => setFollowUpNotes(e.target.value)}
          rows={3}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Follow-up notes..."
        />
        <Button size="sm" onClick={() => handleUpdate({ followUpNotes })} disabled={saving}>
          {saving ? 'Saving...' : 'Save Notes'}
        </Button>
      </section>
    </div>
  );
}
