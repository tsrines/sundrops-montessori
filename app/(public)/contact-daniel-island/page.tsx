import type { Metadata } from 'next';
import { CampusContactPage } from '@/components/campus-contact-page';

export const metadata: Metadata = {
  title: 'Contact Daniel Island Campus | Sundrops Montessori',
  description:
    'Get in touch with the Daniel Island Campus in Charleston, SC. Find our address, phone number, and send us a message.',
};

export default function ContactDanielIslandPage() {
  return <CampusContactPage campusSlug="daniel-island-campus" />;
}
