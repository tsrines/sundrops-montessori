import type { Metadata } from 'next';
import { MezzoProgramHero } from '@/components/mezzo-program/mezzo-program-hero';
import { MezzoProgramContent } from '@/components/mezzo-program/mezzo-program-content';
import { MezzoProgramBeyondBooks } from '@/components/mezzo-program/mezzo-program-beyond-books';
import { MezzoProgramVirtualTour } from '@/components/mezzo-program/mezzo-program-virtual-tour';
import { MezzoProgramRegistration } from '@/components/mezzo-program/mezzo-program-registration';

export const metadata: Metadata = {
  title: 'Middle School | Charleston, SC | Sundrops Montessori',
  description:
    'The Sundrops Middle School program addresses the unique needs of the adolescent while working to ramp up passion for academics and inspire character growth.',
};

export default function MezzoProgramPage() {
  return (
    <>
      <MezzoProgramHero />
      <MezzoProgramContent />
      <MezzoProgramBeyondBooks />
      <MezzoProgramVirtualTour />
      <MezzoProgramRegistration />
    </>
  );
}
