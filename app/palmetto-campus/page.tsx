import type { Metadata } from 'next';
import { PalHero } from '@/components/palmetto/pal-hero';
import { PalProgramCards } from '@/components/palmetto/pal-program-cards';
import { PalInfoGrid } from '@/components/palmetto/pal-info-grid';
import { PalAdmin } from '@/components/palmetto/pal-admin';
import { PalLeadGuides } from '@/components/palmetto/pal-lead-guides';
import { PalInstagram } from '@/components/palmetto/pal-instagram';

export const metadata: Metadata = {
  title: 'Palmetto Campus | Sundrops Montessori',
  description:
    'Our Palmetto campus in downtown Charleston, SC offers infant, toddler, preschool, and kindergarten programs.',
};

export default function PalmettoCampusPage() {
  return (
    <>
      <PalHero />
      <PalProgramCards />
      <PalInfoGrid />
      <PalAdmin />
      <PalLeadGuides />
      <PalInstagram />
    </>
  );
}
