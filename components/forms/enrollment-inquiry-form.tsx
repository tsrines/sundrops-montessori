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
import { cn } from '@/lib/utils';

const enrollmentSchema = z.object({
  parentName: z.string().min(2, 'Parent name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  childName: z.string().min(1, "Child's name is required"),
  childAge: z.string().min(1, "Please enter your child's age or date of birth"),
  preferredCampus: z.string().min(1, 'Please select a campus'),
  startDate: z.string().optional(),
  questions: z.string().optional(),
});

type EnrollmentValues = z.infer<typeof enrollmentSchema>;

interface EnrollmentInquiryFormProps {
  programName: string;
  availableCampuses: string[];
}

export function EnrollmentInquiryForm({ programName, availableCampuses }: EnrollmentInquiryFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnrollmentValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      parentName: '',
      email: '',
      phone: '',
      childName: '',
      childAge: '',
      preferredCampus: availableCampuses.length === 1 ? availableCampuses[0] : '',
      startDate: '',
      questions: '',
    },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-xl border bg-white/10 p-12 text-center backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
          <CheckCircle className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="mt-6 text-xl font-semibold text-primary-foreground">Inquiry Received</h3>
        <p className="mt-2 text-primary-foreground/80">
          Thank you for your interest in our {programName} program. Our admissions team will contact you within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border bg-white/10 p-6 backdrop-blur-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="enroll-parentName" className="text-primary-foreground">
            Parent/Guardian Name <span className="text-primary-foreground/70">*</span>
          </Label>
          <Input
            id="enroll-parentName"
            placeholder="Your full name"
            autoComplete="name"
            {...register('parentName')}
            className={cn(
              'border-primary-foreground/20 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/50',
              errors.parentName && 'border-destructive'
            )}
          />
          {errors.parentName && <p className="text-xs text-primary-foreground/70">{errors.parentName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="enroll-email" className="text-primary-foreground">
            Email <span className="text-primary-foreground/70">*</span>
          </Label>
          <Input
            id="enroll-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            spellCheck={false}
            {...register('email')}
            className={cn(
              'border-primary-foreground/20 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/50',
              errors.email && 'border-destructive'
            )}
          />
          {errors.email && <p className="text-xs text-primary-foreground/70">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="enroll-phone" className="text-primary-foreground">
            Phone <span className="text-primary-foreground/70">*</span>
          </Label>
          <Input
            id="enroll-phone"
            type="tel"
            placeholder="(843) 555-0123"
            autoComplete="tel"
            {...register('phone')}
            className={cn(
              'border-primary-foreground/20 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/50',
              errors.phone && 'border-destructive'
            )}
          />
          {errors.phone && <p className="text-xs text-primary-foreground/70">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="enroll-childName" className="text-primary-foreground">
            Child&apos;s Name <span className="text-primary-foreground/70">*</span>
          </Label>
          <Input
            id="enroll-childName"
            placeholder="Child's first name"
            {...register('childName')}
            className={cn(
              'border-primary-foreground/20 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/50',
              errors.childName && 'border-destructive'
            )}
          />
          {errors.childName && <p className="text-xs text-primary-foreground/70">{errors.childName.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="enroll-childAge" className="text-primary-foreground">
            Child&apos;s Age/DOB <span className="text-primary-foreground/70">*</span>
          </Label>
          <Input
            id="enroll-childAge"
            placeholder="e.g., 3 years or 01/2023"
            {...register('childAge')}
            className={cn(
              'border-primary-foreground/20 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/50',
              errors.childAge && 'border-destructive'
            )}
          />
          {errors.childAge && <p className="text-xs text-primary-foreground/70">{errors.childAge.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="enroll-campus" className="text-primary-foreground">
            Preferred Campus <span className="text-primary-foreground/70">*</span>
          </Label>
          <select
            id="enroll-campus"
            {...register('preferredCampus')}
            className={cn(
              'flex h-9 w-full rounded-md border border-primary-foreground/20 bg-white/10 px-3 py-1 text-sm text-primary-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
              errors.preferredCampus && 'border-destructive'
            )}>
            <option value="" className="text-foreground">
              Select campus
            </option>
            {availableCampuses.map((campus) => (
              <option key={campus} value={campus} className="text-foreground">
                {campus}
              </option>
            ))}
          </select>
          {errors.preferredCampus && (
            <p className="text-xs text-primary-foreground/70">{errors.preferredCampus.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="enroll-startDate" className="text-primary-foreground">
            Desired Start
          </Label>
          <Input
            id="enroll-startDate"
            placeholder="e.g., Fall 2026"
            {...register('startDate')}
            className="border-primary-foreground/20 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="enroll-questions" className="text-primary-foreground">
          Questions
        </Label>
        <Textarea
          id="enroll-questions"
          placeholder="Anything you would like us to know..."
          rows={3}
          {...register('questions')}
          className="border-primary-foreground/20 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/50"
        />
      </div>

      <Button type="submit" size="lg" variant="secondary" className="w-full text-base" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : `Inquire About ${programName}`}
      </Button>
    </form>
  );
}
