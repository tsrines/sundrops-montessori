import Image from 'next/image';
import type { StaffGroup } from '@/lib/data/staff';
import { SectionHeading } from '@/components/section-heading';
import { StaffBioAccordion } from '@/components/staff-bio-accordion';

interface StaffGridProps {
  groups: StaffGroup[];
}

const INITIALS_COLORS = [
  'bg-sundrops-warmth',
  'bg-sundrops-sage',
  'bg-sundrops-earth-light',
  'bg-sundrops-blue-light',
] as const;

function getInitials(name: string): string {
  return name
    .replace(/^(Ms\.|Mr\.|Mrs\.|Dr\.)\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function isPlaceholder(image: string): boolean {
  return image.includes('placeholder');
}

function StaffCard({
  name,
  title,
  campus,
  image,
  index,
}: {
  name: string;
  title: string;
  campus?: string;
  image: string;
  index: number;
}) {
  const showInitials = isPlaceholder(image);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-full bg-muted shadow-md">
        {showInitials ? (
          <div
            className={`flex h-full w-full items-center justify-center ${INITIALS_COLORS[index % INITIALS_COLORS.length]}`}>
            <span className="font-serif text-3xl font-bold text-white">{getInitials(name)}</span>
          </div>
        ) : (
          <Image src={image} alt={name} fill className="object-cover" sizes="160px" />
        )}
      </div>
      <h4 className="text-lg font-semibold text-foreground">{name}</h4>
      <p className="text-sm text-muted-foreground">{title}</p>
      {campus && <p className="text-xs text-primary">{campus}</p>}
    </div>
  );
}

export function StaffGrid({ groups }: StaffGridProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Our Team" title="Meet the People Behind Sundrops" centered />
        <div className="mt-12 space-y-16">
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-8 text-center font-serif text-2xl font-bold text-foreground">{group.label}</h3>
              <div className="flex flex-wrap justify-center gap-10">
                {group.members.map((member, i) =>
                  member.bio ? (
                    <StaffBioAccordion key={member.name} staffName={member.name} bio={member.bio} quote={member.quote}>
                      <StaffCard {...member} index={i} />
                    </StaffBioAccordion>
                  ) : (
                    <div key={member.name} className="w-48">
                      <StaffCard {...member} index={i} />
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
