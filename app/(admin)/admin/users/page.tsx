'use client';

import { useEffect, useState } from 'react';
import { admin } from '@/lib/auth-client';
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

const ROLE_OPTIONS = ['user', 'staff', 'admin'] as const;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState<string | null>(null);

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
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b transition-colors hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-4 py-3">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
