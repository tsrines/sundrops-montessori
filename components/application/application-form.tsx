'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { applicationSchema, type ApplicationValues } from '@/lib/schemas/application-schema';
import { ApplicationSection } from './application-section';
import { CampusProgramSelector } from './campus-program-selector';

export function ApplicationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showParent2, setShowParent2] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ApplicationValues>({
    mode: 'onChange',
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      childFirstName: '',
      childLastName: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      state: '',
      zip: '',
      desiredStartDate: '',
      previousSchool: '',
      siblings: '',
      siblingsAges: '',
      parent1FirstName: '',
      parent1LastName: '',
      parent1Phone: '',
      parent1Employer: '',
      parent1Position: '',
      parent1WorkPhone: '',
      parent2FirstName: '',
      parent2LastName: '',
      parent2Phone: '',
      parent2Employer: '',
      parent2Position: '',
      parent2WorkPhone: '',
      email1: '',
      email2: '',
      campus: '',
      program: '',
      session: '',
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
        <h3 className="mt-6 text-xl font-semibold text-foreground">Application Submitted</h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for applying to Sundrops Montessori. Our admissions team will review your application and contact
          you within 3-5 business days.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Please note: the $100 non-refundable application fee is due separately. You will receive payment instructions
          via email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 rounded-xl border bg-card p-8">
      {/* Section 1: Child Information */}
      <ApplicationSection number={1} title="Child Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="app-childFirstName">
              First Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="app-childFirstName"
              placeholder="Child's first name"
              {...register('childFirstName')}
              className={cn(errors.childFirstName && 'border-destructive')}
            />
            {errors.childFirstName && <p className="text-xs text-destructive">{errors.childFirstName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="app-childLastName">
              Last Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="app-childLastName"
              placeholder="Child's last name"
              {...register('childLastName')}
              className={cn(errors.childLastName && 'border-destructive')}
            />
            {errors.childLastName && <p className="text-xs text-destructive">{errors.childLastName.message}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="app-dob">
              Date of Birth <span className="text-destructive">*</span>
            </Label>
            <Input
              id="app-dob"
              type="date"
              {...register('dateOfBirth')}
              className={cn(errors.dateOfBirth && 'border-destructive')}
            />
            {errors.dateOfBirth && <p className="text-xs text-destructive">{errors.dateOfBirth.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="app-gender">Gender</Label>
            <Input id="app-gender" placeholder="Optional" {...register('gender')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="app-startDate">
              Desired Start Date <span className="text-destructive">*</span>
            </Label>
            <Input
              id="app-startDate"
              type="date"
              {...register('desiredStartDate')}
              className={cn(errors.desiredStartDate && 'border-destructive')}
            />
            {errors.desiredStartDate && <p className="text-xs text-destructive">{errors.desiredStartDate.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="app-address">
            Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="app-address"
            placeholder="Street address"
            {...register('address')}
            className={cn(errors.address && 'border-destructive')}
          />
          {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="app-state">
              State <span className="text-destructive">*</span>
            </Label>
            <Input
              id="app-state"
              placeholder="SC"
              {...register('state')}
              className={cn(errors.state && 'border-destructive')}
            />
            {errors.state && <p className="text-xs text-destructive">{errors.state.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="app-zip">
              Zip Code <span className="text-destructive">*</span>
            </Label>
            <Input
              id="app-zip"
              placeholder="29464"
              {...register('zip')}
              className={cn(errors.zip && 'border-destructive')}
            />
            {errors.zip && <p className="text-xs text-destructive">{errors.zip.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="app-prevSchool">Previous School</Label>
          <Input id="app-prevSchool" placeholder="Name of previous school (if any)" {...register('previousSchool')} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="app-siblings">Siblings</Label>
            <Input id="app-siblings" placeholder="Names of siblings (if any)" {...register('siblings')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="app-siblingsAges">Siblings&apos; Ages</Label>
            <Input id="app-siblingsAges" placeholder="Ages of siblings" {...register('siblingsAges')} />
          </div>
        </div>
      </ApplicationSection>

      <hr className="border-border" />

      {/* Section 2: Parent/Guardian Information */}
      <ApplicationSection number={2} title="Parent/Guardian Information">
        {/* Parent 1 */}
        <p className="text-sm font-medium text-foreground">Parent/Guardian 1</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="app-p1FirstName">
              First Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="app-p1FirstName"
              placeholder="First name"
              {...register('parent1FirstName')}
              className={cn(errors.parent1FirstName && 'border-destructive')}
            />
            {errors.parent1FirstName && <p className="text-xs text-destructive">{errors.parent1FirstName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="app-p1LastName">
              Last Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="app-p1LastName"
              placeholder="Last name"
              {...register('parent1LastName')}
              className={cn(errors.parent1LastName && 'border-destructive')}
            />
            {errors.parent1LastName && <p className="text-xs text-destructive">{errors.parent1LastName.message}</p>}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="app-p1Phone">
              Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="app-p1Phone"
              type="tel"
              placeholder="(843) 555-0123"
              {...register('parent1Phone')}
              className={cn(errors.parent1Phone && 'border-destructive')}
            />
            {errors.parent1Phone && <p className="text-xs text-destructive">{errors.parent1Phone.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="app-p1Employer">Employer</Label>
            <Input id="app-p1Employer" placeholder="Employer name" {...register('parent1Employer')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="app-p1Position">Position</Label>
            <Input id="app-p1Position" placeholder="Job title" {...register('parent1Position')} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="app-p1WorkPhone">Work Phone</Label>
          <Input
            id="app-p1WorkPhone"
            type="tel"
            placeholder="Work phone (optional)"
            {...register('parent1WorkPhone')}
          />
        </div>

        {/* Parent 2 */}
        {!showParent2 ? (
          <button
            type="button"
            onClick={() => setShowParent2(true)}
            className="mt-4 flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            <Plus className="h-4 w-4" />
            Add Another Parent/Guardian
          </button>
        ) : (
          <>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Parent/Guardian 2</p>
              <button
                type="button"
                onClick={() => setShowParent2(false)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive">
                <X className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="app-p2FirstName">First Name</Label>
                <Input id="app-p2FirstName" placeholder="First name" {...register('parent2FirstName')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="app-p2LastName">Last Name</Label>
                <Input id="app-p2LastName" placeholder="Last name" {...register('parent2LastName')} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="app-p2Phone">Phone</Label>
                <Input id="app-p2Phone" type="tel" placeholder="(843) 555-0123" {...register('parent2Phone')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="app-p2Employer">Employer</Label>
                <Input id="app-p2Employer" placeholder="Employer name" {...register('parent2Employer')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="app-p2Position">Position</Label>
                <Input id="app-p2Position" placeholder="Job title" {...register('parent2Position')} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="app-p2WorkPhone">Work Phone</Label>
              <Input
                id="app-p2WorkPhone"
                type="tel"
                placeholder="Work phone (optional)"
                {...register('parent2WorkPhone')}
              />
            </div>
          </>
        )}

        {/* Email Addresses */}
        <p className="mt-6 text-sm font-medium text-foreground">Email Addresses</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="app-email1">
              Primary Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="app-email1"
              type="email"
              placeholder="parent@example.com"
              {...register('email1')}
              className={cn(errors.email1 && 'border-destructive')}
            />
            {errors.email1 && <p className="text-xs text-destructive">{errors.email1.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="app-email2">Secondary Email</Label>
            <Input id="app-email2" type="email" placeholder="Optional second email" {...register('email2')} />
            {errors.email2 && <p className="text-xs text-destructive">{errors.email2.message}</p>}
          </div>
        </div>
      </ApplicationSection>

      <hr className="border-border" />

      {/* Section 3: Campus, Program & Session */}
      <ApplicationSection number={3} title="Campus, Program & Session">
        <CampusProgramSelector register={register} errors={errors} control={control} setValue={setValue} />
      </ApplicationSection>

      <hr className="border-border" />

      {/* Section 4: Review & Submit */}
      <ApplicationSection
        number={4}
        title="Review & Submit"
        description="Please review your information above before submitting.">
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            A <strong className="text-foreground">$100 non-refundable application fee</strong> is required to process
            your application. Payment instructions will be sent to the email address provided. The application fee
            expires 6 months from your desired start date.
          </p>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
        </Button>
      </ApplicationSection>
    </form>
  );
}
