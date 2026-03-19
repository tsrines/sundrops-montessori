'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { APPLICATION_CAMPUSES } from '@/lib/data/application-form-data';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/status-badge';

interface StaffProfile {
  id: string;
  userId: string;
  campusSlug: string | null;
  classroom: string | null;
  title: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface GroupedCampus {
  slug: string | null;
  label: string;
  profiles: StaffProfile[];
}

function groupByCampus(profiles: StaffProfile[]): GroupedCampus[] {
  const campusMap = new Map<string | null, StaffProfile[]>();

  for (const profile of profiles) {
    const key = profile.campusSlug;
    const existing = campusMap.get(key);
    if (existing) {
      existing.push(profile);
    } else {
      campusMap.set(key, [profile]);
    }
  }

  const groups: GroupedCampus[] = APPLICATION_CAMPUSES.map((campus) => ({
    slug: campus.value,
    label: campus.label,
    profiles: campusMap.get(campus.value) ?? [],
  })).filter((group) => group.profiles.length > 0);

  const unassigned = campusMap.get(null) ?? [];
  if (unassigned.length > 0) {
    groups.push({ slug: null, label: 'Unassigned', profiles: unassigned });
  }

  return groups;
}

export default function StaffPage() {
  const [staffProfiles, setStaffProfiles] = useState<StaffProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await api.get<{ profiles: StaffProfile[] }>('/api/admin/staff-profiles');
        setStaffProfiles(res.profiles);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    void fetchData();
  }, []);

  const filtered = search
    ? staffProfiles.filter((p) => {
        const q = search.toLowerCase();
        return p.user.name.toLowerCase().includes(q) || p.user.email.toLowerCase().includes(q);
      })
    : staffProfiles;

  const groups = groupByCampus(filtered);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold">Staff Directory</h1>
        <p className="mt-1 text-muted-foreground">All employees organized by campus.</p>
      </div>

      <Input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : groups.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No staff found.</p>
      ) : (
        <div className="space-y-8">
          {groups.map((group) => (
            <section key={group.slug ?? 'unassigned'}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </h2>
              <div className="divide-y rounded-lg border bg-card">
                {group.profiles.map((profile) => (
                  <div key={profile.id} className="flex items-center justify-between px-4 py-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{profile.user.name}</span>
                        <StatusBadge status={profile.user.role} />
                      </div>
                      <p className="text-sm text-muted-foreground">{profile.user.email}</p>
                      {(profile.title || profile.classroom) && (
                        <p className="text-xs text-muted-foreground">
                          {[profile.title, profile.classroom].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
