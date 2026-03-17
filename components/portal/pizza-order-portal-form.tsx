'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle } from 'lucide-react';
import { CLASSROOMS, SLICE_OPTIONS } from '@/lib/data/pizza-fridays-content';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { api } from '@/lib/api-client';
import { cn } from '@/lib/utils';

interface Child {
  id: string;
  firstName: string;
  lastName: string;
  classroom?: string | null;
}

interface PizzaOrderPortalFormProps {
  childList: Child[];
}

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

const portalPizzaSchema = z.object({
  childId: z.string().min(1, 'Please select a child'),
  classRoom: z.string().min(1, 'Please select a classroom'),
  dates: z.array(z.string()).min(1, 'Please select at least one Friday'),
  sliceCount: z.enum(['1', '2'], { error: 'Please select a slice count' }),
});

type PortalPizzaValues = z.infer<typeof portalPizzaSchema>;

export function PizzaOrderPortalForm({ childList }: PizzaOrderPortalFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fridays = useMemo(() => getNextFridays(6), []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PortalPizzaValues>({
    resolver: zodResolver(portalPizzaSchema),
    defaultValues: {
      childId: '',
      classRoom: '',
      dates: [],
      sliceCount: undefined,
    },
  });

  // Auto-fill classroom when child changes
  const handleChildChange = (childId: string) => {
    const child = childList.find((c) => c.id === childId);
    if (child?.classroom) {
      setValue('classRoom', child.classroom, { shouldValidate: true });
    }
  };

  const toggleDate = (date: string) => {
    const updated = selectedDates.includes(date)
      ? selectedDates.filter((d) => d !== date)
      : [...selectedDates, date];
    setSelectedDates(updated);
    setValue('dates', updated, { shouldValidate: true });
  };

  const toggleAllDates = () => {
    const updated = selectedDates.length === fridays.length ? [] : [...fridays];
    setSelectedDates(updated);
    setValue('dates', updated, { shouldValidate: true });
  };

  const onSubmit = async (data: PortalPizzaValues) => {
    setSubmitError(null);
    try {
      const orders = data.dates.map((date) => ({
        childId: data.childId,
        classRoom: data.classRoom,
        orderDate: date,
        sliceCount: Number(data.sliceCount),
      }));
      await api.post('/api/portal/pizza-orders', { orders });
      setIsSubmitted(true);
    } catch {
      setSubmitError('Failed to submit order. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mt-6 text-xl font-semibold">Order Submitted</h3>
        <p className="mt-2 text-muted-foreground">Your pizza order has been saved successfully.</p>
        <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
          Place Another Order
        </Button>
      </div>
    );
  }

  if (childList.length === 0) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        Please add a child to your profile before placing pizza orders.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitError && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{submitError}</div>
      )}

      {/* Child Selection */}
      <div className="space-y-2">
        <Label htmlFor="portal-pizza-child">
          Child <span className="text-destructive">*</span>
        </Label>
        <select
          id="portal-pizza-child"
          {...register('childId', {
            onChange: (e) => handleChildChange(e.target.value),
          })}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            errors.childId && 'border-destructive',
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

      {/* Classroom */}
      <div className="space-y-2">
        <Label htmlFor="portal-pizza-classroom">
          Classroom <span className="text-destructive">*</span>
        </Label>
        <select
          id="portal-pizza-classroom"
          {...register('classRoom')}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            errors.classRoom && 'border-destructive',
          )}>
          <option value="">Select classroom</option>
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
              <input
                type="radio"
                value={option.value}
                {...register('sliceCount')}
                className="h-4 w-4 accent-primary"
              />
              {option.label} ({option.price})
            </label>
          ))}
        </div>
        {errors.sliceCount && <p className="text-xs text-destructive">{errors.sliceCount.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Place Order'}
      </Button>
    </form>
  );
}
