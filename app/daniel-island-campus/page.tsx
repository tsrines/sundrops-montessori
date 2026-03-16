import type { Metadata } from 'next';
import { DiHero } from '@/components/daniel-island/di-hero';
import { DiProgramCards } from '@/components/daniel-island/di-program-cards';
import { DiInfoGrid } from '@/components/daniel-island/di-info-grid';
import { DiCampusLife } from '@/components/daniel-island/di-campus-life';
import { DiOurPeople } from '@/components/daniel-island/di-our-people';
import { DiLeadGuides } from '@/components/daniel-island/di-lead-guides';

export const metadata: Metadata = {
  title: 'Daniel Island Campus | Sundrops Montessori',
  description:
    'Nestled near Daniel Island, this campus provides Montessori education for infants through kindergarten in a beautifully designed space that connects children to nature and community.',
};

export default function DanielIslandCampusPage() {
  return (
    <>
      <DiHero />
      <DiProgramCards />
      <DiInfoGrid />
      <DiCampusLife />
      <DiOurPeople />
      <DiLeadGuides />
    </>
  );
}
