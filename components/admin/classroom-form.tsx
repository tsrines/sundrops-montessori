'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { APPLICATION_CAMPUSES, getAvailablePrograms } from '@/lib/data/application-form-data';

interface Classroom {
  id: string;
  name: string;
  campusSlug: string;
  programSlug: string;
  capacity: number | null;
  isActive: boolean;
  primaryTeacherId: string | null;
}

interface ClassroomFormData {
  name: string;
  campusSlug: string;
  programSlug: string;
  capacity: string;
  isActive: boolean;
  primaryTeacherId: string | null;
}

interface ClassroomFormProps {
  editTarget: Classroom | null;
  onSave: () => void;
  onCancel: () => void;
}

interface StaffOption {
  userId: string;
  name: string;
}

interface StaffProfile {
  userId: string;
  user: { id: string; name: string };
}

const EMPTY_FORM: ClassroomFormData = {
  name: '',
  campusSlug: '',
  programSlug: '',
  capacity: '',
  isActive: true,
  primaryTeacherId: null,
};

export function ClassroomForm({ editTarget, onSave, onCancel }: ClassroomFormProps) {
  const [form, setForm] = useState<ClassroomFormData>(
    editTarget
      ? {
          name: editTarget.name,
          campusSlug: editTarget.campusSlug,
          programSlug: editTarget.programSlug,
          capacity: editTarget.capacity !== null ? String(editTarget.capacity) : '',
          isActive: editTarget.isActive,
          primaryTeacherId: editTarget.primaryTeacherId,
        }
      : EMPTY_FORM
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [staffList, setStaffList] = useState<StaffOption[]>([]);
  const [showCreateTeacher, setShowCreateTeacher] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', title: 'Guide', campusSlug: '' });
  const [createTeacherError, setCreateTeacherError] = useState('');
  const [creatingTeacher, setCreatingTeacher] = useState(false);

  const availablePrograms = getAvailablePrograms(form.campusSlug);

  useEffect(() => {
    api
      .get<{ profiles: StaffProfile[] }>('/api/admin/staff-profiles')
      .then((res) => setStaffList(res.profiles.map((p) => ({ userId: p.userId, name: p.user.name }))))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (showCreateTeacher) {
      setNewTeacher((prev) => ({ ...prev, campusSlug: form.campusSlug }));
    }
  }, [showCreateTeacher, form.campusSlug]);

  const handleCampusChange = (campusSlug: string) => {
    setForm((prev) => ({ ...prev, campusSlug, programSlug: '' }));
  };

  const handleTeacherSelect = (value: string) => {
    if (value === '__create__') {
      setShowCreateTeacher(true);
      return;
    }
    setForm((prev) => ({ ...prev, primaryTeacherId: value || null }));
  };

  const handleCreateTeacher = async () => {
    if (!newTeacher.name || !newTeacher.email) {
      setCreateTeacherError('Name and email are required');
      return;
    }

    setCreatingTeacher(true);
    setCreateTeacherError('');

    try {
      const res = await api.post<{ userId: string; name: string; email: string }>(
        '/api/admin/staff-profiles/quick-create',
        {
          name: newTeacher.name,
          email: newTeacher.email,
          title: newTeacher.title || 'Guide',
          campusSlug: newTeacher.campusSlug || null,
        }
      );
      setStaffList((prev) => [...prev, { userId: res.userId, name: res.name }]);
      setForm((prev) => ({ ...prev, primaryTeacherId: res.userId }));
      setShowCreateTeacher(false);
      setNewTeacher({ name: '', email: '', title: 'Guide', campusSlug: '' });
    } catch (err: unknown) {
      const message =
        err instanceof Error && err.message.includes('409') ? 'Email already exists' : 'Failed to create teacher';
      setCreateTeacherError(message);
    } finally {
      setCreatingTeacher(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.campusSlug || !form.programSlug) {
      setError('Campus and program are required');
      return;
    }

    setSaving(true);
    setError('');

    const payload = {
      name: form.name,
      campusSlug: form.campusSlug as 'bridge' | 'daniel-island' | 'palmetto' | 'farm',
      programSlug: form.programSlug as 'nido' | 'pee-wee-wee-casa' | 'casa' | 'elementary' | 'mezzo',
      capacity: form.capacity ? parseInt(form.capacity, 10) : null,
      isActive: form.isActive,
      primaryTeacherId: form.primaryTeacherId || null,
    };

    try {
      if (editTarget) {
        await api.put(`/api/admin/classrooms/${editTarget.id}`, payload);
      } else {
        await api.post('/api/admin/classrooms', payload);
      }
      onSave();
    } catch {
      setError('Failed to save classroom');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-card p-5">
      <h2 className="font-semibold">{editTarget ? 'Edit' : 'New'} Classroom</h2>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="classroom-campus">Campus</Label>
          <select
            id="classroom-campus"
            value={form.campusSlug}
            onChange={(e) => handleCampusChange(e.target.value)}
            required
            className="w-full rounded-md border bg-background px-3 py-2 text-sm">
            <option value="">Select campus</option>
            {APPLICATION_CAMPUSES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="classroom-program">Program</Label>
          <select
            id="classroom-program"
            value={form.programSlug}
            onChange={(e) => setForm({ ...form, programSlug: e.target.value })}
            required
            disabled={!form.campusSlug}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm disabled:opacity-50">
            <option value="">Select program</option>
            {availablePrograms.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="classroom-name">Classroom Name</Label>
          <Input
            id="classroom-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. CASA 1"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="classroom-capacity">Capacity (optional)</Label>
          <Input
            id="classroom-capacity"
            type="number"
            min="1"
            max="100"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            placeholder="e.g. 15"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="classroom-teacher">Primary Teacher (optional)</Label>
        <select
          id="classroom-teacher"
          value={form.primaryTeacherId ?? ''}
          onChange={(e) => handleTeacherSelect(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm">
          <option value="">(No teacher assigned)</option>
          {staffList.map((s) => (
            <option key={s.userId} value={s.userId}>
              {s.name}
            </option>
          ))}
          <option value="__create__">+ Create new teacher...</option>
        </select>
      </div>

      {showCreateTeacher && (
        <div className="space-y-3 rounded-md border bg-muted/30 p-4">
          <p className="text-sm font-medium">New Teacher</p>

          {createTeacherError && <p className="text-sm text-destructive">{createTeacherError}</p>}

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="new-teacher-name">Name</Label>
              <Input
                id="new-teacher-name"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Full name"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="new-teacher-email">Email</Label>
              <Input
                id="new-teacher-email"
                type="email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="new-teacher-title">Title</Label>
              <Input
                id="new-teacher-title"
                value={newTeacher.title}
                onChange={(e) => setNewTeacher((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Guide"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="new-teacher-campus">Campus</Label>
              <select
                id="new-teacher-campus"
                value={newTeacher.campusSlug}
                onChange={(e) => setNewTeacher((prev) => ({ ...prev, campusSlug: e.target.value }))}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                <option value="">Select campus</option>
                {APPLICATION_CAMPUSES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button type="button" size="sm" onClick={handleCreateTeacher} disabled={creatingTeacher}>
              {creatingTeacher ? 'Adding...' : 'Add Teacher'}
            </Button>
            <button
              type="button"
              onClick={() => {
                setShowCreateTeacher(false);
                setCreateTeacherError('');
              }}
              className="text-sm text-muted-foreground underline-offset-2 hover:underline">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          id="classroom-active"
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          className="h-4 w-4 rounded border-input"
        />
        <Label htmlFor="classroom-active" className="cursor-pointer font-normal">
          Active
        </Label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving...' : editTarget ? 'Save Changes' : 'Create'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
