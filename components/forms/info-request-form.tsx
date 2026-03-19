'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const PROGRAM_OPTIONS = [
  'Infant (Nido)',
  'Toddler (Pee Wee / Wee Casa)',
  'Preschool & Kindergarten (Casa)',
  'Elementary',
  'Adolescent (Mezzo)',
] as const;

const infoRequestSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  programs: z.array(z.string()).min(1, 'Please select at least one program'),
  message: z.string().optional(),
});

type InfoRequestValues = z.infer<typeof infoRequestSchema>;

interface InfoRequestFormProps {
  defaultCampus: string;
}

export function InfoRequestForm({ defaultCampus }: InfoRequestFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InfoRequestValues>({
    resolver: zodResolver(infoRequestSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      programs: [],
      message: '',
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedPrograms = watch('programs');

  const toggleProgram = (program: string) => {
    const current = selectedPrograms ?? [];
    const updated = current.includes(program) ? current.filter((p) => p !== program) : [...current, program];
    setValue('programs', updated, { shouldValidate: true });
  };

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
        <h3 className="mt-6 text-xl font-semibold text-foreground">Request Received</h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for your interest in {defaultCampus}. A member of our admissions team will be in touch within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-xl border bg-card p-8">
      {/* Name Row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="info-firstName">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="info-firstName"
            placeholder="Jane"
            autoComplete="given-name"
            {...register('firstName')}
            className={cn(errors.firstName && 'border-destructive')}
          />
          {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="info-lastName">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="info-lastName"
            placeholder="Smith"
            autoComplete="family-name"
            {...register('lastName')}
            className={cn(errors.lastName && 'border-destructive')}
          />
          {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Email & Phone Row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="info-email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="info-email"
            type="email"
            placeholder="jane@example.com"
            autoComplete="email"
            spellCheck={false}
            {...register('email')}
            className={cn(errors.email && 'border-destructive')}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="info-phone">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="info-phone"
            type="tel"
            placeholder="(843) 555-0123"
            autoComplete="tel"
            {...register('phone')}
            className={cn(errors.phone && 'border-destructive')}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Programs Checkboxes */}
      <div className="space-y-3">
        <Label>
          Programs of Interest <span className="text-destructive">*</span>
        </Label>
        <div className="grid gap-3 sm:grid-cols-2">
          {PROGRAM_OPTIONS.map((program) => (
            <label key={program} className="flex cursor-pointer items-center gap-2.5">
              <Checkbox checked={selectedPrograms?.includes(program)} onCheckedChange={() => toggleProgram(program)} />
              <span className="text-sm">{program}</span>
            </label>
          ))}
        </div>
        {errors.programs && <p className="text-xs text-destructive">{errors.programs.message}</p>}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="info-message">Message</Label>
        <Textarea
          id="info-message"
          placeholder="Tell us about your family and what you are looking for..."
          rows={4}
          {...register('message')}
        />
      </div>

      {/* Submit */}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : `Request Info About ${defaultCampus}`}
      </Button>
    </form>
  );
}
