'use client';

import { useEffect, useState } from 'react';
import { FileText, AlertTriangle, RefreshCw, Users } from 'lucide-react';
import { api } from '@/lib/api-client';
import { useRole } from '@/hooks/use-role';
import { DashboardCard } from '@/components/portal/dashboard-card';

interface DashboardStats {
  enrolledByCampus: Record<string, number>;
  pendingApplications: number;
  openIncidents: number;
  pendingReenrollments: number;
}

export default function AdminDashboard() {
  const { isSuperAdmin, isTeacher } = useRole();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<DashboardStats>('/api/admin/dashboard')
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalEnrolled = stats ? Object.values(stats.enrolledByCampus).reduce((a, b) => a + b, 0) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-semibold">
          {isTeacher ? 'My Classroom Dashboard' : 'Admin Dashboard'}
        </h1>
        <p className="mt-1 text-muted-foreground">Overview of school operations.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Enrolled Students"
          value={totalEnrolled}
          description={isSuperAdmin ? 'Across all campuses' : 'At your campus'}
          icon={Users}
          href="/admin/students"
        />
        {!isTeacher && (
          <DashboardCard
            title="Pending Applications"
            value={stats?.pendingApplications ?? 0}
            description="Awaiting review"
            icon={FileText}
            href="/admin/applications"
          />
        )}
        <DashboardCard
          title="Open Incidents"
          value={stats?.openIncidents ?? 0}
          description="Awaiting action"
          icon={AlertTriangle}
          href="/admin/incidents"
        />
        {!isTeacher && (
          <DashboardCard
            title="Pending Re-enrollment"
            value={stats?.pendingReenrollments ?? 0}
            description="Awaiting response"
            icon={RefreshCw}
            href="/admin/reenrollments"
          />
        )}
      </div>

      {isSuperAdmin && stats && (
        <section className="space-y-4">
          <h2 className="font-serif text-xl font-semibold">Enrollment by Campus</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(stats.enrolledByCampus).map(([campus, count]) => (
              <div key={campus} className="rounded-lg border bg-card p-4">
                <p className="text-sm font-medium capitalize text-muted-foreground">{campus.replace(/-/g, ' ')}</p>
                <p className="mt-1 text-2xl font-bold">{count}</p>
                <p className="text-xs text-muted-foreground">active students</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
