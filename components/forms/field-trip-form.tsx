'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle } from 'lucide-react';
import { campuses } from '@/lib/data/campuses';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const fieldTripSchema = z.object({
  childFullName: z.string().min(2, "Child's full name is required"),
  childDob: z.string().min(1, 'Date of birth is required'),
  campus: z.string().min(1, 'Please select a campus'),
  guardianName: z.string().min(2, 'Parent/guardian name is required'),
  signature: z.string().min(2, 'Signature is required'),
  date: z.string().min(1, 'Date is required'),
  permission: z.literal(true, { message: 'You must give permission to proceed' }),
});

type FieldTripValues = z.infer<typeof fieldTripSchema>;

export function FieldTripForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [permissionChecked, setPermissionChecked] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FieldTripValues>({
    resolver: zodResolver(fieldTripSchema),
    defaultValues: {
      childFullName: '',
      childDob: '',
      campus: '',
      guardianName: '',
      signature: '',
      date: new Date().toISOString().split('T')[0],
      permission: undefined,
    },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-xl border bg-card p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mt-6 text-xl font-semibold text-foreground">Permission Submitted</h3>
        <p className="mt-2 text-muted-foreground">
          Your field trip permission form has been submitted successfully. Thank you!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-xl border bg-card p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ft-childName">
            Child&apos;s Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="ft-childName"
            placeholder="Child's full name"
            {...register('childFullName')}
            className={cn(errors.childFullName && 'border-destructive')}
          />
          {errors.childFullName && <p className="text-xs text-destructive">{errors.childFullName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="ft-childDob">
            Child&apos;s Date of Birth <span className="text-destructive">*</span>
          </Label>
          <Input
            id="ft-childDob"
            type="date"
            {...register('childDob')}
            className={cn(errors.childDob && 'border-destructive')}
          />
          {errors.childDob && <p className="text-xs text-destructive">{errors.childDob.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ft-campus">
          Campus <span className="text-destructive">*</span>
        </Label>
        <select
          id="ft-campus"
          {...register('campus')}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            errors.campus && 'border-destructive'
          )}>
          <option value="">Select campus</option>
          {campuses.map((c) => (
            <option key={c.slug} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.campus && <p className="text-xs text-destructive">{errors.campus.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ft-guardianName">
            Parent/Guardian Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="ft-guardianName"
            placeholder="Your full name"
            {...register('guardianName')}
            className={cn(errors.guardianName && 'border-destructive')}
          />
          {errors.guardianName && <p className="text-xs text-destructive">{errors.guardianName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="ft-date">
            Date <span className="text-destructive">*</span>
          </Label>
          <Input id="ft-date" type="date" {...register('date')} className={cn(errors.date && 'border-destructive')} />
          {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ft-signature">
          Digital Signature <span className="text-destructive">*</span>
        </Label>
        <Input
          id="ft-signature"
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
            I give my permission for my child to participate in school-sponsored field trips during the current school
            year. I understand that Sundrops Montessori will provide adequate supervision and that I will be notified in
            advance of specific field trip details.
          </span>
        </label>
        {errors.permission && <p className="mt-2 text-xs text-destructive">{errors.permission.message}</p>}
      </div>

      {/* Submit */}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Permission Form'}
      </Button>
    </form>
  );
}
