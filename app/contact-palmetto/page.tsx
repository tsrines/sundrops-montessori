import type { Metadata } from 'next';
import { CampusContactPage } from '@/components/campus-contact-page';

export const metadata: Metadata = {
  title: 'Contact Palmetto Campus | Sundrops Montessori',
  description:
    'Get in touch with the Palmetto Campus in downtown Charleston, SC. Find our address, phone number, and send us a message.',
};

export default function ContactPalmettoPage() {
  return <CampusContactPage campusSlug="palmetto-campus" />;
}
