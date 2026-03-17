import type { Metadata } from 'next';
import { CampusContactPage } from '@/components/campus-contact-page';

export const metadata: Metadata = {
  title: 'Contact Bridge Campus | Sundrops Montessori',
  description:
    'Get in touch with the Bridge Campus in Mt Pleasant, SC. Find our address, phone number, and send us a message.',
};

export default function ContactBridgePage() {
  return <CampusContactPage campusSlug="bridge-campus" />;
}
