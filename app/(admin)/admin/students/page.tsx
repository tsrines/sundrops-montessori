'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { api } from '@/lib/api-client';
import { StatusBadge } from '@/components/ui/status-badge';
import { useAdminContext } from '@/hooks/use-admin-context';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  campusSlug: string;
  programSlug: string;
  classroom: string | null;
  sessionType: string;
  enrollmentStatus: string;
  parent: {
    id: string;
    name: string;
    email: string;
    profile: {
      phone: string | null;
    } | null;
  };
}

function StudentsContent() {
  const { campus, program, classroom } = useAdminContext();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (campus) params.set('campus', campus);
    if (program) params.set('program', program);
    if (classroom) params.set('classroom', classroom);

    api
      .get<{ students: Student[] }>(`/api/admin/students?${params}`)
      .then((res) => {
        setStudents(res.students);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [campus, program, classroom]);

  const filteredStudents = useMemo(() => {
    const active = students.filter((s) => s.enrollmentStatus !== 'inactive');
    if (!search) return active;
    const q = search.toLowerCase();
    return active.filter(
      (s) => `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) || s.classroom?.toLowerCase().includes(q)
    );
  }, [students, search]);

  const groupedByProgram = useMemo(() => {
    const groups: Record<string, Record<string, Student[]>> = {};
    for (const student of filteredStudents) {
      if (!groups[student.programSlug]) groups[student.programSlug] = {};
      const room = student.classroom ?? 'Unassigned';
      if (!groups[student.programSlug][room]) groups[student.programSlug][room] = [];
      groups[student.programSlug][room].push(student);
    }
    return groups;
  }, [filteredStudents]);

  const pageTitle = [campus && campus.replace(/-/g, ' '), program && program.replace(/-/g, ' '), classroom]
    .filter(Boolean)
    .join(' › ');

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold capitalize">
          {pageTitle ? `Students — ${pageTitle}` : 'Students'}
        </h1>
        <p className="mt-1 text-muted-foreground">Student roster grouped by program and classroom.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search students or classroom..."
          className="w-full rounded-md border bg-background py-2 pl-9 pr-3 text-sm"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : Object.keys(groupedByProgram).length === 0 ? (
        <p className="py-8 text-center text-muted-foreground">No students found.</p>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedByProgram).map(([prog, classrooms]) => (
            <section key={prog} className="space-y-4">
              <h2 className="font-serif text-lg font-semibold capitalize">{prog.replace(/-/g, ' ')}</h2>
              {Object.entries(classrooms).map(([room, roomStudents]) => (
                <div key={room} className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{room}</h3>
                  <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Name
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Session
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Status
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Parent
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Contact
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {roomStudents.map((student) => (
                          <tr key={student.id} className="border-b last:border-0 hover:bg-muted/30">
                            <td className="px-4 py-2 font-medium">
                              <Link href={`/admin/students/${student.id}`} className="hover:underline">
                                {student.firstName} {student.lastName}
                              </Link>
                            </td>
                            <td className="px-4 py-2 capitalize text-muted-foreground">
                              {student.sessionType.replace(/-/g, ' ')}
                            </td>
                            <td className="px-4 py-2">
                              <StatusBadge status={student.enrollmentStatus} />
                            </td>
                            <td className="px-4 py-2 text-muted-foreground">{student.parent.name}</td>
                            <td className="px-4 py-2 text-muted-foreground">
                              {student.parent.profile?.phone ?? student.parent.email}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StudentsPage() {
  return (
    <Suspense>
      <StudentsContent />
    </Suspense>
  );
}
