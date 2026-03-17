import type { Metadata } from 'next';
import { SectionHeading } from '@/components/section-heading';
import { FieldTripForm } from '@/components/forms/field-trip-form';

export const metadata: Metadata = {
  title: 'Field Trip Permission | Sundrops Montessori',
  description: 'Submit a digital field trip permission form for your child at Sundrops Montessori.',
};

export default function FieldTripPermissionPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary/5 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Field Trip Permission
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Complete this digital permission form to authorize your child&apos;s participation in school-sponsored field
            trips.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-2xl px-4">
          <SectionHeading
            eyebrow="Permission Form"
            title="Authorize Field Trip Participation"
            description="Please fill out the form below for each child enrolled at Sundrops Montessori."
            centered
          />
          <div className="mt-10">
            <FieldTripForm />
          </div>
        </div>
      </section>
    </>
  );
}
