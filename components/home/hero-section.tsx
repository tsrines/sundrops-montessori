'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[600px] items-center justify-center lg:min-h-[700px]">
      <Image
        src="/images/hero-bg.jpg"
        alt="Children learning in a Montessori classroom"
        fill
        className="object-cover"
        priority
        quality={85}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center gap-6">
          <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Authentic Montessori Education in Charleston, SC
          </h1>

          <h2 className="font-serif text-2xl font-semibold text-white/90 md:text-3xl">6 weeks - 9th Grade</h2>

          <div className="max-w-2xl space-y-4">
            <p className="text-lg leading-relaxed text-white/90 md:text-xl">
              Sundrops Montessori is a private Montessori school with four campuses in the Charleston, SC area.
            </p>
            <p className="text-lg leading-relaxed text-white/90 md:text-xl">
              We are dedicated to a continuous education path from 6 weeks through 9th grade, offering an authentic
              Montessori experience at every stage of development.
            </p>
          </div>

          <div className="mt-4">
            <Link
              href="/contact/"
              className={cn(
                'inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-semibold',
                'bg-primary text-white shadow-lg transition-colors hover:bg-primary/90'
              )}>
              Contact A Campus
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
