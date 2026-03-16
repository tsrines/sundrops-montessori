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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Position {
  readonly id: string;
  readonly title: string;
  readonly campus: string;
}

interface JobApplicationFormProps {
  positions: readonly Position[];
}

const CAMPUS_OPTIONS = ['Bridge Campus', 'Daniel Island Campus', 'Palmetto Campus', 'Farm Campus', 'No Preference'];

const applicationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  positionInterest: z.string().min(1, 'Please select a position'),
  campusPreference: z.string().min(1, 'Please select a campus preference'),
  coverLetter: z.string().min(20, 'Please write a brief cover letter (at least 20 characters)'),
  referralSource: z.string().optional(),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

export function JobApplicationForm({ positions }: JobApplicationFormProps) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      positionInterest: '',
      campusPreference: '',
      coverLetter: '',
      referralSource: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
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
          Thank you for your interest in joining Sundrops Montessori. Our team will review your application and reach
          out within 5 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-xl border bg-card p-8">
      {/* Name & Contact */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="app-fullName">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="app-fullName"
            placeholder="Your full name"
            {...register('fullName')}
            className={cn(errors.fullName && 'border-destructive')}
          />
          {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
        </div>
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
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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
        <div className="space-y-2">
          <Label htmlFor="app-referral">How did you hear about us?</Label>
          <Input id="app-referral" placeholder="e.g., Indeed, referral, website" {...register('referralSource')} />
        </div>
      </div>

      {/* Position & Campus */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="app-position">
            Position of Interest <span className="text-destructive">*</span>
          </Label>
          <Select onValueChange={(value) => setValue('positionInterest', value, { shouldValidate: true })}>
            <SelectTrigger id="app-position" className={cn(errors.positionInterest && 'border-destructive')}>
              <SelectValue placeholder="Select a position" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((pos) => (
                <SelectItem key={pos.id} value={pos.title}>
                  {pos.title} ({pos.campus})
                </SelectItem>
              ))}
              <SelectItem value="General Interest">General Interest / Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.positionInterest && <p className="text-xs text-destructive">{errors.positionInterest.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="app-campus">
            Campus Preference <span className="text-destructive">*</span>
          </Label>
          <Select onValueChange={(value) => setValue('campusPreference', value, { shouldValidate: true })}>
            <SelectTrigger id="app-campus" className={cn(errors.campusPreference && 'border-destructive')}>
              <SelectValue placeholder="Select campus preference" />
            </SelectTrigger>
            <SelectContent>
              {CAMPUS_OPTIONS.map((campus) => (
                <SelectItem key={campus} value={campus}>
                  {campus}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.campusPreference && <p className="text-xs text-destructive">{errors.campusPreference.message}</p>}
        </div>
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
              <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX (max 5MB)</p>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Cover Letter */}
      <div className="space-y-2">
        <Label htmlFor="app-coverLetter">
          Cover Letter <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="app-coverLetter"
          placeholder="Tell us why you are passionate about Montessori education and what you would bring to our team..."
          rows={6}
          {...register('coverLetter')}
          className={cn(errors.coverLetter && 'border-destructive')}
        />
        {errors.coverLetter && <p className="text-xs text-destructive">{errors.coverLetter.message}</p>}
      </div>

      {/* Submit */}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
}
