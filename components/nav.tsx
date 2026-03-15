'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mainNavigation, type NavItem } from '@/lib/data/navigation';
import { Button } from '@/components/ui/button';
import { MobileNav } from '@/components/mobile-nav';

function DropdownMenu({ item, isActive, pathname }: { item: NavItem; isActive: boolean; pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const hasActiveChild = item.children?.some((child) => pathname === child.href);

  return (
    <div ref={dropdownRef} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors',
          'hover:text-primary',
          (isActive || hasActiveChild) && 'text-primary'
        )}>
        {item.label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-md border bg-popover p-1.5 shadow-lg',
            'animate-in fade-in-0 zoom-in-95'
          )}>
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                'block rounded-sm px-3 py-2 text-sm transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                pathname === child.href && 'bg-accent/50 font-medium text-primary'
              )}>
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchTrigger() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('toggle-search'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('toggle-search'))}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-md transition-colors',
        'hover:bg-accent hover:text-accent-foreground'
      )}
      aria-label="Search">
      <Search className="h-4 w-4" />
    </button>
  );
}

export function Nav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileNav = useCallback(() => setIsMobileOpen(false), []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm transition-shadow duration-200',
          isScrolled && 'shadow-sm'
        )}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Sundrops Montessori"
              width={180}
              height={48}
              className="h-10 w-auto sm:h-12"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href;

              if (item.children) {
                return <DropdownMenu key={item.label} item={item} isActive={isActive} pathname={pathname} />;
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium transition-colors',
                    'hover:text-primary',
                    isActive && 'text-primary'
                  )}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <SearchTrigger />
            <Button asChild size="sm">
              <Link href="/contact/">Request a Tour</Link>
            </Button>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <SearchTrigger />
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-md transition-colors',
                'hover:bg-accent hover:text-accent-foreground'
              )}
              aria-label="Open navigation menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={isMobileOpen} onClose={closeMobileNav} />
    </>
  );
}
