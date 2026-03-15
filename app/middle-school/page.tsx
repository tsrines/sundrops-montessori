import type { Metadata } from 'next';
import { programs } from '@/lib/data/programs';
import { ProgramHero } from '@/components/programs/program-hero';
import { ProgramFeatures } from '@/components/programs/program-features';
import { CampusAvailability } from '@/components/programs/campus-availability';
import { EnrollmentCta } from '@/components/programs/enrollment-cta';

const program = programs.find((p) => p.slug === 'middle-school')!;

export const metadata: Metadata = {
  title: `${program.name} (${program.montessoriName}) | Sundrops Montessori`,
  description: program.description,
};

export default function MiddleSchoolPage() {
  return (
    <>
      <ProgramHero program={program} />
      <ProgramFeatures features={program.features} />
      <CampusAvailability campuses={program.campuses} />
      <EnrollmentCta programName={program.name} />
    </>
  );
}
