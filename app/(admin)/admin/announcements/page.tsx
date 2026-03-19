'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { api } from '@/lib/api-client';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Announcement {
  id: string;
  title: string;
  body: string;
  campusSlug: string | null;
  priority: string;
  publishedAt: string;
  expiresAt: string | null;
  createdAt: string;
}

interface AnnouncementFormData {
  title: string;
  body: string;
  campusSlug: string;
  priority: string;
  expiresAt: string;
}

const EMPTY_FORM: AnnouncementFormData = {
  title: '',
  body: '',
  campusSlug: '',
  priority: 'normal',
  expiresAt: '',
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<AnnouncementFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchAnnouncements = () => {
    setLoading(true);
    api
      .get<{ announcements: Announcement[] }>('/api/admin/announcements')
      .then((res) => setAnnouncements(res.announcements))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleEdit = (a: Announcement) => {
    setEditId(a.id);
    setForm({
      title: a.title,
      body: a.body,
      campusSlug: a.campusSlug ?? '',
      priority: a.priority,
      expiresAt: a.expiresAt ? a.expiresAt.substring(0, 10) : '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    try {
      await api.delete(`/api/admin/announcements/${id}`);
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    } catch {
      setError('Failed to delete announcement');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        title: form.title,
        body: form.body,
        campusSlug: form.campusSlug || null,
        priority: form.priority,
        expiresAt: form.expiresAt || null,
      };

      if (editId) {
        await api.patch(`/api/admin/announcements/${editId}`, payload);
      } else {
        await api.post('/api/admin/announcements', payload);
      }
      setShowForm(false);
      setEditId(null);
      setForm(EMPTY_FORM);
      fetchAnnouncements();
    } catch {
      setError('Failed to save announcement');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Announcements</h1>
          <p className="mt-1 text-muted-foreground">Create and manage school announcements.</p>
        </div>
        <Button
          onClick={() => {
            setEditId(null);
            setForm(EMPTY_FORM);
            setShowForm(true);
          }}
          className="gap-2">
          <Plus className="h-4 w-4" />
          New Announcement
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-card p-5">
          <h2 className="font-semibold">{editId ? 'Edit' : 'New'} Announcement</h2>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Body</Label>
            <textarea
              id="body"
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              rows={4}
              required
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="campus">Campus (leave blank for all)</Label>
              <select
                id="campus"
                value={form.campusSlug}
                onChange={(e) => setForm({ ...form, campusSlug: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                <option value="">All campuses</option>
                <option value="bridge">Bridge</option>
                <option value="daniel-island">Daniel Island</option>
                <option value="palmetto">Palmetto</option>
                <option value="farm">Farm</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiresAt">Expires (optional)</Label>
              <Input
                id="expiresAt"
                type="date"
                value={form.expiresAt}
                onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : editId ? 'Save Changes' : 'Create'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowForm(false);
                setEditId(null);
              }}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : announcements.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground">No announcements yet.</p>
      ) : (
        <div className="space-y-3">
          {announcements.map((a) => (
            <div key={a.id} className="flex items-start gap-4 rounded-lg border bg-card p-4">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{a.title}</h3>
                  <StatusBadge status={a.priority} />
                  {a.campusSlug && (
                    <span className="text-xs capitalize text-muted-foreground">{a.campusSlug.replace(/-/g, ' ')}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{a.body}</p>
                <p className="text-xs text-muted-foreground">
                  Published {new Date(a.publishedAt).toLocaleDateString()}
                  {a.expiresAt ? ` · Expires ${new Date(a.expiresAt).toLocaleDateString()}` : ''}
                </p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(a)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(a.id)}
                  className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
