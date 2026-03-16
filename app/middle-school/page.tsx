import type { Metadata } from 'next';
import { MezzoHero } from '@/components/mezzo/mezzo-hero';
import { MezzoPhilosophy } from '@/components/mezzo/mezzo-philosophy';
import { MezzoBeyondBooks } from '@/components/mezzo/mezzo-beyond-books';
import { MezzoVirtualTour } from '@/components/mezzo/mezzo-virtual-tour';
import { MezzoRegistration } from '@/components/mezzo/mezzo-registration';

export const metadata: Metadata = {
  title: 'Middle School (Mezzo Farm Program) | Sundrops Montessori',
  description:
    'The Sundrops Adolescent Erdkinder Program addresses the unique needs of the middle schooler with hands-on farm experiences, academic rigor, and social-emotional development.',
};

export default function MiddleSchoolPage() {
  return (
    <>
      <MezzoHero />
      <MezzoPhilosophy />
      <MezzoBeyondBooks />
      <MezzoVirtualTour />
      <MezzoRegistration />
    </>
  );
}
