'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

const STAFF_ROLES = ['superadmin', 'admin', 'staff', 'teacher'];

export default function AuthRedirect() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.replace('/login');
      return;
    }
    const role = session.user.role ?? '';
    router.replace(STAFF_ROLES.includes(role) ? '/admin' : '/portal');
  }, [session, isPending, router]);

  return null;
}
