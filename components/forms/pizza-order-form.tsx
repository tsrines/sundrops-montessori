'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle } from 'lucide-react';
import { pizzaOrderSchema, type PizzaOrderValues } from '@/lib/schemas/pizza-order-schema';
import { CLASSROOMS, SLICE_OPTIONS } from '@/lib/data/pizza-fridays-content';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

function getNextFridays(count: number): string[] {
  const fridays: string[] = [];
  const date = new Date();
  date.setDate(date.getDate() + ((5 - date.getDay() + 7) % 7 || 7));

  for (let i = 0; i < count; i++) {
    fridays.push(date.toISOString().split('T')[0]);
    date.setDate(date.getDate() + 7);
  }
  return fridays;
}

function formatFridayLabel(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

const INPUT_BORDER = 'border-[#E09900] focus-visible:ring-[#E09900]';

export function PizzaOrderForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const fridays = useMemo(() => getNextFridays(6), []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PizzaOrderValues>({
    resolver: zodResolver(pizzaOrderSchema),
    defaultValues: {
      childFirstName: '',
      childLastName: '',
      classRoom: '',
      dates: [],
      sliceCount: undefined,
    },
  });

  const toggleDate = (date: string) => {
    const updated = selectedDates.includes(date) ? selectedDates.filter((d) => d !== date) : [...selectedDates, date];
    setSelectedDates(updated);
    setValue('dates', updated, { shouldValidate: true });
  };

  const toggleAllDates = () => {
    const updated = selectedDates.length === fridays.length ? [] : [...fridays];
    setSelectedDates(updated);
    setValue('dates', updated, { shouldValidate: true });
  };

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mt-6 text-xl font-semibold text-foreground">Order Submitted</h3>
        <p className="mt-2 text-muted-foreground">Your pizza order has been submitted successfully. Thank you!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Child Name */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="po-firstName" className="sr-only">
            Child First Name
          </Label>
          <Input
            id="po-firstName"
            placeholder="Child First Name *"
            {...register('childFirstName')}
            className={cn(INPUT_BORDER, errors.childFirstName && 'border-destructive')}
          />
          {errors.childFirstName && <p className="text-xs text-destructive">{errors.childFirstName.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="po-lastName" className="sr-only">
            Child Last Name
          </Label>
          <Input
            id="po-lastName"
            placeholder="Child Last Name *"
            {...register('childLastName')}
            className={cn(INPUT_BORDER, errors.childLastName && 'border-destructive')}
          />
          {errors.childLastName && <p className="text-xs text-destructive">{errors.childLastName.message}</p>}
        </div>
      </div>

      {/* Classroom */}
      <div className="space-y-1">
        <Label htmlFor="po-classroom" className="sr-only">
          Class
        </Label>
        <select
          id="po-classroom"
          {...register('classRoom')}
          className={cn(
            'flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1',
            INPUT_BORDER,
            errors.classRoom && 'border-destructive'
          )}>
          <option value="">Class *</option>
          {CLASSROOMS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.classRoom && <p className="text-xs text-destructive">{errors.classRoom.message}</p>}
      </div>

      {/* Friday Date Selection */}
      <div className="space-y-3">
        <Label>
          Pizza Fridays <span className="text-destructive">*</span>
        </Label>
        <div className="grid gap-2 sm:grid-cols-3">
          {fridays.map((date) => (
            <label
              key={date}
              className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm hover:bg-muted/50">
              <Checkbox checked={selectedDates.includes(date)} onCheckedChange={() => toggleDate(date)} />
              {formatFridayLabel(date)}
            </label>
          ))}
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-primary">
          <Checkbox checked={selectedDates.length === fridays.length} onCheckedChange={toggleAllDates} />
          Select All Dates
        </label>
        {errors.dates && <p className="text-xs text-destructive">{errors.dates.message}</p>}
      </div>

      {/* Slice Count */}
      <div className="space-y-3">
        <Label>
          Number of Slices <span className="text-destructive">*</span>
        </Label>
        <div className="flex gap-6">
          {SLICE_OPTIONS.map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="radio" value={option.value} {...register('sliceCount')} className="h-4 w-4 accent-primary" />
              {option.label} ({option.price})
            </label>
          ))}
        </div>
        {errors.sliceCount && <p className="text-xs text-destructive">{errors.sliceCount.message}</p>}
      </div>

      {/* Submit */}
      <div className="space-y-3 text-center">
        <Button
          type="submit"
          size="lg"
          className="bg-destructive text-white hover:bg-destructive/90"
          disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'SAVE & CHECKOUT'}
        </Button>
        <p className="text-sm text-muted-foreground">
          Please checkout &amp; complete payment to secure your pizza order!
        </p>
      </div>
    </form>
  );
}
