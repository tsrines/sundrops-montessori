'use client';

import { useEffect, useState } from 'react';
import { Users, Pizza, Bus, Megaphone } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { api } from '@/lib/api-client';
import { DashboardCard } from '@/components/portal/dashboard-card';
import { AnnouncementCard } from '@/components/portal/announcement-card';

interface DashboardData {
  childrenCount: number;
  pendingOrders: number;
  activePermissions: number;
  announcements: Array<{
    id: string;
    title: string;
    body: string;
    priority: string;
    publishedAt: string;
    campusSlug: string | null;
  }>;
}

export default function PortalDashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData>({
    childrenCount: 0,
    pendingOrders: 0,
    activePermissions: 0,
    announcements: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const [childrenRes, ordersRes, permissionsRes, announcementsRes] = await Promise.all([
          api.get<{ children: unknown[] }>('/api/portal/children'),
          api.get<{ orders: Array<{ status: string }> }>('/api/portal/pizza-orders'),
          api.get<{ permissions: unknown[] }>('/api/portal/field-trip-permissions'),
          api.get<{ announcements: DashboardData['announcements'] }>('/api/portal/announcements'),
        ]);

        setData({
          childrenCount: childrenRes.children.length,
          pendingOrders: ordersRes.orders.filter((o) => o.status === 'pending').length,
          activePermissions: permissionsRes.permissions.length,
          announcements: announcementsRes.announcements.slice(0, 5),
        });
      } catch {
        // Dashboard data is non-critical, fail silently
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

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
          Welcome, {session?.user?.name?.split(' ')[0] || 'Parent'}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s an overview of your family&apos;s activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Children"
          value={data.childrenCount}
          description="Enrolled children"
          icon={Users}
          href="/portal/children"
        />
        <DashboardCard
          title="Pizza Orders"
          value={data.pendingOrders}
          description="Pending orders"
          icon={Pizza}
          href="/portal/pizza-orders"
        />
        <DashboardCard
          title="Field Trips"
          value={data.activePermissions}
          description="Active permissions"
          icon={Bus}
          href="/portal/field-trips"
        />
        <DashboardCard
          title="Announcements"
          value={data.announcements.length}
          description="Recent updates"
          icon={Megaphone}
          href="#announcements"
        />
      </div>

      {/* Announcements */}
      {data.announcements.length > 0 && (
        <section id="announcements" className="space-y-4">
          <h2 className="font-serif text-xl font-semibold">Announcements</h2>
          <div className="space-y-3">
            {data.announcements.map((announcement) => (
              <AnnouncementCard key={announcement.id} {...announcement} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
