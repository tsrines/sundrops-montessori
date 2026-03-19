'use client';

import { useSession } from '@/lib/auth-client';
import { ROLES } from '@/lib/roles';

export interface UseRoleResult {
  role: string;
  isSuperAdmin: boolean;
  isAdminOrAbove: boolean;
  isTeacher: boolean;
}

export function useRole(): UseRoleResult {
  const { data: session } = useSession();
  const role = session?.user?.role ?? '';
  return {
    role,
    isSuperAdmin: role === ROLES.SUPERADMIN,
    isAdminOrAbove: role === ROLES.SUPERADMIN || role === ROLES.ADMIN,
    isTeacher: role === ROLES.TEACHER,
  };
}
