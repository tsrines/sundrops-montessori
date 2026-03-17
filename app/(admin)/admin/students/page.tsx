'use client';

import { useEffect, useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { api } from '@/lib/api-client';
import { StatusBadge } from '@/components/ui/status-badge';

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

const CAMPUSES = ['bridge', 'daniel-island', 'palmetto', 'farm'];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bridge');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api
      .get<{ students: Student[] }>('/api/admin/students')
      .then((res) => setStudents(res.students))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesCampus = s.campusSlug === activeTab;
      const matchesSearch =
        !search ||
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        s.classroom?.toLowerCase().includes(search.toLowerCase());
      return matchesCampus && matchesSearch;
    });
  }, [students, activeTab, search]);

  const groupedByProgram = useMemo(() => {
    const groups: Record<string, Record<string, Student[]>> = {};
    for (const student of filteredStudents) {
      if (!groups[student.programSlug]) groups[student.programSlug] = {};
      const classroom = student.classroom ?? 'Unassigned';
      if (!groups[student.programSlug][classroom]) groups[student.programSlug][classroom] = [];
      groups[student.programSlug][classroom].push(student);
    }
    return groups;
  }, [filteredStudents]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold">Students</h1>
        <p className="mt-1 text-muted-foreground">Student roster grouped by campus, program, and classroom.</p>
      </div>

      {/* Campus tabs */}
      <div className="flex gap-1 rounded-lg border bg-muted/30 p-1">
        {CAMPUSES.map((campus) => (
          <button
            key={campus}
            onClick={() => setActiveTab(campus)}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
              activeTab === campus
                ? 'bg-background shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}>
            {campus.replace(/-/g, ' ')}
          </button>
        ))}
      </div>

      {/* Search */}
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
          {Object.entries(groupedByProgram).map(([program, classrooms]) => (
            <section key={program} className="space-y-4">
              <h2 className="font-serif text-lg font-semibold capitalize">
                {program.replace(/-/g, ' ')}
              </h2>
              {Object.entries(classrooms).map(([classroom, students]) => (
                <div key={classroom} className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{classroom}</h3>
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
                        {students.map((student) => (
                          <tr key={student.id} className="border-b last:border-0 hover:bg-muted/30">
                            <td className="px-4 py-2 font-medium">
                              {student.firstName} {student.lastName}
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
