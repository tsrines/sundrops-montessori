'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { admin } from '@/lib/auth-client';
import { ROLE_OPTIONS, type CampusScopedRole, isCampusScopedRole } from '@/lib/roles';
import { api } from '@/lib/api-client';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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

const CAMPUS_OPTIONS = ['bridge', 'daniel-island', 'palmetto', 'farm'] as const;

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
    <Dialog open onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-serif">Assign Campus</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Select a campus for this <span className="font-medium capitalize">{role}</span>.
          {role === 'teacher' && ' Teachers also need a classroom.'}
        </p>

        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs font-medium text-muted-foreground">Campus *</Label>
            <Select value={campus || 'none'} onValueChange={(v) => setCampus(v === 'none' ? '' : v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select campus..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Select campus...</SelectItem>
                {CAMPUS_OPTIONS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c.replace(/-/g, ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {role === 'teacher' && (
            <div className="space-y-1">
              <Label className="text-xs font-medium text-muted-foreground">Classroom</Label>
              <Input
                type="text"
                value={classroom}
                onChange={(e) => setClassroom(e.target.value)}
                placeholder="e.g. Room A"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave} disabled={saving || !campus}>
            {saving ? 'Saving...' : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
        else setError(res.error?.message ?? 'Failed to load users');
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
                    <Select value={u.role} onValueChange={(v) => handleSetRole(u.id, v)} disabled={saving === u.id}>
                      <SelectTrigger className="h-7 w-28 px-2 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLE_OPTIONS.map((r) => (
                          <SelectItem key={r} value={r} className="text-xs">
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <span className="text-xs capitalize">{u.role}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {u.banned ? <StatusBadge status="declined" /> : <StatusBadge status="active" />}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(u.createdAt).toLocaleDateString()}</td>
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
            {users.length === 0 && !error && (
              <tr>
                <td colSpan={isSuperAdmin ? 6 : 5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No users found.
                </td>
              </tr>
            )}
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
