import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CtaBanner } from '@/components/cta-banner';

export const metadata: Metadata = {
  title: 'Parent Resources | Sundrops Montessori',
  description: 'Resources and tools for Sundrops Montessori families.',
};

const resources = [
  {
    title: 'Pizza Fridays',
    description:
      'Order pizza for your child every Friday. Choose slice count, select dates, and place your order online.',
    href: '/pizza-fridays/',
  },
];

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
            Helpful resources and tools for Sundrops Montessori families.
          </p>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid gap-6 sm:grid-cols-2">
            {resources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="group flex flex-col rounded-xl border p-6 transition-colors hover:border-primary/50 hover:bg-primary/5">
                <h2 className="text-xl font-semibold text-foreground group-hover:text-primary">{resource.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{resource.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title="Have Questions?"
        description="We're here to help. Reach out to our team for any questions about our programs or resources."
        buttonText="Contact Us"
        buttonHref="/contact/"
      />
    </>
  );
}
