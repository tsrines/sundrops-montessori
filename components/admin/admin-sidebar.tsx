'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRole } from '@/hooks/use-role';
import { ROLES } from '@/lib/roles';
import * as Collapsible from '@radix-ui/react-collapsible';
import {
  LayoutDashboard,
  FileText,
  RefreshCw,
  AlertTriangle,
  Users,
  Megaphone,
  UserCog,
  LayoutGrid,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api-client';
import { APPLICATION_CAMPUSES, APPLICATION_PROGRAMS } from '@/lib/data/application-form-data';

const TOP_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  {
    href: '/admin/applications',
    label: 'Applications',
    icon: FileText,
    allowedRoles: [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.STAFF],
  },
  {
    href: '/admin/reenrollments',
    label: 'Re-enrollment',
    icon: RefreshCw,
    allowedRoles: [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.STAFF],
  },
  { href: '/admin/incidents', label: 'Incidents', icon: AlertTriangle },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/admin/users', label: 'Users', icon: UserCog, allowedRoles: [ROLES.SUPERADMIN, ROLES.ADMIN] },
  { href: '/admin/classrooms', label: 'Classrooms', icon: LayoutGrid },
];

interface ClassroomEntry {
  classroom: string;
  studentCount: number;
}

interface ProgramEntry {
  program: string;
  classrooms: ClassroomEntry[];
  studentCount: number;
}

interface CampusEntry {
  campus: string;
  programs: ProgramEntry[];
}

// Static campus/program structure derived from application form config.
// Always visible regardless of enrollment data.
const CAMPUS_STRUCTURE = APPLICATION_CAMPUSES.map((campus) => ({
  campus: campus.value,
  label: campus.label,
  programs: APPLICATION_PROGRAMS.filter((p) => (p.availableAt as readonly string[]).includes(campus.value)).map(
    (p) => ({ program: p.value, label: p.label })
  ),
}));

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { role, isSuperAdmin } = useRole();
  const [classroomData, setClassroomData] = useState<CampusEntry[]>([]);
  const [openCampuses, setOpenCampuses] = useState<Set<string>>(new Set());
  const [openPrograms, setOpenPrograms] = useState<Set<string>>(new Set());

  const activeCampus = searchParams.get('campus') ?? '';
  const activeProgram = searchParams.get('program') ?? '';
  const activeClassroom = searchParams.get('classroom') ?? '';

  useEffect(() => {
    api
      .get<CampusEntry[]>('/api/admin/hierarchy')
      .then((data) => {
        setClassroomData(data);
        if (activeCampus) {
          setOpenCampuses(new Set([activeCampus]));
          if (activeProgram) {
            setOpenPrograms(new Set([`${activeCampus}:${activeProgram}`]));
          }
        }
      })
      .catch(() => {});
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClassrooms = (campus: string, program: string): ClassroomEntry[] => {
    const campusEntry = classroomData.find((c) => c.campus === campus);
    return campusEntry?.programs.find((p) => p.program === program)?.classrooms ?? [];
  };

  const getProgramStudentCount = (campus: string, program: string): number => {
    const campusEntry = classroomData.find((c) => c.campus === campus);
    return campusEntry?.programs.find((p) => p.program === program)?.studentCount ?? 0;
  };

  const navigateToClassroom = (campus: string, program: string, classroom: string) => {
    const params = new URLSearchParams();
    params.set('campus', campus);
    params.set('program', program);
    params.set('classroom', classroom);
    router.push(`/admin/students?${params.toString()}`);
  };

  const toggleCampus = (campus: string) => {
    setOpenCampuses((prev) => {
      const next = new Set(prev);
      if (next.has(campus)) {
        next.delete(campus);
      } else {
        next.add(campus);
      }
      return next;
    });
  };

  const toggleProgram = (key: string) => {
    setOpenPrograms((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const visibleLinks = TOP_LINKS.filter((l) => !l.allowedRoles || l.allowedRoles.some((r) => r === role));
  const visibleCampuses = CAMPUS_STRUCTURE.filter((c) => classroomData.some((d) => d.campus === c.campus));

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r bg-muted/30 lg:block">
      <div className="flex h-full flex-col px-3 py-6">
        <nav className="space-y-1">
          {visibleLinks.map((link) => {
            const isActive = link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}>
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6">
          <div className="flex items-center gap-2 px-3 py-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {isSuperAdmin
                ? 'All Campuses'
                : `Your Campus${visibleCampuses[0] ? ` — ${visibleCampuses[0].label}` : ''}`}
            </span>
          </div>
          <div className="mt-1 space-y-0.5">
            {visibleCampuses.map(({ campus, label, programs }) => {
              const isCampusOpen = openCampuses.has(campus);

              return (
                <Collapsible.Root key={campus} open={isCampusOpen} onOpenChange={() => toggleCampus(campus)}>
                  <Collapsible.Trigger className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                    <ChevronRight
                      className={cn('h-3 w-3 flex-shrink-0 transition-transform', isCampusOpen && 'rotate-90')}
                    />
                    {label}
                  </Collapsible.Trigger>

                  <Collapsible.Content>
                    <div className="pl-4 pt-0.5 space-y-0.5">
                      {programs.map(({ program, label: programLabel }) => {
                        const programKey = `${campus}:${program}`;
                        const isProgramOpen = openPrograms.has(programKey);
                        const classrooms = getClassrooms(campus, program);
                        const studentCount = getProgramStudentCount(campus, program);

                        if (classrooms.length === 0) {
                          const isActive = activeCampus === campus && activeProgram === program;
                          return (
                            <button
                              key={program}
                              onClick={() => {
                                const params = new URLSearchParams();
                                params.set('campus', campus);
                                params.set('program', program);
                                router.push(`/admin/students?${params.toString()}`);
                              }}
                              className={cn(
                                'flex w-full items-center justify-between rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                                isActive
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                              )}>
                              <span>{programLabel}</span>
                            </button>
                          );
                        }

                        return (
                          <Collapsible.Root
                            key={programKey}
                            open={isProgramOpen}
                            onOpenChange={() => toggleProgram(programKey)}>
                            <Collapsible.Trigger className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                              <ChevronRight
                                className={cn(
                                  'h-3 w-3 flex-shrink-0 transition-transform',
                                  isProgramOpen && 'rotate-90'
                                )}
                              />
                              <span className="flex-1 text-left">{programLabel}</span>
                              {studentCount > 0 && <span className="text-[10px] opacity-60">{studentCount}</span>}
                            </Collapsible.Trigger>

                            <Collapsible.Content>
                              <div className="pl-4 pt-0.5 space-y-0.5">
                                {classrooms.map((classroomEntry) => {
                                  const isActive =
                                    activeCampus === campus &&
                                    activeProgram === program &&
                                    activeClassroom === classroomEntry.classroom;

                                  return (
                                    <button
                                      key={classroomEntry.classroom}
                                      onClick={() => navigateToClassroom(campus, program, classroomEntry.classroom)}
                                      className={cn(
                                        'flex w-full items-center justify-between rounded-md px-3 py-1.5 text-xs transition-colors',
                                        isActive
                                          ? 'bg-primary/10 font-medium text-primary'
                                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                      )}>
                                      <span>{classroomEntry.classroom}</span>
                                      <span className="text-[10px] opacity-60">{classroomEntry.studentCount}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </Collapsible.Content>
                          </Collapsible.Root>
                        );
                      })}
                    </div>
                  </Collapsible.Content>
                </Collapsible.Root>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
