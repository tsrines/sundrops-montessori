'use client';

import { useEffect } from 'react';
import { useWatch, type Control, type FieldErrors, type UseFormRegister, type UseFormSetValue } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { APPLICATION_CAMPUSES, getAvailablePrograms, getAvailableSessions } from '@/lib/data/application-form-data';
import { cn } from '@/lib/utils';
import type { ApplicationValues } from '@/lib/schemas/application-schema';

interface CampusProgramSelectorProps {
  register: UseFormRegister<ApplicationValues>;
  errors: FieldErrors<ApplicationValues>;
  control: Control<ApplicationValues>;
  setValue: UseFormSetValue<ApplicationValues>;
}

const selectClasses =
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';

export function CampusProgramSelector({ register, errors, control, setValue }: CampusProgramSelectorProps) {
  const campus = useWatch({ control, name: 'campus' });
  const program = useWatch({ control, name: 'program' });
  const session = useWatch({ control, name: 'session' });

  const availablePrograms = getAvailablePrograms(campus);
  const availableSessions = getAvailableSessions(program);

  // Reset program when campus changes and current selection is no longer valid
  useEffect(() => {
    if (program && campus) {
      const isValid = availablePrograms.some((p) => p.value === program);
      if (!isValid) {
        setValue('program', '', { shouldValidate: false });
        setValue('session', '', { shouldValidate: false });
      }
    }
  }, [campus, program, availablePrograms, setValue]);

  // Reset session when program changes and current selection is no longer valid
  useEffect(() => {
    if (session && program) {
      const isValid = availableSessions.some((s) => s.value === session);
      if (!isValid) {
        setValue('session', '', { shouldValidate: false });
      }
    }
  }, [program, session, availableSessions, setValue]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="app-campus">
            Campus <span className="text-destructive">*</span>
          </Label>
          <select
            id="app-campus"
            {...register('campus')}
            className={cn(selectClasses, errors.campus && 'border-destructive')}>
            <option value="">Select campus</option>
            {APPLICATION_CAMPUSES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {errors.campus && <p className="text-xs text-destructive">{errors.campus.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="app-program">
            Program <span className="text-destructive">*</span>
          </Label>
          <select
            id="app-program"
            {...register('program')}
            disabled={!campus}
            className={cn(selectClasses, !campus && 'opacity-50', errors.program && 'border-destructive')}>
            <option value="">{campus ? 'Select program' : 'Select a campus first'}</option>
            {availablePrograms.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label} ({p.ageRange})
              </option>
            ))}
          </select>
          {errors.program && <p className="text-xs text-destructive">{errors.program.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="app-session">
            Session <span className="text-destructive">*</span>
          </Label>
          <select
            id="app-session"
            {...register('session')}
            disabled={!program}
            className={cn(selectClasses, !program && 'opacity-50', errors.session && 'border-destructive')}>
            <option value="">{program ? 'Select session' : 'Select a program first'}</option>
            {availableSessions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label} ({s.hours})
              </option>
            ))}
          </select>
          {errors.session && <p className="text-xs text-destructive">{errors.session.message}</p>}
        </div>
      </div>

      {campus && availablePrograms.length < 5 && (
        <p className="text-xs text-muted-foreground">
          Some programs are only available at specific campuses. Elementary and Middle School are offered at Bridge
          Campus only.
        </p>
      )}
    </div>
  );
}
