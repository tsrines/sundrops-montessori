'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Download } from 'lucide-react';
import { api } from '@/lib/api-client';
import { useRole } from '@/hooks/use-role';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { ClassroomForm } from '@/components/admin/classroom-form';
import { APPLICATION_CAMPUSES, APPLICATION_PROGRAMS } from '@/lib/data/application-form-data';
import { downloadCsv } from '@/lib/utils/download-csv';

interface Classroom {
  id: string;
  name: string;
  campusSlug: string;
  programSlug: string;
  capacity: number | null;
  isActive: boolean;
  primaryTeacherId: string | null;
  primaryTeacher: { id: string; name: string } | null;
  createdAt: string;
}

export default function ClassroomsPage() {
  const { isAdminOrAbove } = useRole();
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Classroom | null>(null);
  const [error, setError] = useState('');

  const reloadClassrooms = () => {
    setLoading(true);
    api
      .get<{ classrooms: Classroom[] }>('/api/admin/classrooms')
      .then((res) => setClassrooms(res.classrooms))
      .catch(() => setError('Failed to load classrooms'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    api
      .get<{ classrooms: Classroom[] }>('/api/admin/classrooms')
      .then((res) => setClassrooms(res.classrooms))
      .catch(() => setError('Failed to load classrooms'))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (classroom: Classroom) => {
    setEditTarget(classroom);
    setShowForm(true);
  };

  const handleDelete = async (classroom: Classroom) => {
    if (!confirm(`Delete classroom "${classroom.name}"?`)) return;
    try {
      await api.delete(`/api/admin/classrooms/${classroom.id}`);
      setClassrooms((prev) => prev.filter((c) => c.id !== classroom.id));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete classroom';
      setError(message);
    }
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditTarget(null);
    reloadClassrooms();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditTarget(null);
  };

  const handleDownloadEmailList = async (classroom: Classroom) => {
    try {
      const res = await api.getAdminClassroomEmailList(classroom.id);
      const rows: string[][] = [['Child Name', 'Parent/Guardian', 'Email']];
      for (const entry of res.entries) {
        rows.push([`${entry.childFirstName} ${entry.childLastName}`, entry.parentName, entry.parentEmail]);
      }
      downloadCsv(rows, `${classroom.campusSlug}-${classroom.name.toLowerCase().replace(/\s+/g, '-')}-emails.csv`);
    } catch {
      setError(`Failed to download email list for ${classroom.name}`);
    }
  };

  const grouped = APPLICATION_CAMPUSES.map((campus) => ({
    campus: campus.value,
    label: campus.label,
    programs: APPLICATION_PROGRAMS.filter((p) => (p.availableAt as readonly string[]).includes(campus.value)).map(
      (program) => ({
        program: program.value,
        label: program.label,
        classrooms: classrooms.filter((c) => c.campusSlug === campus.value && c.programSlug === program.value),
      })
    ),
  }));

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Classrooms</h1>
          <p className="mt-1 text-muted-foreground">Manage classrooms across all campuses.</p>
        </div>
        {isAdminOrAbove && (
          <Button
            onClick={() => {
              setEditTarget(null);
              setShowForm(true);
            }}
            className="gap-2">
            <Plus className="h-4 w-4" />
            Add Classroom
          </Button>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {showForm && <ClassroomForm editTarget={editTarget} onSave={handleFormSave} onCancel={handleFormCancel} />}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(({ campus, label, programs }) => {
            const hasCampusClassrooms = programs.some((p) => p.classrooms.length > 0);
            if (!hasCampusClassrooms) return null;

            return (
              <div key={campus}>
                <h2 className="mb-3 font-serif text-lg font-semibold">{label}</h2>
                <div className="space-y-4">
                  {programs.map(({ program, label: programLabel, classrooms: programClassrooms }) => {
                    if (programClassrooms.length === 0) return null;

                    return (
                      <div key={program} className="rounded-lg border bg-card">
                        <div className="border-b bg-muted/30 px-4 py-2">
                          <h3 className="text-sm font-medium text-muted-foreground">{programLabel}</h3>
                        </div>
                        <div className="divide-y">
                          {programClassrooms.map((classroom) => (
                            <div key={classroom.id} className="flex items-center justify-between px-4 py-3">
                              <div className="flex items-center gap-3">
                                <span className="font-medium">{classroom.name}</span>
                                {classroom.primaryTeacher ? (
                                  <span className="text-sm">{classroom.primaryTeacher.name}</span>
                                ) : (
                                  <span className="text-xs text-muted-foreground">No teacher</span>
                                )}
                                {classroom.capacity !== null && (
                                  <span className="text-xs text-muted-foreground">capacity {classroom.capacity}</span>
                                )}
                                <StatusBadge status={classroom.isActive ? 'active' : 'inactive'} />
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  title="Download email list"
                                  onClick={() => handleDownloadEmailList(classroom)}>
                                  <Download className="h-4 w-4" />
                                </Button>
                                {isAdminOrAbove && (
                                  <>
                                    <Button variant="ghost" size="sm" onClick={() => handleEdit(classroom)}>
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-destructive hover:text-destructive"
                                      onClick={() => handleDelete(classroom)}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {classrooms.length === 0 && (
            <p className="py-8 text-center text-muted-foreground">
              No classrooms yet. Add your first classroom to get started.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
