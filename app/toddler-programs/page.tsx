import type { Metadata } from 'next';
import { ToddlerHero } from '@/components/toddler/toddler-hero';
import { ToddlerContentGrid } from '@/components/toddler/toddler-content-grid';
import { ToddlerBeyondBooks } from '@/components/toddler/toddler-beyond-books';
import { ToddlerRegistration } from '@/components/toddler/toddler-registration';

export const metadata: Metadata = {
  title: 'Toddler Programs (Pee Wee & Wee Casa) | Sundrops Montessori',
  description:
    'Montessori toddler programs for ages 14-36 months. Fostering independence, language development, and respect for the child in a carefully prepared environment.',
};

export default function ToddlerProgramsPage() {
  return (
    <>
      <ToddlerHero />
      <ToddlerContentGrid />
      <ToddlerBeyondBooks />
      <ToddlerRegistration />
    </>
  );
}
