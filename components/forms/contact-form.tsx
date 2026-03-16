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

const CAMPUS_OPTIONS = [
  { value: 'bridge-campus', label: 'Bridge' },
  { value: 'daniel-island-campus', label: 'Daniel Island' },
  { value: 'palmetto-campus', label: 'Palmetto' },
  { value: 'farm-campus', label: 'Farm' },
] as const;

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone is required'),
  campus: z.array(z.string()).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  defaultCampus?: string;
}

export function ContactForm({ defaultCampus }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      campus: defaultCampus ? [defaultCampus] : [],
      message: '',
    },
  });

  const onSubmit = async () => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-xl border bg-card p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mt-6 text-xl font-semibold text-foreground">Message Sent</h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for reaching out. A member of our team will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-xl border bg-card p-8">
      {/* Name Row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            placeholder="Jane"
            {...register('firstName')}
            className={cn(errors.firstName && 'border-destructive')}
          />
          {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            placeholder="Smith"
            {...register('lastName')}
            className={cn(errors.lastName && 'border-destructive')}
          />
          {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Email & Phone Row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@example.com"
            {...register('email')}
            className={cn(errors.email && 'border-destructive')}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(843) 555-0123"
            {...register('phone')}
            className={cn(errors.phone && 'border-destructive')}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Campus Checkboxes */}
      <div className="space-y-3">
        <Label>Campus</Label>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {CAMPUS_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value={option.value}
                {...register('campus')}
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us more about your inquiry..."
          rows={5}
          {...register('message')}
          className={cn(errors.message && 'border-destructive')}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
      </div>

      {/* Submit */}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
