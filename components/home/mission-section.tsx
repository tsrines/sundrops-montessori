import Image from 'next/image';

export function MissionSection() {
  return (
    <section className="relative flex items-center justify-center py-24">
      <Image
        src="/images/mission-bg.jpg"
        alt="Montessori classroom environment"
        fill
        className="object-cover"
        quality={80}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-6 font-serif text-3xl font-bold text-white md:text-4xl">Our Mission</h2>
        <p className="text-lg leading-relaxed text-white/90 md:text-xl">
          At Sundrops, we strive to educate by nurturing each child&apos;s unique social, emotional, and cognitive
          development needs.
        </p>
      </div>
    </section>
  );
}
