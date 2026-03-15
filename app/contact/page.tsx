import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { campuses } from '@/lib/data/campuses';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/section-heading';
import { ContactForm } from '@/components/forms/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us | Sundrops Montessori',
  description:
    'Get in touch with Sundrops Montessori. Find campus locations, phone numbers, and email addresses, or send us a message.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary/5 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            We would love to hear from you. Reach out to any of our campuses or send us a message below.
          </p>
        </div>
      </section>

      {/* Campus Contact Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="Our Campuses" title="Campus Locations" centered />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {campuses.map((campus) => (
              <Card key={campus.slug} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{campus.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{campus.location}</p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm text-muted-foreground">{campus.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-primary" />
                    <a href={`tel:${campus.phone}`} className="text-sm text-muted-foreground hover:text-primary">
                      {campus.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-primary" />
                    <a href={`mailto:${campus.email}`} className="text-sm text-muted-foreground hover:text-primary">
                      {campus.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm text-muted-foreground">{campus.hours}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto max-w-2xl px-4">
          <SectionHeading
            eyebrow="Send a Message"
            title="Contact Form"
            description="Have a question or want to learn more? Fill out the form below and we will get back to you within one business day."
            centered
          />
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
