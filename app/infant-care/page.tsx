import type { Metadata } from 'next';
import { InfantHero } from '@/components/infant/infant-hero';
import { InfantContentGrid } from '@/components/infant/infant-content-grid';
import { InfantBeyondBooks } from '@/components/infant/infant-beyond-books';
import { InfantRegistration } from '@/components/infant/infant-registration';

export const metadata: Metadata = {
  title: 'Infant Care (Nido) | Sundrops Montessori',
  description:
    'The word Nido is Italian for nest. The Nido environment focuses on the basic needs of the infant, a safe bonded relationship between the caregivers and the child, respecting each individual child and the development of the child\u2019s increasing sense of self and independence.',
};

export default function InfantCarePage() {
  return (
    <>
      <InfantHero />
      <InfantContentGrid />
      <InfantBeyondBooks />
      <InfantRegistration />
    </>
  );
}
