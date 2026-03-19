'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { useRole } from '@/hooks/use-role';
import { useAdminContext } from '@/hooks/use-admin-context';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Reenrollment {
  id: string;
  schoolYear: string;
  status: string;
  campusSlug: string;
  programSlug: string;
  sessionType: string;
  createdAt: string;
  child: {
    firstName: string;
    lastName: string;
  };
}

function ReenrollmentsContent() {
  const { isSuperAdmin, isAdminOrAbove } = useRole();
  const { campus: contextCampus } = useAdminContext();
  const [reenrollments, setReenrollments] = useState<Reenrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [campusFilter, setCampusFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [openYear, setOpenYear] = useState('2026-2027');
  const [opening, setOpening] = useState(false);
  const [openMessage, setOpenMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (statusFilter) params.set('status', statusFilter);
        const effectiveCampus = contextCampus || campusFilter;
        if (effectiveCampus) params.set('campus', effectiveCampus);
        if (yearFilter) params.set('year', yearFilter);
        const res = await api.get<{ reenrollments: Reenrollment[] }>(`/api/admin/reenrollments?${params}`);
        setReenrollments(res.reenrollments);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    void fetchData();
  }, [contextCampus, statusFilter, campusFilter, yearFilter]);

  const handleOpenReenrollment = async () => {
    if (!openYear) return;
    setOpening(true);
    try {
      const res = await api.post<{ message: string; count: number }>('/api/admin/reenrollments/open', {
        schoolYear: openYear,
      });
      setOpenMessage(`${res.message} (${res.count} records created)`);
    } catch {
      setOpenMessage('Failed to open re-enrollment');
    } finally {
      setOpening(false);
    }
  };

  const columns = [
    {
      key: 'child',
      header: 'Child',
      cell: (row: Reenrollment) => (
        <Link href={`/admin/reenrollments/${row.id}`} className="font-medium hover:underline">
          {row.child.firstName} {row.child.lastName}
        </Link>
      ),
    },
    {
      key: 'year',
      header: 'School Year',
      cell: (row: Reenrollment) => row.schoolYear,
    },
    {
      key: 'campus',
      header: 'Campus',
      cell: (row: Reenrollment) => <span className="capitalize">{row.campusSlug.replace(/-/g, ' ')}</span>,
    },
    {
      key: 'program',
      header: 'Program',
      cell: (row: Reenrollment) => <span className="capitalize">{row.programSlug.replace(/-/g, ' ')}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row: Reenrollment) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold">Re-enrollment</h1>
        <p className="mt-1 text-muted-foreground">Manage annual re-enrollment for active families.</p>
      </div>

      {/* Open Re-enrollment */}
      {isAdminOrAbove && (
        <div className="flex flex-wrap items-end gap-3 rounded-lg border bg-muted/30 p-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">School Year</label>
            <input
              type="text"
              value={openYear}
              onChange={(e) => setOpenYear(e.target.value)}
              placeholder="2026-2027"
              className="rounded-md border bg-background px-3 py-1.5 text-sm w-32"
            />
          </div>
          <Button onClick={handleOpenReenrollment} disabled={opening} size="sm">
            {opening ? 'Opening...' : 'Open Re-enrollment'}
          </Button>
          {openMessage && <p className="text-sm text-muted-foreground">{openMessage}</p>}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          placeholder="Filter by year (e.g. 2026-2027)"
          className="rounded-md border bg-background px-3 py-1.5 text-sm w-52"
        />
        <Select value={statusFilter || 'all'} onValueChange={(v) => setStatusFilter(v === 'all' ? '' : v)}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
          </SelectContent>
        </Select>
        {isSuperAdmin && (
          <Select value={campusFilter || 'all'} onValueChange={(v) => setCampusFilter(v === 'all' ? '' : v)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All campuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All campuses</SelectItem>
              <SelectItem value="bridge">Bridge</SelectItem>
              <SelectItem value="daniel-island">Daniel Island</SelectItem>
              <SelectItem value="palmetto">Palmetto</SelectItem>
              <SelectItem value="farm">Farm</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <DataTable
        columns={columns}
        data={reenrollments}
        isLoading={loading}
        emptyMessage="No re-enrollment records found."
      />
    </div>
  );
}

export default function ReenrollmentsPage() {
  return (
    <Suspense>
      <ReenrollmentsContent />
    </Suspense>
  );
}
