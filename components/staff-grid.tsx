import Image from 'next/image';
import type { StaffGroup } from '@/lib/data/staff';
import { SectionHeading } from '@/components/section-heading';

interface StaffGridProps {
  groups: StaffGroup[];
}

function StaffCard({ name, title, campus, image }: { name: string; title: string; campus?: string; image: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-full bg-muted shadow-md">
        <Image src={image} alt={name} fill className="object-cover" sizes="160px" />
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
                {group.members.map((member) => (
                  <StaffCard key={member.name} {...member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
