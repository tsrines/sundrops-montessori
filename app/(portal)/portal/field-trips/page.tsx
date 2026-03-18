'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { api } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldTripPortalForm } from '@/components/portal/field-trip-portal-form';
import { cn } from '@/lib/utils';

interface Child {
  id: string;
  firstName: string;
  lastName: string;
}

interface FieldTripPermission {
  id: string;
  childId: string;
  guardianName: string;
  schoolYear: string;
  status: string;
  createdAt: string;
}

export default function FieldTripsPage() {
  const { data: session } = useSession();
  const [children, setChildren] = useState<Child[]>([]);
  const [permissions, setPermissions] = useState<FieldTripPermission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [childrenRes, permissionsRes] = await Promise.all([
          api.get<{ children: Child[] }>('/api/portal/children'),
          api.get<{ permissions: FieldTripPermission[] }>('/api/portal/field-trip-permissions'),
        ]);
        setChildren(childrenRes.children);
        setPermissions(permissionsRes.permissions);
      } catch {
        // Non-critical
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getChildName = (childId: string) => {
    const child = children.find((c) => c.id === childId);
    return child ? `${child.firstName} ${child.lastName}` : 'Unknown';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-semibold">Field Trip Permissions</h1>
        <p className="mt-1 text-muted-foreground">Submit field trip permission forms for the current school year.</p>
      </div>

      {/* New Permission Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Submit Permission</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldTripPortalForm userName={session?.user?.name || ''} childList={children} />
        </CardContent>
      </Card>

      {/* Existing Permissions */}
      {permissions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Submitted Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {permissions.map((perm) => (
                <div key={perm.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">{getChildName(perm.childId)}</p>
                    <p className="text-xs text-muted-foreground">
                      {perm.schoolYear} school year - Signed by {perm.guardianName}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-xs font-medium',
                      perm.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    )}>
                    {perm.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
