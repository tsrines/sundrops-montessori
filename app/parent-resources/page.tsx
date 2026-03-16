import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, DollarSign, Calendar, Shirt, UtensilsCrossed, Clock, Heart, ExternalLink, Bus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/section-heading';

export const metadata: Metadata = {
  title: 'Parent Resources | Sundrops Montessori',
  description:
    'Access important resources for Sundrops Montessori families including handbooks, tuition info, calendars, and more.',
};

const RESOURCES = [
  {
    icon: FileText,
    title: 'Parent Handbook',
    description: 'Policies, procedures, and everything you need to know as a Sundrops family.',
    href: '#',
    linkText: 'Download Handbook',
    external: false,
  },
  {
    icon: DollarSign,
    title: 'Tuition & Fees',
    description: 'Current tuition rates, payment options, and fee schedules for all programs.',
    href: '#',
    linkText: 'View Tuition Info',
    external: false,
  },
  {
    icon: Calendar,
    title: 'School Calendar',
    description: 'Important dates, holidays, events, and tour schedules for the 2025-2026 school year.',
    href: '/calendar-embed',
    linkText: 'View Calendar',
    external: false,
  },
  {
    icon: Shirt,
    title: 'Dress Code',
    description: 'Guidelines for comfortable, practical clothing that supports independent learning.',
    href: '#',
    linkText: 'View Dress Code',
    external: false,
  },
  {
    icon: UtensilsCrossed,
    title: 'Lunch Menu',
    description: 'Weekly lunch menu options and nutritional guidelines for packed lunches.',
    href: '#',
    linkText: 'View Menu',
    external: false,
  },
  {
    icon: Clock,
    title: 'After School Programs',
    description: 'Extended care options and enrichment activities available after the core school day.',
    href: '#',
    linkText: 'Learn More',
    external: false,
  },
  {
    icon: Bus,
    title: 'Field Trip Permission',
    description: 'Submit a digital permission form to authorize your child for school-sponsored field trips.',
    href: '/field-trip-permission/',
    linkText: 'Submit Form',
    external: false,
  },
  {
    icon: Heart,
    title: 'Sundrops CARES Scholarship',
    description: 'Our scholarship program making Montessori education accessible to families in need.',
    href: 'https://sundropscares.org',
    linkText: 'Visit Sundrops CARES',
    external: true,
  },
  {
    icon: ExternalLink,
    title: 'Parent Portal',
    description: 'Access your account, view invoices, update contact information, and communicate with guides.',
    href: '#',
    linkText: 'Go to Portal',
    external: true,
  },
] as const;

export default function ParentResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary/5 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Parent Resources
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Everything you need as a Sundrops family, all in one place.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((resource) => {
              const Icon = resource.icon;
              const isExternal = resource.external;

              return (
                <Card key={resource.title} className="flex flex-col transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{resource.description}</p>
                    <div className="mt-4">
                      {isExternal ? (
                        <a
                          href={resource.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                          {resource.linkText}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <Link
                          href={resource.href}
                          className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                          {resource.linkText}
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Help CTA */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <SectionHeading
            eyebrow="Need Help?"
            title="We Are Here for You"
            description="If you cannot find what you are looking for, please do not hesitate to reach out to your campus office."
            centered
          />
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
