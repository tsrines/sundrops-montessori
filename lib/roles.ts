export const ROLES = {
  USER: 'user',
  STAFF: 'staff',
  TEACHER: 'teacher',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_OPTIONS = [ROLES.USER, ROLES.STAFF, ROLES.TEACHER, ROLES.ADMIN, ROLES.SUPERADMIN] as const;

// Used for runtime inclusion checks — typed as readonly string[] so .includes(string) compiles
export const STAFF_ROLES: readonly string[] = [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.STAFF, ROLES.TEACHER];

export const CAMPUS_SCOPED_ROLES = [ROLES.ADMIN, ROLES.STAFF, ROLES.TEACHER] as const;

export type CampusScopedRole = (typeof CAMPUS_SCOPED_ROLES)[number];

export function isCampusScopedRole(role: string): role is CampusScopedRole {
  return (CAMPUS_SCOPED_ROLES as readonly string[]).includes(role);
}
