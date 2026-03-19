'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { api } from '@/lib/api-client';
import { useRole } from '@/hooks/use-role';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const { isTeacher } = useRole();
  const [children, setChildren] = useState<Child[]>([]);
  const [error, setError] = useState('');

  const {
    register,
    control,
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

  // eslint-disable-next-line react-hooks/incompatible-library
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

  useEffect(() => {
    if (isTeacher && children.length > 0) {
      setValue('campusSlug', children[0].campusSlug);
    }
  }, [isTeacher, children, setValue]);

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
            <Controller
              name="childId"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={cn('w-full', errors.childId && 'border-destructive')}>
                    <SelectValue placeholder="Select a child..." />
                  </SelectTrigger>
                  <SelectContent>
                    {children.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.firstName} {c.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.childId && <p className="text-xs text-destructive">{errors.childId.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="campusSlug">
              Campus <span className="text-destructive">*</span>
            </Label>
            <Controller
              name="campusSlug"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} disabled={isTeacher}>
                  <SelectTrigger className={cn('w-full', errors.campusSlug && 'border-destructive')}>
                    <SelectValue placeholder="Select campus..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bridge">Bridge</SelectItem>
                    <SelectItem value="daniel-island">Daniel Island</SelectItem>
                    <SelectItem value="palmetto">Palmetto</SelectItem>
                    <SelectItem value="farm">Farm</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
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
            <Controller
              name="severity"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minor">Minor</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="serious">Serious</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
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
          <Textarea
            id="description"
            {...register('description')}
            rows={4}
            className={cn(errors.description && 'border-destructive')}
            placeholder="Describe what happened..."
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="actionTaken">Action Taken</Label>
          <Textarea id="actionTaken" {...register('actionTaken')} rows={3} placeholder="What was done in response?" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="witnesses">Witnesses</Label>
          <Input id="witnesses" placeholder="Names of witnesses (if any)" {...register('witnesses')} />
        </div>

        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Controller
              name="parentNotified"
              control={control}
              render={({ field }) => (
                <Checkbox id="parentNotified" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <Label htmlFor="parentNotified" className="text-sm font-normal">
              Parent has been notified
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Controller
              name="followUpRequired"
              control={control}
              render={({ field }) => (
                <Checkbox id="followUpRequired" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <Label htmlFor="followUpRequired" className="text-sm font-normal">
              Follow-up required
            </Label>
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Create Incident Report'}
        </Button>
      </form>
    </div>
  );
}
