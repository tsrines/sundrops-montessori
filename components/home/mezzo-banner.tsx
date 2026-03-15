'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'mezzo-banner-dismissed';

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

function getServerSnapshot() {
  return true;
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export function MezzoBanner() {
  const wasDismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isVisible, setIsVisible] = useState(!wasDismissed);
  const [isDismissed, setIsDismissed] = useState(wasDismissed);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsDismissed(true);
      localStorage.setItem(STORAGE_KEY, 'true');
    }, 300);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-primary text-white transition-all duration-300 ease-in-out',
        isVisible ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
      )}>
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-4 px-4 py-3 text-sm sm:text-base">
        <p className="text-center font-medium">
          Now Enrolling: Mezzo Farm School &mdash; 7th through 9th Grade!{' '}
          <Link
            href="/middle-school/"
            className="inline-flex items-center underline underline-offset-4 hover:opacity-80">
            Learn More
          </Link>
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition-opacity hover:opacity-70"
          aria-label="Dismiss banner">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
