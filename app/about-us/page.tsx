import type { Metadata } from 'next';
import Image from 'next/image';
import { SectionHeading } from '@/components/section-heading';

export const metadata: Metadata = {
  title: 'About Us | Sundrops Montessori',
  description:
    'Learn about Sundrops Montessori, our mission, Montessori philosophy, history, and the team dedicated to nurturing each child in Charleston, SC.',
};

const PHILOSOPHY_PRINCIPLES = [
  {
    title: 'Child-Led Learning',
    description:
      'Children choose their own activities within a structured environment, building intrinsic motivation and a lifelong love of learning.',
  },
  {
    title: 'The Prepared Environment',
    description:
      'Every classroom is thoughtfully designed with age-appropriate materials arranged to invite exploration, independence, and discovery.',
  },
  {
    title: 'Multi-Age Classrooms',
    description:
      'Children of varying ages learn together, fostering mentorship, collaboration, and a natural social structure that mirrors the real world.',
  },
  {
    title: 'Hands-On Materials',
    description:
      'Specially designed Montessori materials allow children to move from concrete to abstract understanding, making complex concepts tangible and accessible.',
  },
] as const;

const TIMELINE_MILESTONES = [
  {
    year: '2003',
    title: 'The Beginning',
    description:
      'Shannon Smith founded Sundrops Montessori with a single classroom in Mt Pleasant, SC, driven by a vision to bring authentic Montessori education to the Charleston area.',
  },
  {
    year: '2008',
    title: 'Bridge Campus Expansion',
    description:
      'Growing demand led to the expansion of the Bridge Campus, adding infant and elementary programs to serve families from 6 weeks through 6th grade.',
  },
  {
    year: '2014',
    title: 'Daniel Island Campus Opens',
    description:
      'A second campus opened near Daniel Island, bringing Montessori education to more families in the East Cooper community.',
  },
  {
    year: '2018',
    title: 'Palmetto Campus Opens',
    description:
      'The Palmetto Campus launched in downtown Charleston, serving toddler and preschool families in the heart of the city.',
  },
  {
    year: '2020',
    title: 'Mezzo Farm Program',
    description:
      'The Mezzo adolescent program launched on a working farm in Huger, SC, offering a groundbreaking Montessori experience for middle school students.',
  },
] as const;

export default function AboutUsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary/5 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            About Sundrops Montessori
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            For over two decades, we have been nurturing children and building community through authentic Montessori
            education in the greater Charleston area.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <SectionHeading eyebrow="Our Mission" title="Why We Do What We Do" centered />
          <blockquote className="mt-8 border-l-4 border-primary pl-6 text-left">
            <p className="text-xl italic leading-relaxed text-foreground md:text-2xl">
              At Sundrops, we strive to educate by nurturing each child&apos;s unique social, emotional, and cognitive
              development needs.
            </p>
          </blockquote>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            We believe that every child has an innate desire to learn and grow. Our role is to create an environment
            where that desire can flourish. Through the Montessori method, we honor each child as an individual,
            supporting their natural development while fostering independence, curiosity, and a deep respect for the
            world around them.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Our Philosophy"
            title="The Montessori Approach"
            description="Developed over a century ago by Dr. Maria Montessori, this scientifically grounded method respects the natural development of children and empowers them to reach their full potential."
            centered
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {PHILOSOPHY_PRINCIPLES.map((principle) => (
              <div key={principle.title} className="rounded-xl border bg-card p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground">{principle.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / History Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <SectionHeading
            eyebrow="Our History"
            title="The Sundrops Story"
            description="From a single classroom to three campuses and a farm program, our journey has been guided by a commitment to authentic Montessori education."
            centered
          />
          <div className="mt-12 space-y-0">
            {TIMELINE_MILESTONES.map((milestone, index) => (
              <div key={milestone.year} className="relative flex gap-6 pb-12 last:pb-0">
                {/* Timeline line */}
                {index < TIMELINE_MILESTONES.length - 1 && (
                  <div className="absolute left-[23px] top-12 h-full w-px bg-border" />
                )}
                {/* Timeline dot */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {milestone.year.slice(2)}
                </div>
                {/* Content */}
                <div className="pt-1">
                  <p className="text-sm font-medium text-primary">{milestone.year}</p>
                  <h3 className="text-lg font-semibold text-foreground">{milestone.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder / Team Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <SectionHeading eyebrow="Our Founder" title="Meet Shannon Smith" centered />
          <div className="mt-12 flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-2xl shadow-lg md:h-80 md:w-80">
              <Image
                src="/images/founder.jpg"
                alt="Shannon Smith, Founder of Sundrops Montessori"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, 320px"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground">Shannon Smith</h3>
              <p className="text-primary">Founder &amp; Head of School</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Shannon Smith founded Sundrops Montessori in 2003 with a deep conviction that every child deserves an
                education that honors their individuality. A trained Montessori educator with decades of experience,
                Shannon has built Sundrops from a single classroom into one of the most respected Montessori programs in
                the Lowcountry.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Under her leadership, Sundrops has expanded to three campuses and launched the innovative Mezzo farm
                program for adolescents. Shannon&apos;s vision continues to guide the school&apos;s commitment to
                authentic Montessori practice, community engagement, and joyful learning.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
