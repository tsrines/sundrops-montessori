import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EnrollmentInquiryForm } from '@/components/forms/enrollment-inquiry-form';

interface EnrollmentCtaProps {
  programName: string;
  availableCampuses: string[];
}

export function EnrollmentCta({ programName, availableCampuses }: EnrollmentCtaProps) {
  return (
    <section className="w-full bg-primary py-16 text-primary-foreground md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to enroll in {programName}?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
            Take the first step toward a Montessori education for your child. Fill out an inquiry below or learn more
            about our enrollment process.
          </p>
        </div>
        <div className="mt-10">
          <EnrollmentInquiryForm programName={programName} availableCampuses={availableCampuses} />
        </div>
        <div className="mt-8 text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 text-base hover:bg-primary-foreground/10">
            <Link href="/faqs/">Learn About Enrollment</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
