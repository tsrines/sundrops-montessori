'use client';

import { useState } from 'react';
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
}

interface ClassroomFormData {
  name: string;
  campusSlug: string;
  programSlug: string;
  capacity: string;
  isActive: boolean;
}

interface ClassroomFormProps {
  editTarget: Classroom | null;
  onSave: () => void;
  onCancel: () => void;
}

const EMPTY_FORM: ClassroomFormData = {
  name: '',
  campusSlug: '',
  programSlug: '',
  capacity: '',
  isActive: true,
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
        }
      : EMPTY_FORM
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const availablePrograms = getAvailablePrograms(form.campusSlug);

  const handleCampusChange = (campusSlug: string) => {
    setForm((prev) => ({ ...prev, campusSlug, programSlug: '' }));
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
