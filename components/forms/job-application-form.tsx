'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { PROGRAM_CHECKBOXES } from '@/lib/data/careers-content';

const applicationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  programInterest: z.array(z.string()).optional(),
  aboutYourself: z.string().optional(),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

export function JobApplicationForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [selectedPrograms, setSelectedPrograms] = React.useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      programInterest: [],
      aboutYourself: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
  };

  const handleProgramToggle = (programId: string, checked: boolean) => {
    const updated = checked ? [...selectedPrograms, programId] : selectedPrograms.filter((id) => id !== programId);
    setSelectedPrograms(updated);
    setValue('programInterest', updated);
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
        <h3 className="mt-6 text-xl font-semibold text-foreground">Application Received</h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for your interest in joining Sundrops Montessori. Our team will review your information and reach
          out soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-xl border bg-card p-8">
      {/* First Name & Last Name */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="app-firstName">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="app-firstName"
            placeholder="First name"
            {...register('firstName')}
            className={cn(errors.firstName && 'border-destructive')}
          />
          {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="app-lastName">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="app-lastName"
            placeholder="Last name"
            {...register('lastName')}
            className={cn(errors.lastName && 'border-destructive')}
          />
          {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="app-email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="app-email"
            type="email"
            placeholder="you@example.com"
            {...register('email')}
            className={cn(errors.email && 'border-destructive')}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="app-phone">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="app-phone"
            type="tel"
            placeholder="(843) 555-0123"
            {...register('phone')}
            className={cn(errors.phone && 'border-destructive')}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Program Interest Checkboxes */}
      <div className="space-y-3">
        <Label>Program Interest</Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PROGRAM_CHECKBOXES.map((program) => (
            <label key={program.id} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                id={`program-${program.id}`}
                checked={selectedPrograms.includes(program.id)}
                onCheckedChange={(checked) => handleProgramToggle(program.id, checked === true)}
              />
              <span className="text-sm text-foreground">{program.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tell Us About Yourself */}
      <div className="space-y-2">
        <Label htmlFor="app-about">Tell Us About Yourself</Label>
        <Textarea
          id="app-about"
          placeholder="Tell us about your experience and interest in Montessori education..."
          rows={5}
          {...register('aboutYourself')}
        />
      </div>

      {/* Resume Upload */}
      <div className="space-y-2">
        <Label>Resume</Label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input p-6 transition-colors hover:border-primary/50 hover:bg-muted/50">
          <Upload className="h-8 w-8 text-muted-foreground" />
          {fileName ? (
            <p className="text-sm font-medium text-foreground">{fileName}</p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">Click to upload your resume</p>
              <p className="text-xs text-muted-foreground">DOCX, RTF, PDF, or TXT (max 5MB)</p>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".docx,.rtf,.pdf,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
