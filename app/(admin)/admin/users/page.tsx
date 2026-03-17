'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { admin } from '@/lib/auth-client';
import { api } from '@/lib/api-client';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  banned: boolean;
  createdAt: string;
}

interface StaffProfilePayload {
  campusSlug: string | null;
  classroom: string | null;
}

const ROLE_OPTIONS = ['user', 'staff', 'teacher', 'admin', 'superadmin'] as const;
const CAMPUS_OPTIONS = ['bridge', 'daniel-island', 'palmetto', 'farm'] as const;
const CAMPUS_SCOPED_ROLES = ['admin', 'staff', 'teacher'] as const;

type CampusScopedRole = (typeof CAMPUS_SCOPED_ROLES)[number];

function isCampusScopedRole(role: string): role is CampusScopedRole {
  return (CAMPUS_SCOPED_ROLES as readonly string[]).includes(role);
}

interface RoleAssignmentModalProps {
  userId: string;
  role: CampusScopedRole;
  onConfirm: (payload: StaffProfilePayload) => Promise<void>;
  onCancel: () => void;
}

function RoleAssignmentModal({ role, onConfirm, onCancel }: RoleAssignmentModalProps) {
  const [campus, setCampus] = useState('');
  const [classroom, setClassroom] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!campus) return;
    setSaving(true);
    await onConfirm({
      campusSlug: campus || null,
      classroom: classroom || null,
    });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm space-y-4 rounded-lg border bg-background p-6 shadow-lg">
        <h2 className="font-serif text-lg font-semibold">Assign Campus</h2>
        <p className="text-sm text-muted-foreground">
          Select a campus for this <span className="font-medium capitalize">{role}</span>.
          {role === 'teacher' && ' Teachers also need a classroom.'}
        </p>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Campus *</label>
            <select
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm">
              <option value="">Select campus...</option>
              {CAMPUS_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c.replace(/-/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          {role === 'teacher' && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Classroom</label>
              <input
                type="text"
                value={classroom}
                onChange={(e) => setClassroom(e.target.value)}
                placeholder="e.g. Room A"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave} disabled={saving || !campus}>
            {saving ? 'Saving...' : 'Confirm'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState<string | null>(null);
  const [pendingRoleChange, setPendingRoleChange] = useState<{
    userId: string;
    role: CampusScopedRole;
  } | null>(null);

  const isSuperAdmin = session?.user?.role === 'superadmin';

  useEffect(() => {
    admin
      .listUsers({ query: { limit: 100 } })
      .then((res) => {
        if (res.data) setUsers(res.data.users as unknown as User[]);
      })
      .catch(() => setError('Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  const handleSetRole = async (userId: string, role: string) => {
    if (isCampusScopedRole(role)) {
      setPendingRoleChange({ userId, role });
      return;
    }

    setSaving(userId);
    try {
      await admin.setRole({ userId, role: role as 'admin' | 'user' });
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
    } catch {
      setError('Failed to update role');
    } finally {
      setSaving(null);
    }
  };

  const handleConfirmRoleWithCampus = async (payload: StaffProfilePayload) => {
    if (!pendingRoleChange) return;
    const { userId, role } = pendingRoleChange;

    setSaving(userId);
    try {
      await admin.setRole({ userId, role: role as 'admin' | 'user' });
      await api.post(`/api/admin/staff-profiles`, { userId, ...payload });
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
    } catch {
      setError('Failed to update role');
    } finally {
      setSaving(null);
      setPendingRoleChange(null);
    }
  };

  const handleBan = async (userId: string, banned: boolean) => {
    setSaving(userId);
    try {
      if (banned) {
        await admin.unbanUser({ userId });
      } else {
        await admin.banUser({ userId, banReason: 'Banned by admin' });
      }
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, banned: !banned } : u)));
    } catch {
      setError('Failed to update ban status');
    } finally {
      setSaving(null);
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
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold">Users</h1>
        <p className="mt-1 text-muted-foreground">Manage user accounts and roles.</p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Joined
              </th>
              {isSuperAdmin && (
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b transition-colors hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-4 py-3">
                  {isSuperAdmin ? (
                    <select
                      value={u.role}
                      onChange={(e) => handleSetRole(u.id, e.target.value)}
                      disabled={saving === u.id}
                      className="rounded-md border bg-background px-2 py-1 text-xs">
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-xs capitalize">{u.role}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {u.banned ? (
                    <StatusBadge status="declined" />
                  ) : (
                    <StatusBadge status="active" />
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                {isSuperAdmin && (
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBan(u.id, u.banned)}
                      disabled={saving === u.id}
                      className={u.banned ? '' : 'text-destructive hover:text-destructive'}>
                      {u.banned ? 'Unban' : 'Ban'}
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pendingRoleChange && (
        <RoleAssignmentModal
          userId={pendingRoleChange.userId}
          role={pendingRoleChange.role}
          onConfirm={handleConfirmRoleWithCampus}
          onCancel={() => setPendingRoleChange(null)}
        />
      )}
    </div>
  );
}
