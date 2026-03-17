'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { ChildCard } from '@/components/portal/child-card';

interface Child {
  id: string;
  firstName: string;
  lastName: string;
  campusSlug: string;
  programSlug: string;
  classroom: string | null;
  sessionType: string;
  enrollmentStatus: string;
}

export default function ChildrenPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChildren() {
      try {
        const res = await api.get<{ children: Child[] }>('/api/portal/children');
        setChildren(res.children);
      } catch {
        // Non-critical
      } finally {
        setLoading(false);
      }
    }
    fetchChildren();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold">My Children</h1>
          <p className="mt-1 text-muted-foreground">Manage your enrolled children.</p>
        </div>
        <Button asChild>
          <Link href="/portal/children/add" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Child
          </Link>
        </Button>
      </div>

      {children.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">No children added yet.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/portal/children/add">Add Your First Child</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {children.map((child) => (
            <ChildCard key={child.id} {...child} />
          ))}
        </div>
      )}
    </div>
  );
}
