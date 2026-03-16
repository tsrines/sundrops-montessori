import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeading } from '@/components/section-heading';
import { JobApplicationForm } from '@/components/forms/job-application-form';
import { CAREERS_HERO, GUIDE_PROGRAMS, PERKS_BENEFITS } from '@/lib/data/careers-content';

export const metadata: Metadata = {
  title: 'Careers | Sundrops Montessori',
  description:
    'Join the Sundrops Montessori team. We are always looking for good people for our Primary, Elementary, Infant, and Toddler programs.',
};

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-amber-50 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                {CAREERS_HERO.heading}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Sundrops Montessori is accepting resumes for our{' '}
                <strong className="text-foreground">Primary and Elementary School</strong> Programs, as well as our{' '}
                <strong className="text-foreground">Infant and Toddler</strong> Programs.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image src={CAREERS_HERO.image.src} alt={CAREERS_HERO.image.alt} fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Open Guide Programs */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <SectionHeading title="OPEN GUIDE PROGRAMS" centered />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {GUIDE_PROGRAMS.map((program) => (
              <Card key={program.id} className="text-center transition-shadow hover:shadow-md">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-foreground">{program.title}</h3>
                  <p className="mt-2 text-muted-foreground">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Perks & Benefits */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <SectionHeading
            title="Perks & Benefits"
            description="We offer a full panel of benefits that keep on growing!"
            centered
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PERKS_BENEFITS.map((benefit) => (
              <Card key={benefit.title} className="text-center">
                <CardContent className="p-8">
                  <div className="mx-auto flex h-8 w-8 items-center justify-center">
                    <Image src={benefit.iconSrc} alt={benefit.title} width={32} height={32} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-2xl px-4">
          <SectionHeading title="SEND US YOUR INITIAL INFORMATION" centered />
          <div className="mt-10">
            <JobApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
