import type { Metadata } from 'next';
import { campuses } from '@/lib/data/campuses';
import { CampusHero } from '@/components/campus/campus-hero';
import { CampusInfo } from '@/components/campus/campus-info';
import { CampusPrograms } from '@/components/campus/campus-programs';
import { CampusMap } from '@/components/campus/campus-map';
import { TourRequestForm } from '@/components/campus/tour-request-form';

const campus = campuses.find((c) => c.slug === 'daniel-island-campus')!;

export const metadata: Metadata = {
  title: `${campus.name} | Sundrops Montessori`,
  description: campus.description,
};

export default function DanielIslandCampusPage() {
  return (
    <>
      <CampusHero campus={campus} />
      <CampusInfo campus={campus} />
      <CampusPrograms programs={campus.programs} />
      <CampusMap mapEmbedUrl={campus.mapEmbedUrl} campusName={campus.name} />
      <section className="py-16 px-4">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold">Schedule a Tour</h2>
          <TourRequestForm defaultCampus={campus.name} />
        </div>
      </section>
    </>
  );
}
