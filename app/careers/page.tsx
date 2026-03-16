import type { Metadata } from 'next';
import { GraduationCap, Heart, Award, Building2, MapPin, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/section-heading';
import { JobApplicationForm } from '@/components/forms/job-application-form';

export const metadata: Metadata = {
  title: 'Careers | Sundrops Montessori',
  description:
    'Join the Sundrops Montessori team. Explore open teaching and staff positions across our Charleston-area campuses.',
};

const BENEFITS = [
  {
    icon: GraduationCap,
    title: 'Professional Development',
    description:
      'Ongoing Montessori training, conference attendance, and tuition assistance for advanced certifications.',
  },
  {
    icon: Heart,
    title: 'Supportive Community',
    description: 'A collaborative, mission-driven team that values every member. Mentorship programs for new guides.',
  },
  {
    icon: Award,
    title: 'Competitive Benefits',
    description: 'Health insurance, paid time off, retirement plan, and tuition discount for employees with children.',
  },
  {
    icon: Building2,
    title: 'Beautiful Campuses',
    description:
      'Purpose-built Montessori environments with outdoor learning spaces, gardens, and a working farm program.',
  },
] as const;

const OPEN_POSITIONS = [
  {
    id: 'lead-guide-casa',
    title: 'Lead Montessori Guide (Casa)',
    campus: 'Bridge Campus',
    type: 'Full-time',
    description:
      'Lead a mixed-age classroom of 3-6 year olds, implementing authentic Montessori curriculum. Montessori certification required.',
  },
  {
    id: 'assistant-toddler',
    title: 'Assistant Teacher (Toddler)',
    campus: 'Daniel Island Campus',
    type: 'Full-time',
    description:
      'Support the lead guide in our toddler community, caring for children ages 14-36 months. Experience in early childhood education preferred.',
  },
  {
    id: 'elementary-guide',
    title: 'Elementary Guide',
    campus: 'Bridge Campus',
    type: 'Full-time',
    description:
      'Guide elementary-age students through the Montessori curriculum. AMS or AMI elementary certification required.',
  },
  {
    id: 'farm-coordinator',
    title: 'Farm Program Coordinator',
    campus: 'Mezzo',
    type: 'Full-time',
    description:
      'Coordinate the agricultural and outdoor education components of our adolescent program on the Mezzo farm in Huger, SC.',
  },
] as const;

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary/5 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Join Our Team
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Build a meaningful career in Montessori education. We are always looking for passionate, dedicated
            individuals who share our commitment to nurturing the whole child.
          </p>
        </div>
      </section>

      {/* Why Sundrops */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Why Sundrops?"
            title="What Makes Us Different"
            description="When you join Sundrops, you become part of a community that values growth, collaboration, and joyful education."
            centered
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <SectionHeading
            eyebrow="Open Positions"
            title="Current Opportunities"
            description="Explore our open roles across all campuses. We look forward to hearing from you."
            centered
          />
          <div className="mt-12 space-y-4">
            {OPEN_POSITIONS.map((position) => (
              <Card key={position.id}>
                <CardHeader>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-lg">{position.title}</CardTitle>
                    <Badge variant="secondary">{position.type}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-4 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {position.campus}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" />
                      {position.type}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{position.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-2xl px-4">
          <SectionHeading
            eyebrow="Ready to Apply?"
            title="Submit Your Application"
            description="Tell us about yourself and why you are passionate about Montessori education."
            centered
          />
          <div className="mt-10">
            <JobApplicationForm positions={OPEN_POSITIONS} />
          </div>
        </div>
      </section>
    </>
  );
}
