'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { programs } from '@/lib/data/programs';
import { campuses } from '@/lib/data/campuses';
import { mainNavigation } from '@/lib/data/navigation';
import { cn } from '@/lib/utils';

interface SearchResult {
  category: 'Programs' | 'Campuses' | 'Pages';
  label: string;
  href: string;
  description?: string;
}

function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const program of programs) {
    results.push({
      category: 'Programs',
      label: `${program.name} (${program.montessoriName})`,
      href: `/${program.slug}/`,
      description: program.ageRange,
    });
  }

  for (const campus of campuses) {
    results.push({
      category: 'Campuses',
      label: campus.name,
      href: `/${campus.slug}/`,
      description: campus.location,
    });
  }

  for (const item of mainNavigation) {
    if (item.href !== '#') {
      results.push({
        category: 'Pages',
        label: item.label,
        href: item.href,
      });
    }
    if (item.children) {
      for (const child of item.children) {
        const alreadyAdded = results.some((r) => r.href === child.href);
        if (!alreadyAdded) {
          results.push({
            category: 'Pages',
            label: child.label,
            href: child.href,
          });
        }
      }
    }
  }

  return results;
}

function fuzzyMatch(query: string, text: string): boolean {
  const lowerQuery = query.toLowerCase();
  const lowerText = text.toLowerCase();

  if (lowerText.includes(lowerQuery)) {
    return true;
  }

  let queryIdx = 0;
  for (let i = 0; i < lowerText.length && queryIdx < lowerQuery.length; i++) {
    if (lowerText[i] === lowerQuery[queryIdx]) {
      queryIdx++;
    }
  }

  return queryIdx === lowerQuery.length;
}

const SEARCH_INDEX = buildSearchIndex();

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle Cmd+K keyboard shortcut
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle custom toggle-search event from nav search button
  React.useEffect(() => {
    function handleToggle() {
      setOpen((prev) => !prev);
    }

    window.addEventListener('toggle-search', handleToggle);
    return () => window.removeEventListener('toggle-search', handleToggle);
  }, []);

  React.useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const filteredResults = React.useMemo(() => {
    if (!query.trim()) {
      return SEARCH_INDEX;
    }
    return SEARCH_INDEX.filter(
      (item) => fuzzyMatch(query, item.label) || (item.description && fuzzyMatch(query, item.description))
    );
  }, [query]);

  const groupedResults = React.useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    for (const result of filteredResults) {
      if (!groups[result.category]) {
        groups[result.category] = [];
      }
      groups[result.category].push(result);
    }
    return groups;
  }, [filteredResults]);

  // Flatten for keyboard navigation
  const flatResults = React.useMemo(() => {
    return Object.values(groupedResults).flat();
  }, [groupedResults]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const navigateTo = React.useCallback(
    (href: string) => {
      setOpen(false);
      setQuery('');
      router.push(href);
    },
    [router]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && flatResults[selectedIndex]) {
        e.preventDefault();
        navigateTo(flatResults[selectedIndex].href);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    },
    [flatResults, selectedIndex, navigateTo]
  );

  let globalIndex = 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-4 top-[15vh] z-50 mx-auto max-w-lg overflow-hidden rounded-lg border bg-popover shadow-2xl sm:inset-x-auto"
            role="dialog"
            aria-label="Search Sundrops Montessori">
            {/* Search Input */}
            <div className="flex items-center border-b px-4">
              <Search className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search programs, campuses, pages..."
                className="flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filteredResults.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">No results found.</p>
              ) : (
                Object.entries(groupedResults).map(([category, results]) => (
                  <div key={category}>
                    <p className="mb-1 px-2 pt-2 text-xs font-semibold text-muted-foreground">{category}</p>
                    {results.map((result) => {
                      const currentIndex = globalIndex++;
                      return (
                        <button
                          key={result.href}
                          type="button"
                          onClick={() => navigateTo(result.href)}
                          onMouseEnter={() => setSelectedIndex(currentIndex)}
                          className={cn(
                            'flex w-full items-center justify-between rounded-sm px-2 py-2 text-sm transition-colors',
                            'hover:bg-accent hover:text-accent-foreground',
                            currentIndex === selectedIndex && 'bg-accent text-accent-foreground'
                          )}>
                          <span>{result.label}</span>
                          {result.description && (
                            <span className="ml-2 text-xs text-muted-foreground">{result.description}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-end border-t px-4 py-2">
              <span className="text-xs text-muted-foreground">
                <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium">Esc</kbd> to close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
