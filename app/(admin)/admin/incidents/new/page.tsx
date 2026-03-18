'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const schema = z.object({
  childId: z.string().min(1, 'Please select a child'),
  campusSlug: z.string().min(1, 'Campus is required'),
  incidentDate: z.string().min(1, 'Date is required'),
  incidentTime: z.string().optional(),
  location: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  actionTaken: z.string().optional(),
  witnesses: z.string().optional(),
  severity: z.enum(['minor', 'moderate', 'serious']),
  parentNotified: z.boolean(),
  followUpRequired: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

interface Child {
  id: string;
  firstName: string;
  lastName: string;
  campusSlug: string;
}

export default function NewIncidentPage() {
  const router = useRouter();
  const [children, setChildren] = useState<Child[]>([]);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      severity: 'minor',
      parentNotified: false,
      followUpRequired: false,
    },
  });

  const selectedChildId = watch('childId');

  useEffect(() => {
    api
      .get<{ students: Child[] }>('/api/admin/students')
      .then((res) => setChildren(res.students))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const child = children.find((c) => c.id === selectedChildId);
    if (child) setValue('campusSlug', child.campusSlug);
  }, [selectedChildId, children, setValue]);

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await api.post<{ incident: { id: string } }>('/api/admin/incidents', data);
      router.push(`/admin/incidents/${res.incident.id}`);
    } catch {
      setError('Failed to create incident report');
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/incidents">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="font-serif text-2xl font-semibold">New Incident Report</h1>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-lg border bg-card p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="childId">
              Child <span className="text-destructive">*</span>
            </Label>
            <select
              id="childId"
              {...register('childId')}
              className={cn(
                'w-full rounded-md border bg-background px-3 py-2 text-sm',
                errors.childId && 'border-destructive'
              )}>
              <option value="">Select a child...</option>
              {children.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.firstName} {c.lastName}
                </option>
              ))}
            </select>
            {errors.childId && <p className="text-xs text-destructive">{errors.childId.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="campusSlug">
              Campus <span className="text-destructive">*</span>
            </Label>
            <select
              id="campusSlug"
              {...register('campusSlug')}
              className={cn(
                'w-full rounded-md border bg-background px-3 py-2 text-sm',
                errors.campusSlug && 'border-destructive'
              )}>
              <option value="">Select campus...</option>
              <option value="bridge">Bridge</option>
              <option value="daniel-island">Daniel Island</option>
              <option value="palmetto">Palmetto</option>
              <option value="farm">Farm</option>
            </select>
            {errors.campusSlug && <p className="text-xs text-destructive">{errors.campusSlug.message}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="incidentDate">
              Date <span className="text-destructive">*</span>
            </Label>
            <Input
              id="incidentDate"
              type="date"
              {...register('incidentDate')}
              className={cn(errors.incidentDate && 'border-destructive')}
            />
            {errors.incidentDate && <p className="text-xs text-destructive">{errors.incidentDate.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="incidentTime">Time</Label>
            <Input id="incidentTime" type="time" {...register('incidentTime')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="severity">
              Severity <span className="text-destructive">*</span>
            </Label>
            <select
              id="severity"
              {...register('severity')}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm">
              <option value="minor">Minor</option>
              <option value="moderate">Moderate</option>
              <option value="serious">Serious</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="Where did the incident occur?" {...register('location')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Description <span className="text-destructive">*</span>
          </Label>
          <textarea
            id="description"
            {...register('description')}
            rows={4}
            className={cn(
              'w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary',
              errors.description && 'border-destructive'
            )}
            placeholder="Describe what happened..."
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="actionTaken">Action Taken</Label>
          <textarea
            id="actionTaken"
            {...register('actionTaken')}
            rows={3}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="What was done in response?"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="witnesses">Witnesses</Label>
          <Input id="witnesses" placeholder="Names of witnesses (if any)" {...register('witnesses')} />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register('parentNotified')} className="h-4 w-4" />
            Parent has been notified
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register('followUpRequired')} className="h-4 w-4" />
            Follow-up required
          </label>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Create Incident Report'}
        </Button>
      </form>
    </div>
  );
}
