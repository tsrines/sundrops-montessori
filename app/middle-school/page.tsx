import type { Metadata } from 'next';
import { MezzoHero } from '@/components/mezzo/mezzo-hero';
import { MezzoInfoGrid } from '@/components/mezzo/mezzo-info-grid';
import { MezzoComparison } from '@/components/mezzo/mezzo-comparison';
import { MezzoCampusLife } from '@/components/mezzo/mezzo-campus-life';
import { MezzoAlumni } from '@/components/mezzo/mezzo-alumni';
import { MezzoQuoteBanner } from '@/components/mezzo/mezzo-quote-banner';
import { MezzoVirtualTour } from '@/components/mezzo/mezzo-virtual-tour';
import { MezzoOurPeople } from '@/components/mezzo/mezzo-our-people';
import { MezzoCta } from '@/components/mezzo/mezzo-cta';

export const metadata: Metadata = {
  title: 'Middle School (Mezzo Farm Program) | Sundrops Montessori',
  description:
    'The Sundrops Adolescent Erdkinder Program addresses the unique needs of the middle schooler with hands-on farm experiences, academic rigor, and social-emotional development.',
};

export default function MiddleSchoolPage() {
  return (
    <>
      <MezzoHero />
      <MezzoInfoGrid />
      <MezzoComparison />
      <MezzoCampusLife />
      <MezzoAlumni />
      <MezzoQuoteBanner />
      <MezzoVirtualTour />
      <MezzoOurPeople />
      <MezzoCta />
    </>
  );
}
