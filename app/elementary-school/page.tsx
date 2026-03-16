import type { Metadata } from 'next';
import { ElementaryHero } from '@/components/elementary/elementary-hero';
import { ElementaryIntro } from '@/components/elementary/elementary-intro';
import { ElementaryExperiential } from '@/components/elementary/elementary-experiential';
import { ElementaryBeyondBooks } from '@/components/elementary/elementary-beyond-books';
import { ElementaryRegistration } from '@/components/elementary/elementary-registration';

export const metadata: Metadata = {
  title: 'Elementary School (Lower & Upper Elementary) | Sundrops Montessori',
  description:
    'Authentic Montessori elementary education for 1st through 6th grade in Mount Pleasant, SC. Hands-on learning, experiential approach, and a nurturing community.',
};

export default function ElementarySchoolPage() {
  return (
    <>
      <ElementaryHero />
      <ElementaryIntro />
      <ElementaryExperiential />
      <ElementaryBeyondBooks />
      <ElementaryRegistration />
    </>
  );
}
