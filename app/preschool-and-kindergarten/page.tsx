import type { Metadata } from 'next';
import { programs } from '@/lib/data/programs';
import { ProgramHero } from '@/components/programs/program-hero';
import { ProgramDetails } from '@/components/programs/program-details';
import { ProgramFeatures } from '@/components/programs/program-features';
import { CampusAvailability } from '@/components/programs/campus-availability';
import { EnrollmentCta } from '@/components/programs/enrollment-cta';

const program = programs.find((p) => p.slug === 'preschool-and-kindergarten')!;

export const metadata: Metadata = {
  title: `${program.name} (${program.montessoriName}) | Sundrops Montessori`,
  description: program.description,
};

export default function PreschoolAndKindergartenPage() {
  return (
    <>
      <ProgramHero program={program} />
      <ProgramDetails extendedDescription={program.extendedDescription} />
      <ProgramFeatures features={program.features} />
      <CampusAvailability campuses={program.campuses} />
      <EnrollmentCta programName={program.name} availableCampuses={program.campuses} />
    </>
  );
}
