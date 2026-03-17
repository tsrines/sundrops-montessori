'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Users,
  Pizza,
  Bus,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SIDEBAR_LINKS = [
  { href: '/portal', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/profile', label: 'My Profile', icon: User },
  { href: '/portal/children', label: 'My Children', icon: Users },
  { href: '/portal/pizza-orders', label: 'Pizza Orders', icon: Pizza },
  { href: '/portal/field-trips', label: 'Field Trips', icon: Bus },
  { href: '/portal/calendar', label: 'Calendar', icon: Calendar },
] as const;

export function PortalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r bg-muted/30 lg:block">
      <div className="flex h-full flex-col px-3 py-6">
        <nav className="space-y-1">
          {SIDEBAR_LINKS.map((link) => {
            const isActive =
              link.href === '/portal'
                ? pathname === '/portal'
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}>
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
