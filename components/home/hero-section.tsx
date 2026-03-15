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
          <p className="font-script text-2xl text-white/90 md:text-3xl">Welcome to</p>

          <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Authentic Montessori Education in Charleston, SC
          </h1>

          <p className="max-w-2xl text-lg text-white/90 md:text-xl">
            Nurturing curious minds from 6 weeks through 9th grade
          </p>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/programs/"
              className={cn(
                'inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-semibold',
                'bg-primary text-white shadow-lg transition-colors hover:bg-primary/90'
              )}>
              Explore Programs
            </Link>
            <Link
              href="/contact/"
              className={cn(
                'inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-semibold',
                'border-2 border-white text-white transition-colors hover:bg-white/10'
              )}>
              Schedule a Tour
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
