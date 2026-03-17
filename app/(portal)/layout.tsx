'use client';

import { AuthGuard } from '@/components/auth/auth-guard';
import { PortalHeader } from '@/components/portal/portal-header';
import { PortalSidebar } from '@/components/portal/portal-sidebar';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col">
        <PortalHeader />
        <div className="flex flex-1">
          <PortalSidebar />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
