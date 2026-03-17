'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import {
  LayoutDashboard,
  FileText,
  RefreshCw,
  AlertTriangle,
  Users,
  Megaphone,
  UserCog,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api-client';

const TOP_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/applications', label: 'Applications', icon: FileText },
  { href: '/admin/reenrollments', label: 'Re-enrollment', icon: RefreshCw },
  { href: '/admin/incidents', label: 'Incidents', icon: AlertTriangle },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/admin/users', label: 'Users', icon: UserCog },
] as const;

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

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hierarchy, setHierarchy] = useState<CampusEntry[]>([]);
  const [openCampuses, setOpenCampuses] = useState<Set<string>>(new Set());
  const [openPrograms, setOpenPrograms] = useState<Set<string>>(new Set());

  const activeCampus = searchParams.get('campus') ?? '';
  const activeProgram = searchParams.get('program') ?? '';
  const activeClassroom = searchParams.get('classroom') ?? '';

  useEffect(() => {
    api
      .get<CampusEntry[]>('/api/admin/hierarchy')
      .then((data) => {
        setHierarchy(data);
        // Auto-expand the active campus/program
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

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r bg-muted/30 lg:block">
      <div className="flex h-full flex-col px-3 py-6">
        <nav className="space-y-1">
          {TOP_LINKS.map((link) => {
            const isActive =
              link.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}>
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {hierarchy.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 px-3 py-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Campuses
              </span>
            </div>
            <div className="mt-1 space-y-0.5">
              {hierarchy.map((campusEntry) => {
                const isCampusOpen = openCampuses.has(campusEntry.campus);

                return (
                  <Collapsible.Root
                    key={campusEntry.campus}
                    open={isCampusOpen}
                    onOpenChange={() => toggleCampus(campusEntry.campus)}>
                    <Collapsible.Trigger className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium capitalize text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                      <ChevronRight
                        className={cn(
                          'h-3 w-3 flex-shrink-0 transition-transform',
                          isCampusOpen && 'rotate-90',
                        )}
                      />
                      {campusEntry.campus.replace(/-/g, ' ')}
                    </Collapsible.Trigger>

                    <Collapsible.Content>
                      <div className="pl-4 pt-0.5 space-y-0.5">
                        {campusEntry.programs.map((programEntry) => {
                          const programKey = `${campusEntry.campus}:${programEntry.program}`;
                          const isProgramOpen = openPrograms.has(programKey);

                          return (
                            <Collapsible.Root
                              key={programKey}
                              open={isProgramOpen}
                              onOpenChange={() => toggleProgram(programKey)}>
                              <Collapsible.Trigger className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium capitalize text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                                <ChevronRight
                                  className={cn(
                                    'h-3 w-3 flex-shrink-0 transition-transform',
                                    isProgramOpen && 'rotate-90',
                                  )}
                                />
                                {programEntry.program.replace(/-/g, ' ')}
                              </Collapsible.Trigger>

                              <Collapsible.Content>
                                <div className="pl-4 pt-0.5 space-y-0.5">
                                  {programEntry.classrooms.map((classroomEntry) => {
                                    const isActive =
                                      activeCampus === campusEntry.campus &&
                                      activeProgram === programEntry.program &&
                                      activeClassroom === classroomEntry.classroom;

                                    return (
                                      <button
                                        key={classroomEntry.classroom}
                                        onClick={() =>
                                          navigateToClassroom(
                                            campusEntry.campus,
                                            programEntry.program,
                                            classroomEntry.classroom,
                                          )
                                        }
                                        className={cn(
                                          'flex w-full items-center justify-between rounded-md px-3 py-1.5 text-xs transition-colors',
                                          isActive
                                            ? 'bg-primary/10 font-medium text-primary'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                        )}>
                                        <span>{classroomEntry.classroom}</span>
                                        <span className="text-[10px] opacity-60">
                                          {classroomEntry.studentCount}
                                        </span>
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
        )}
      </div>
    </aside>
  );
}
