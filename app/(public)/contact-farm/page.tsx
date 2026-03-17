import type { Metadata } from 'next';
import { CampusContactPage } from '@/components/campus-contact-page';

export const metadata: Metadata = {
  title: 'Contact Farm Campus | Sundrops Montessori',
  description:
    'Get in touch with the Farm Campus (Mezzo Middle School) in Huger, SC. Find our address, phone number, and send us a message.',
};

export default function ContactFarmPage() {
  return <CampusContactPage campusSlug="farm-campus" />;
}
