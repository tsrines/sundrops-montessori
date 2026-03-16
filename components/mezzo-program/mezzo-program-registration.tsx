'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { MEZZO_PROGRAM_REGISTRATION } from '@/lib/data/mezzo-program-content';

function CampusDropdown({ links }: { links: ReadonlyArray<{ readonly label: string; readonly href: string }> }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative mt-4 inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded bg-[#4CAF50] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#43A047]">
        Select a Campus
      </button>
      {isOpen && (
        <div className="absolute left-0 z-10 mt-1 min-w-[180px] rounded bg-white py-1 shadow-lg">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function MezzoProgramRegistration() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="w-full bg-[#F2C94C] py-16 md:py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-800">
              {MEZZO_PROGRAM_REGISTRATION.subheading}
            </h3>
            <h2 className="mb-4 font-serif text-2xl font-bold text-gray-800 md:text-3xl">
              {MEZZO_PROGRAM_REGISTRATION.heading}
            </h2>
            <p className="leading-relaxed text-gray-700">{MEZZO_PROGRAM_REGISTRATION.description}</p>
          </div>

          <div className="space-y-10">
            {MEZZO_PROGRAM_REGISTRATION.steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}>
                <p className="mb-1 font-serif text-4xl font-bold text-gray-600">
                  {String(step.number).padStart(2, '0')}.
                </p>
                <h4 className="mb-2 text-xl font-bold text-gray-800">{step.title}</h4>
                {'description' in step && step.description && (
                  <p className="leading-relaxed text-gray-700">{step.description}</p>
                )}
                {'campusLinks' in step && step.campusLinks && <CampusDropdown links={step.campusLinks} />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
