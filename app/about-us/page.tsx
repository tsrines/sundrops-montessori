import type { Metadata } from 'next';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { StaffGrid } from '@/components/staff-grid';
import { staffGroups } from '@/lib/data/staff';

export const metadata: Metadata = {
  title: 'About Us | Sundrops Montessori',
  description:
    'Learn about Sundrops Montessori, our mission, Montessori philosophy, history, and the team dedicated to nurturing each child in Charleston, SC.',
};

const PARENT_TESTIMONIALS = [
  {
    name: 'Alexandria',
    quote:
      'Throughout my years as a parent I have discovered there are very few comforts which can compare to the knowledge that your child is in a safe, nurturing and stimulating environment while they are away from home. I have no doubt that the wonderful teachers and staff at Sundrops Montessori love my children. I am confident that they are learning, growing and thriving, and that gives me tremendous peace of mind each and every day.',
  },
  {
    name: 'Molly',
    quote:
      'Both my son and my daughter attend Sundrops. My daughter has been there since she was a baby and I have watched her grow into this very confident, independent, smart, loving little girl with manners beyond her age. I strongly believe it is because of the Montessori approach that Sundrops has given her. My son has only been there a year but I have already seen a wonderful change in him.',
  },
  {
    name: 'Ben',
    quote:
      'Both of my children have been at Sundrops since they were 12 weeks old. I could not be more pleased with the education that they have received. I can see how the Montessori method has helped them to be independent, caring, and enthusiastic about learning. The teachers at Sundrops are wonderful and they truly care about each child.',
  },
] as const;

export default function AboutUsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[500px]">
        <Image
          src="/images/mission-bg.jpg"
          alt="Montessori classroom materials"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex min-h-[400px] items-center md:min-h-[500px]">
          <div className="container mx-auto max-w-5xl px-4 text-center">
            <p className="font-script text-lg text-white/90 md:text-xl">About Sundrops</p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Who We Are
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
              Sundrops Montessori is a private Montessori school dedicated to following the principles presented by Maria
              Montessori in her lifetime work as a child educator.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <SectionHeading eyebrow="Our Story" title="Sundrops Montessori Story" centered />
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              In 1998, under the direction of Shannon Smith, Sundrops Montessori opened its doors with nine children ages
              18 months to 5 years old. Since then, Sundrops has grown to accommodate infants, toddlers, preschool,
              kindergarten, and elementary-age children on multiple campuses in the Charleston, SC area.
            </p>
            <p>
              Under the guidance of Sundrops&apos; certified Montessori staff, children receive individualized learning in
              a multi-age classroom. Our multi-age environment benefits the children in many ways including: peer tutoring,
              leadership opportunities, and extended family-like groupings.
            </p>
            <p>
              The Montessori classroom and materials are carefully designed and arranged to incorporate all five senses into
              the learning experience. The materials are self-correcting, allowing the children to see and correct their own
              mistakes without intervention from the teacher. This builds self-confidence and analytical thinking skills as
              well as the disposition for self-motivated learning that will last a lifetime.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <SectionHeading eyebrow="The Sundrops Vision" title="Our Mission" centered />
          <blockquote className="mt-8 border-l-4 border-primary pl-6 text-left">
            <p className="text-xl italic leading-relaxed text-foreground md:text-2xl">
              At Sundrops, we strive to educate by nurturing each child&apos;s unique social, emotional, and cognitive
              development needs.
            </p>
          </blockquote>
          <p className="mt-8 text-left text-lg leading-relaxed text-muted-foreground">
            The Montessori classroom and materials are carefully designed and arranged to incorporate all five senses into
            the learning experience. The materials are self-correcting, allowing the children to see and correct their own
            mistakes without intervention from the teacher. This builds self-confidence and analytical thinking skills as
            well as the disposition for self-motivated learning that will last a lifetime.
          </p>
        </div>
      </section>

      {/* Staff Grid */}
      <StaffGrid groups={staffGroups} />

      {/* Parent Testimonials */}
      <section className="bg-sundrops-sand/40 py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <SectionHeading eyebrow="Testimonials" title="What Parents are Saying" centered />
          <div className="mt-12 space-y-8">
            {PARENT_TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.name} className="rounded-xl border bg-card p-8 shadow-sm">
                <Quote className="mb-4 h-8 w-8 text-sundrops-warmth opacity-60" />
                <p className="leading-relaxed text-muted-foreground">{testimonial.quote}</p>
                <p className="mt-4 font-semibold text-foreground">-- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
