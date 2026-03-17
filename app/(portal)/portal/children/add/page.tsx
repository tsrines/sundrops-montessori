'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  APPLICATION_CAMPUSES,
  getAvailablePrograms,
  getAvailableSessions,
} from '@/lib/data/application-form-data';
import { CLASSROOMS } from '@/lib/data/pizza-fridays-content';
import { api } from '@/lib/api-client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const addChildSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  campusSlug: z.enum(['bridge', 'daniel-island', 'palmetto', 'farm'], {
    error: 'Please select a campus',
  }),
  classroom: z.string().optional(),
  programSlug: z.enum(['nido', 'pee-wee-wee-casa', 'casa', 'elementary', 'mezzo'], {
    error: 'Please select a program',
  }),
  sessionType: z.enum(['half-day', 'school-day', 'full-day'], {
    error: 'Please select a session type',
  }),
});

type AddChildValues = z.infer<typeof addChildSchema>;

export default function AddChildPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AddChildValues>({
    resolver: zodResolver(addChildSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      campusSlug: undefined,
      classroom: '',
      programSlug: undefined,
      sessionType: undefined,
    },
  });

  const selectedCampus = watch('campusSlug');
  const selectedProgram = watch('programSlug');
  const availablePrograms = getAvailablePrograms(selectedCampus || '');
  const availableSessions = getAvailableSessions(selectedProgram || '');

  const onSubmit = async (data: AddChildValues) => {
    setSubmitError(null);
    try {
      await api.post('/api/portal/children', data);
      router.push('/portal/children');
    } catch {
      setSubmitError('Failed to add child. Please try again.');
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href="/portal/children">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="font-serif text-2xl font-semibold">Add Child</h1>
          <p className="mt-1 text-muted-foreground">Add a child to your parent profile.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Child Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {submitError && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{submitError}</div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="child-first">
                  First Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="child-first"
                  placeholder="First name"
                  {...register('firstName')}
                  className={cn(errors.firstName && 'border-destructive')}
                />
                {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="child-last">
                  Last Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="child-last"
                  placeholder="Last name"
                  {...register('lastName')}
                  className={cn(errors.lastName && 'border-destructive')}
                />
                {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="child-dob">
                Date of Birth <span className="text-destructive">*</span>
              </Label>
              <Input
                id="child-dob"
                type="date"
                {...register('dateOfBirth')}
                className={cn(errors.dateOfBirth && 'border-destructive')}
              />
              {errors.dateOfBirth && <p className="text-xs text-destructive">{errors.dateOfBirth.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="child-campus">
                Campus <span className="text-destructive">*</span>
              </Label>
              <select
                id="child-campus"
                {...register('campusSlug')}
                className={cn(
                  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                  errors.campusSlug && 'border-destructive',
                )}>
                <option value="">Select campus</option>
                {APPLICATION_CAMPUSES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.campusSlug && <p className="text-xs text-destructive">{errors.campusSlug.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="child-program">
                Program <span className="text-destructive">*</span>
              </Label>
              <select
                id="child-program"
                {...register('programSlug')}
                className={cn(
                  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                  errors.programSlug && 'border-destructive',
                )}>
                <option value="">Select program</option>
                {availablePrograms.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label} ({p.ageRange})
                  </option>
                ))}
              </select>
              {errors.programSlug && <p className="text-xs text-destructive">{errors.programSlug.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="child-session">
                Session Type <span className="text-destructive">*</span>
              </Label>
              <select
                id="child-session"
                {...register('sessionType')}
                className={cn(
                  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                  errors.sessionType && 'border-destructive',
                )}>
                <option value="">Select session</option>
                {availableSessions.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label} ({s.hours})
                  </option>
                ))}
              </select>
              {errors.sessionType && <p className="text-xs text-destructive">{errors.sessionType.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="child-classroom">Classroom</Label>
              <select
                id="child-classroom"
                {...register('classroom')}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="">Select classroom (optional)</option>
                {CLASSROOMS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Child'}
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
