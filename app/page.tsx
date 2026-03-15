import { MezzoBanner } from '@/components/home/mezzo-banner';
import { HeroSection } from '@/components/home/hero-section';
import { ProgramCards } from '@/components/home/program-cards';
import { MissionSection } from '@/components/home/mission-section';
import { FounderQuote } from '@/components/home/founder-quote';
import { AlumniSpotlight } from '@/components/home/alumni-spotlight';
import { RegistrationSteps } from '@/components/home/registration-steps';
import { VideoTour } from '@/components/home/video-tour';
import { CareersBanner } from '@/components/home/careers-banner';

export default function HomePage() {
  return (
    <>
      <MezzoBanner />
      <HeroSection />
      <ProgramCards />
      <MissionSection />
      <FounderQuote />
      <AlumniSpotlight />
      <RegistrationSteps />
      <VideoTour />
      <CareersBanner />
    </>
  );
}
