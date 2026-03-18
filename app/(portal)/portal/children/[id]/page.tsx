'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, CheckCircle, Download, Users } from 'lucide-react';
import Link from 'next/link';
import { APPLICATION_CAMPUSES, getAvailablePrograms, getAvailableSessions } from '@/lib/data/application-form-data';
import { CLASSROOMS } from '@/lib/data/pizza-fridays-content';
import { api } from '@/lib/api-client';
import type { EmailListEntry } from '@/lib/api-client';
import { downloadCsv } from '@/lib/utils/download-csv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const editChildSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  dateOfBirth: z.string().optional(),
  campusSlug: z.enum(['bridge', 'daniel-island', 'palmetto', 'farm']).optional(),
  classroom: z.string().max(50).optional(),
  programSlug: z.enum(['nido', 'pee-wee-wee-casa', 'casa', 'elementary', 'mezzo']).optional(),
  sessionType: z.enum(['half-day', 'school-day', 'full-day']).optional(),
});

type EditChildValues = z.infer<typeof editChildSchema>;

interface ChildData {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  campusSlug: string;
  classroom: string | null;
  programSlug: string;
  sessionType: string;
  enrollmentStatus: string;
}

interface ClassroomRecord {
  id: string;
  name: string;
  campusSlug: string;
}

export default function EditChildPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [classmates, setClassmates] = useState<EmailListEntry[] | null>(null);
  const [classroomId, setClassroomId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditChildValues>({
    resolver: zodResolver(editChildSchema),
  });

  const selectedCampus = watch('campusSlug');
  const selectedProgram = watch('programSlug');
  const availablePrograms = getAvailablePrograms(selectedCampus || '');
  const availableSessions = getAvailableSessions(selectedProgram || '');

  useEffect(() => {
    async function fetchChild() {
      try {
        const [childrenRes, classroomsRes] = await Promise.all([
          api.get<{ children: ChildData[] }>('/api/portal/children'),
          api.get<{ classrooms: ClassroomRecord[] }>('/api/portal/classrooms'),
        ]);

        const child = childrenRes.children.find((c) => c.id === params.id);
        if (child) {
          reset({
            firstName: child.firstName,
            lastName: child.lastName,
            dateOfBirth: child.dateOfBirth,
            campusSlug: child.campusSlug as EditChildValues['campusSlug'],
            classroom: child.classroom || '',
            programSlug: child.programSlug as EditChildValues['programSlug'],
            sessionType: child.sessionType as EditChildValues['sessionType'],
          });

          if (child.classroom && child.enrollmentStatus === 'active') {
            const matched = classroomsRes.classrooms.find(
              (cr) => cr.name === child.classroom && cr.campusSlug === child.campusSlug
            );
            if (matched) {
              setClassroomId(matched.id);
              try {
                const emailRes = await api.getPortalClassroomEmailList(matched.id);
                setClassmates(emailRes.entries);
              } catch {
                // Non-critical — classmates section stays hidden
              }
            }
          }
        }
      } catch {
        // Non-critical
      } finally {
        setLoading(false);
      }
    }
    fetchChild();
  }, [params.id, reset]);

  const handleDownloadEmailList = async () => {
    if (!classroomId) return;
    const res = await api.getPortalClassroomEmailList(classroomId);
    const rows: string[][] = [['Child Name', 'Parent/Guardian', 'Email']];
    for (const entry of res.entries) {
      rows.push([`${entry.childFirstName} ${entry.childLastName}`, entry.parentName, entry.parentEmail]);
    }
    downloadCsv(rows, `classroom-emails.csv`);
  };

  const onSubmit = async (data: EditChildValues) => {
    setSaveError(null);
    setSaved(false);
    try {
      await api.put(`/api/portal/children/${params.id}`, data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setSaveError('Failed to update child. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href="/portal/children">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="font-serif text-2xl font-semibold">Edit Child</h1>
          <p className="mt-1 text-muted-foreground">Update your child&apos;s enrollment information.</p>
        </div>
      </div>

      {classmates !== null && classmates.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base">Classmates</CardTitle>
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleDownloadEmailList}>
                <Download className="h-3.5 w-3.5" />
                Download Email List
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm text-muted-foreground">
              Active classmates in this classroom. Download the email list to coordinate with other families.
            </p>
            <div className="grid gap-1 sm:grid-cols-2">
              {classmates.map((entry) => (
                <div key={`${entry.childFirstName}-${entry.parentEmail}`} className="text-sm">
                  {entry.childFirstName} {entry.childLastName.charAt(0)}.
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Child Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {saveError && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{saveError}</div>}
            {saved && (
              <div className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-700">
                <CheckCircle className="h-4 w-4" />
                Child updated successfully.
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="edit-first">First Name</Label>
                <Input
                  id="edit-first"
                  {...register('firstName')}
                  className={cn(errors.firstName && 'border-destructive')}
                />
                {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-last">Last Name</Label>
                <Input
                  id="edit-last"
                  {...register('lastName')}
                  className={cn(errors.lastName && 'border-destructive')}
                />
                {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-dob">Date of Birth</Label>
              <Input id="edit-dob" type="date" {...register('dateOfBirth')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-campus">Campus</Label>
              <select
                id="edit-campus"
                {...register('campusSlug')}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                {APPLICATION_CAMPUSES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-program">Program</Label>
              <select
                id="edit-program"
                {...register('programSlug')}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                {availablePrograms.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-session">Session Type</Label>
              <select
                id="edit-session"
                {...register('sessionType')}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                {availableSessions.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label} ({s.hours})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-classroom">Classroom</Label>
              <select
                id="edit-classroom"
                {...register('classroom')}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="">No classroom assigned</option>
                {CLASSROOMS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
