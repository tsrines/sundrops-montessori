'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { api } from '@/lib/api-client';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { useAdminContext } from '@/hooks/use-admin-context';

interface Incident {
  id: string;
  incidentDate: string;
  severity: string;
  status: string;
  campusSlug: string;
  description: string;
  parentNotified: boolean;
  parentAcknowledged: boolean;
  child: {
    firstName: string;
    lastName: string;
  };
}

const CAMPUS_OPTIONS = ['', 'bridge', 'daniel-island', 'palmetto', 'farm'];
const SEVERITY_OPTIONS = ['', 'minor', 'moderate', 'serious'];
const STATUS_OPTIONS = ['', 'draft', 'submitted', 'parent_notified', 'acknowledged', 'closed'];

function IncidentsContent() {
  const { campus: contextCampus } = useAdminContext();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [campusFilter, setCampusFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        const effectiveCampus = contextCampus || campusFilter;
        if (effectiveCampus) params.set('campus', effectiveCampus);
        if (severityFilter) params.set('severity', severityFilter);
        if (statusFilter) params.set('status', statusFilter);
        const res = await api.get<{ incidents: Incident[] }>(`/api/admin/incidents?${params}`);
        setIncidents(res.incidents);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    void fetchData();
  }, [contextCampus, campusFilter, severityFilter, statusFilter]);

  const columns = [
    {
      key: 'date',
      header: 'Date',
      cell: (row: Incident) => new Date(row.incidentDate).toLocaleDateString(),
    },
    {
      key: 'child',
      header: 'Child',
      cell: (row: Incident) => (
        <Link href={`/admin/incidents/${row.id}`} className="font-medium hover:underline">
          {row.child.firstName} {row.child.lastName}
        </Link>
      ),
    },
    {
      key: 'campus',
      header: 'Campus',
      cell: (row: Incident) => (
        <span className="capitalize">{row.campusSlug.replace(/-/g, ' ')}</span>
      ),
    },
    {
      key: 'severity',
      header: 'Severity',
      cell: (row: Incident) => <StatusBadge status={row.severity} />,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row: Incident) => <StatusBadge status={row.status} />,
    },
    {
      key: 'parent',
      header: 'Parent',
      cell: (row: Incident) => (
        <span className="text-xs text-muted-foreground">
          {row.parentAcknowledged
            ? 'Acknowledged'
            : row.parentNotified
              ? 'Notified'
              : 'Not notified'}
        </span>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Incident Reports</h1>
          <p className="mt-1 text-muted-foreground">Log and track accident and incident reports.</p>
        </div>
        <Link href="/admin/incidents/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Incident
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <select
          value={campusFilter}
          onChange={(e) => setCampusFilter(e.target.value)}
          className="rounded-md border bg-background px-3 py-1.5 text-sm">
          {CAMPUS_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c ? c.replace(/-/g, ' ') : 'All campuses'}
            </option>
          ))}
        </select>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="rounded-md border bg-background px-3 py-1.5 text-sm">
          {SEVERITY_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s || 'All severities'}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border bg-background px-3 py-1.5 text-sm">
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s ? s.replace(/_/g, ' ') : 'All statuses'}
            </option>
          ))}
        </select>
      </div>

      <DataTable
        columns={columns}
        data={incidents}
        isLoading={loading}
        emptyMessage="No incident reports found."
      />
    </div>
  );
}

export default function IncidentsPage() {
  return (
    <Suspense>
      <IncidentsContent />
    </Suspense>
  );
}
