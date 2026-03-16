'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { INFANT_REGISTRATION } from '@/lib/data/infant-content';

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

export function InfantRegistration() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-[#E3E3E8] py-16 md:py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-800">
              {INFANT_REGISTRATION.heading}
            </h2>
            <p className="mb-4 font-serif text-2xl font-bold text-gray-800 md:text-3xl">
              {INFANT_REGISTRATION.subheading}
            </p>
            <p className="leading-relaxed text-gray-500">{INFANT_REGISTRATION.description}</p>
          </div>

          <div className="space-y-10">
            {INFANT_REGISTRATION.steps.map((step) => (
              <div key={step.number}>
                <p className="mb-1 font-serif text-4xl font-bold text-gray-500">
                  {String(step.number).padStart(2, '0')}.
                </p>
                <h3 className="mb-2 text-xl font-bold text-gray-800">{step.title}</h3>
                {'description' in step && step.description && (
                  <p className="leading-relaxed text-gray-500">{step.description}</p>
                )}
                {'campusLinks' in step && step.campusLinks && <CampusDropdown links={step.campusLinks} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
