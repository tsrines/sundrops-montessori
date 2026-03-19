'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { STAFF_ROLES } from '@/lib/roles';

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
