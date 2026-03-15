'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const tourFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  campus: z.string().min(1, 'Please select a campus'),
  childAge: z.string().min(1, "Please enter your child's age"),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  message: z.string().optional(),
});

type TourFormData = z.infer<typeof tourFormSchema>;

interface TourRequestFormProps {
  defaultCampus: string;
}

const CAMPUS_OPTIONS = ['Bridge Campus', 'Daniel Island Campus', 'Palmetto Campus'];

export function TourRequestForm({ defaultCampus }: TourRequestFormProps) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TourFormData>({
    resolver: zodResolver(tourFormSchema),
    defaultValues: {
      campus: defaultCampus,
    },
  });

  const onSubmit = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <h3 className="font-serif text-2xl font-bold text-foreground">Thank you!</h3>
        <p className="mt-3 text-muted-foreground">
          We have received your tour request and will be in touch within one business day to confirm your visit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-xl border bg-card p-8 shadow-sm">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Your full name" {...register('name')} />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="(843) 555-1234" {...register('phone')} />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="campus">Preferred Campus</Label>
          <Select defaultValue={defaultCampus} onValueChange={(value) => setValue('campus', value)}>
            <SelectTrigger id="campus">
              <SelectValue placeholder="Select a campus" />
            </SelectTrigger>
            <SelectContent>
              {CAMPUS_OPTIONS.map((campus) => (
                <SelectItem key={campus} value={campus}>
                  {campus}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.campus && <p className="text-sm text-destructive">{errors.campus.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="childAge">Child&apos;s Age</Label>
          <Input id="childAge" placeholder="e.g., 2 years" {...register('childAge')} />
          {errors.childAge && <p className="text-sm text-destructive">{errors.childAge.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredDate">Preferred Tour Date</Label>
          <Input id="preferredDate" type="date" {...register('preferredDate')} />
          {errors.preferredDate && <p className="text-sm text-destructive">{errors.preferredDate.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea id="message" placeholder="Any questions or special requests..." rows={4} {...register('message')} />
      </div>

      <Button type="submit" size="lg" className="w-full text-base" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Request a Tour'}
      </Button>
    </form>
  );
}
