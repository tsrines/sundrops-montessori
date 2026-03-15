import type { Metadata } from 'next';
import { SectionHeading } from '@/components/section-heading';
import { VideoEmbed } from '@/components/video-embed';
import { CtaBanner } from '@/components/cta-banner';

export const metadata: Metadata = {
  title: 'Campus Tours | Sundrops Montessori',
  description:
    'Take a virtual tour of our Sundrops Montessori campuses. Watch video tours of the Bridge Campus and Mezzo Farm School.',
};

const TOURS = [
  {
    title: 'Bridge Campus Tour',
    description:
      'Explore our flagship campus in Mt Pleasant. See the purpose-built Montessori classrooms, outdoor learning gardens, and welcoming community spaces that serve children from 6 weeks through 10th grade.',
    videoId: '422187498',
    provider: 'vimeo' as const,
  },
  {
    title: 'Mezzo Farm School Tour',
    description:
      'Discover our innovative farm-based adolescent program in Huger, SC. Watch how students engage in sustainable agriculture, entrepreneurship, and community building on a working farm.',
    videoId: '486498197',
    provider: 'vimeo' as const,
  },
];

export default function ToursPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary/5 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Campus Tours
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Get a glimpse inside our campuses. Watch video tours or schedule an in-person visit to see the Sundrops
            difference for yourself.
          </p>
        </div>
      </section>

      {/* Video Tours */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <SectionHeading eyebrow="Virtual Tours" title="Explore Our Campuses From Home" centered />
          <div className="mt-12 space-y-16">
            {TOURS.map((tour) => (
              <div key={tour.title}>
                <h3 className="mb-3 font-serif text-2xl font-bold text-foreground">{tour.title}</h3>
                <p className="mb-6 max-w-3xl text-muted-foreground">{tour.description}</p>
                <VideoEmbed videoId={tour.videoId} provider={tour.provider} title={tour.title} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In-Person CTA */}
      <CtaBanner
        title="Ready to Visit In Person?"
        description="Schedule a private tour to experience our classrooms, meet our guides, and see Montessori in action."
        buttonText="Schedule a Tour"
        buttonHref="/contact/"
        variant="warm"
      />
    </>
  );
}
