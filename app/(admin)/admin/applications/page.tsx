'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';

interface Application {
  id: string;
  childFirstName: string;
  childLastName: string;
  campusSlug: string;
  programSlug: string;
  status: string;
  email1: string;
  createdAt: string;
}

const STATUS_OPTIONS = ['', 'pending', 'under_review', 'accepted', 'waitlisted', 'declined', 'withdrawn'];
const CAMPUS_OPTIONS = ['', 'bridge', 'daniel-island', 'palmetto', 'farm'];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [campusFilter, setCampusFilter] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (statusFilter) params.set('status', statusFilter);
        if (campusFilter) params.set('campus', campusFilter);
        const res = await api.get<{ applications: Application[] }>(`/api/admin/applications?${params}`);
        setApplications(res.applications);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    void fetchData();
  }, [statusFilter, campusFilter]);

  const columns = [
    {
      key: 'name',
      header: 'Child',
      cell: (row: Application) => (
        <Link href={`/admin/applications/${row.id}`} className="font-medium hover:underline">
          {row.childFirstName} {row.childLastName}
        </Link>
      ),
    },
    {
      key: 'campus',
      header: 'Campus',
      cell: (row: Application) => (
        <span className="capitalize">{row.campusSlug.replace(/-/g, ' ')}</span>
      ),
    },
    {
      key: 'program',
      header: 'Program',
      cell: (row: Application) => (
        <span className="capitalize">{row.programSlug.replace(/-/g, ' ')}</span>
      ),
    },
    {
      key: 'email',
      header: 'Contact',
      cell: (row: Application) => (
        <span className="text-muted-foreground">{row.email1}</span>
      ),
    },
    {
      key: 'submitted',
      header: 'Submitted',
      cell: (row: Application) => (
        <span className="text-muted-foreground">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row: Application) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold">Applications</h1>
        <p className="mt-1 text-muted-foreground">Manage enrollment applications.</p>
      </div>

      <div className="flex flex-wrap gap-3">
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
        <select
          value={campusFilter}
          onChange={(e) => setCampusFilter(e.target.value)}
          className="rounded-md border bg-background px-3 py-1.5 text-sm capitalize">
          {CAMPUS_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c ? c.replace(/-/g, ' ') : 'All campuses'}
            </option>
          ))}
        </select>
      </div>

      <DataTable
        columns={columns}
        data={applications}
        isLoading={loading}
        emptyMessage="No applications found."
      />
    </div>
  );
}
