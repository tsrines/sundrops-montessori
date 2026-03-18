'use client';

import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
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
  severity: string;
  status: string;
  campusSlug: string;
  parentNotified: boolean;
  parentAcknowledged: boolean;
  parentAcknowledgedAt: string | null;
  child: {
    firstName: string;
    lastName: string;
  };
}

export default function ParentIncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [acknowledging, setAcknowledging] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<{ incidents: Incident[] }>('/api/portal/incidents')
      .then((res) => setIncidents(res.incidents))
      .catch(() => setError('Failed to load incident reports'))
      .finally(() => setLoading(false));
  }, []);

  const handleAcknowledge = async (id: string) => {
    setAcknowledging(id);
    try {
      const res = await api.patch<{ incident: Incident }>(`/api/portal/incidents/${id}/acknowledge`);
      setIncidents((prev) => prev.map((i) => (i.id === id ? res.incident : i)));
    } catch {
      setError('Failed to acknowledge incident');
    } finally {
      setAcknowledging(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold">Incident Reports</h1>
        <p className="mt-1 text-muted-foreground">
          Incident reports for your children. Please acknowledge any new reports.
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {incidents.length === 0 ? (
        <div className="rounded-xl border bg-card p-10 text-center">
          <p className="text-muted-foreground">No incident reports on file.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className={`rounded-lg border bg-card p-5 space-y-3 ${
                !incident.parentAcknowledged ? 'border-orange-200 bg-orange-50/50' : ''
              }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">
                    {incident.child.firstName} {incident.child.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(incident.incidentDate).toLocaleDateString()}
                    {incident.incidentTime ? ` at ${incident.incidentTime}` : ''}
                    {incident.location ? ` · ${incident.location}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={incident.severity} />
                  <StatusBadge status={incident.campusSlug} className="capitalize bg-gray-100 text-gray-700" />
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Description</p>
                  <p className="mt-0.5">{incident.description}</p>
                </div>
                {incident.actionTaken && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Action Taken</p>
                    <p className="mt-0.5">{incident.actionTaken}</p>
                  </div>
                )}
              </div>

              {incident.parentAcknowledged ? (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Acknowledged
                  {incident.parentAcknowledgedAt
                    ? ` on ${new Date(incident.parentAcknowledgedAt).toLocaleDateString()}`
                    : ''}
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={() => handleAcknowledge(incident.id)}
                  disabled={acknowledging === incident.id}>
                  {acknowledging === incident.id ? 'Acknowledging...' : 'Acknowledge Report'}
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
