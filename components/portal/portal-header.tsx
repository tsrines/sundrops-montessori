'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  User,
  Users,
  Pizza,
  Bus,
  Calendar,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';
import { useSession, signOut } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';

const MOBILE_LINKS = [
  { href: '/portal', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/profile', label: 'My Profile', icon: User },
  { href: '/portal/children', label: 'My Children', icon: Users },
  { href: '/portal/pizza-orders', label: 'Pizza Orders', icon: Pizza },
  { href: '/portal/field-trips', label: 'Field Trips', icon: Bus },
  { href: '/portal/calendar', label: 'Calendar', icon: Calendar },
  { href: '/portal/reenrollment', label: 'Re-enrollment', icon: RefreshCw },
  { href: '/portal/incidents', label: 'Incidents', icon: AlertTriangle },
] as const;

export function PortalHeader() {
  const { data: session } = useSession();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-md p-1.5 hover:bg-muted lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="Sundrops Montessori" width={140} height={36} className="h-8 w-auto" />
            </Link>
            <span className="hidden text-sm font-medium text-muted-foreground sm:inline">/ Parent Portal</span>
          </div>

          <div className="flex items-center gap-3">
            {session?.user && (
              <span className="hidden text-sm text-muted-foreground md:inline">{session.user.name}</span>
            )}
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 w-72 bg-background shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="font-medium">Parent Portal</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-1 hover:bg-muted"
                aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-1 p-3">
              {MOBILE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
