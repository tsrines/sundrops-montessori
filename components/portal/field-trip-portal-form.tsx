'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { api } from '@/lib/api-client';
import { cn } from '@/lib/utils';

interface Child {
  id: string;
  firstName: string;
  lastName: string;
}

interface FieldTripPortalFormProps {
  childList: Child[];
  userName: string;
}

const CURRENT_SCHOOL_YEAR = '2025-2026';

const portalFieldTripSchema = z.object({
  childId: z.string().min(1, 'Please select a child'),
  guardianName: z.string().min(2, 'Guardian name is required'),
  signature: z.string().min(2, 'Signature is required'),
  permission: z.literal(true, { message: 'You must give permission to proceed' }),
});

type PortalFieldTripValues = z.infer<typeof portalFieldTripSchema>;

export function FieldTripPortalForm({ childList, userName }: FieldTripPortalFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [permissionChecked, setPermissionChecked] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PortalFieldTripValues>({
    resolver: zodResolver(portalFieldTripSchema),
    defaultValues: {
      childId: '',
      guardianName: userName,
      signature: '',
      permission: undefined,
    },
  });

  const onSubmit = async (data: PortalFieldTripValues) => {
    setSubmitError(null);
    try {
      await api.post('/api/portal/field-trip-permissions', {
        childId: data.childId,
        guardianName: data.guardianName,
        signature: data.signature,
        schoolYear: CURRENT_SCHOOL_YEAR,
      });
      setIsSubmitted(true);
    } catch {
      setSubmitError('Failed to submit permission. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mt-6 text-xl font-semibold">Permission Submitted</h3>
        <p className="mt-2 text-muted-foreground">
          Field trip permission has been saved for the {CURRENT_SCHOOL_YEAR} school year.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
          Submit for Another Child
        </Button>
      </div>
    );
  }

  if (childList.length === 0) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        Please add a child to your profile before submitting field trip permissions.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitError && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{submitError}</div>}

      {/* Child Selection */}
      <div className="space-y-2">
        <Label htmlFor="portal-ft-child">
          Child <span className="text-destructive">*</span>
        </Label>
        <select
          id="portal-ft-child"
          {...register('childId')}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            errors.childId && 'border-destructive'
          )}>
          <option value="">Select a child</option>
          {childList.map((child) => (
            <option key={child.id} value={child.id}>
              {child.firstName} {child.lastName}
            </option>
          ))}
        </select>
        {errors.childId && <p className="text-xs text-destructive">{errors.childId.message}</p>}
      </div>

      {/* Guardian Name */}
      <div className="space-y-2">
        <Label htmlFor="portal-ft-guardian">
          Parent/Guardian Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="portal-ft-guardian"
          placeholder="Your full name"
          {...register('guardianName')}
          className={cn(errors.guardianName && 'border-destructive')}
        />
        {errors.guardianName && <p className="text-xs text-destructive">{errors.guardianName.message}</p>}
      </div>

      {/* Digital Signature */}
      <div className="space-y-2">
        <Label htmlFor="portal-ft-signature">
          Digital Signature <span className="text-destructive">*</span>
        </Label>
        <Input
          id="portal-ft-signature"
          placeholder="Type your full name as signature"
          {...register('signature')}
          className={cn('font-serif italic', errors.signature && 'border-destructive')}
        />
        {errors.signature && <p className="text-xs text-destructive">{errors.signature.message}</p>}
      </div>

      {/* Permission Checkbox */}
      <div className="rounded-lg bg-muted/50 p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <Checkbox
            checked={permissionChecked}
            onCheckedChange={(checked) => {
              const isChecked = checked === true;
              setPermissionChecked(isChecked);
              setValue('permission', isChecked as true, { shouldValidate: true });
            }}
            className="mt-0.5"
          />
          <span className="text-sm leading-relaxed">
            I give my permission for my child to participate in school-sponsored field trips during the{' '}
            {CURRENT_SCHOOL_YEAR} school year. I understand that Sundrops Montessori will provide adequate supervision
            and that I will be notified in advance of specific field trip details.
          </span>
        </label>
        {errors.permission && <p className="mt-2 text-xs text-destructive">{errors.permission.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Permission'}
      </Button>
    </form>
  );
}
