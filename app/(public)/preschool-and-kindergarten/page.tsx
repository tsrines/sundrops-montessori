import type { Metadata } from 'next';
import { PreschoolHero } from '@/components/preschool/preschool-hero';
import { PreschoolContentGrid } from '@/components/preschool/preschool-content-grid';
import { PreschoolBeyondBooks } from '@/components/preschool/preschool-beyond-books';
import { PreschoolRegistration } from '@/components/preschool/preschool-registration';

export const metadata: Metadata = {
  title: 'Preschool & Kindergarten (Casa Program) | Sundrops Montessori',
  description:
    'Sundrops Montessori preschool and kindergarten Casa program for children ages 3 to 6 years. Explore the 3-year Montessori learning cycle.',
};

export default function PreschoolAndKindergartenPage() {
  return (
    <>
      <PreschoolHero />
      <PreschoolContentGrid />
      <PreschoolBeyondBooks />
      <PreschoolRegistration />
    </>
  );
}
