import { notFound } from 'next/navigation';
import { campuses } from '@/lib/data/campuses';
import { ContactForm } from '@/components/forms/contact-form';

const CAMPUS_COLORS: Record<string, string> = {
  'bridge-campus': 'bg-[#FF7355]',
  'daniel-island-campus': 'bg-[#2B76DF]',
  'palmetto-campus': 'bg-[#8ABF20]',
  'farm-campus': 'bg-[#8300E9]',
};

const CAMPUS_DISPLAY_NAMES: Record<string, string> = {
  'farm-campus': 'Mezzo Middle School',
};

interface CampusContactPageProps {
  campusSlug: string;
}

export function CampusContactPage({ campusSlug }: CampusContactPageProps) {
  const campus = campuses.find((c) => c.slug === campusSlug);

  if (!campus) {
    notFound();
  }

  const displayName = CAMPUS_DISPLAY_NAMES[campus.slug] ?? campus.name;

  return (
    <>
      {/* Hero */}
      <section className="bg-primary/5 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Contact Us</p>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Contact {displayName}
          </h1>
        </div>
      </section>

      {/* Campus Contact Card */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-2xl px-4">
          <div className={`${CAMPUS_COLORS[campus.slug] ?? 'bg-primary'} rounded-xl p-8 text-white`}>
            <h4 className="text-xl font-bold">{displayName}</h4>
            <p className="mt-3 text-sm text-white/90">{campus.address}</p>
            <a href={`tel:${campus.phone}`} className="mt-1 block text-sm text-white/90 hover:text-white">
              {campus.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto max-w-2xl px-4">
          <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-foreground">Send a Message</h2>
          <p className="mt-3 text-center text-muted-foreground">
            Have a question about {displayName}? Fill out the form below and we will get back to you within one business
            day.
          </p>
          <div className="mt-12">
            <ContactForm defaultCampus={campusSlug} />
          </div>
        </div>
      </section>
    </>
  );
}
