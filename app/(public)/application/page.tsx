import type { Metadata } from 'next';
import Link from 'next/link';
import { FileDown } from 'lucide-react';
import { ApplicationForm } from '@/components/application/application-form';

export const metadata: Metadata = {
  title: 'Online Application | Sundrops Montessori',
  description:
    'Apply online to Sundrops Montessori. Complete the application form for infant, toddler, preschool, elementary, or middle school programs.',
};

export default function ApplicationPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary/5 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Online Application
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-primary">$100 Non-Refundable Application Fee</p>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Application fee expires 6 months from desired start date. Payment instructions will be sent after
            submission.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <ApplicationForm />

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Prefer paper?{' '}
              <Link
                href="/documents/application-form.pdf"
                className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
                <FileDown className="h-4 w-4" />
                Download PDF Application
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
