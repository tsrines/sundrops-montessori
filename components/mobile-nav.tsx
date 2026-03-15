'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mainNavigation, type NavItem } from '@/lib/data/navigation';
import { Button } from '@/components/ui/button';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

function CollapsibleSection({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3 text-base font-medium transition-colors hover:text-primary">
        {item.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', isExpanded && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden">
            <div className="space-y-1 pb-2 pl-4">
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onNavigate}
                  className="block rounded-md px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-out panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-background shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-4">
              <span className="font-serif text-lg font-semibold">Menu</span>
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-md transition-colors',
                  'hover:bg-accent hover:text-accent-foreground'
                )}
                aria-label="Close navigation menu">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto py-4" aria-label="Mobile navigation">
              <div className="space-y-1">
                {mainNavigation.map((item) => {
                  if (item.children) {
                    return <CollapsibleSection key={item.label} item={item} onNavigate={onClose} />;
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="block px-4 py-3 text-base font-medium transition-colors hover:text-primary">
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Footer CTA */}
            <div className="border-t p-4">
              <Button asChild className="w-full" size="lg">
                <Link href="/contact/" onClick={onClose}>
                  Request a Tour
                </Link>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
