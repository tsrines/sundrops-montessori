'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from '@/lib/auth-client';
import { STAFF_ROLES } from '@/lib/roles';
import { LoginForm } from '@/components/auth/login-form';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Sundrops Montessori"
                width={180}
                height={48}
                className="mx-auto h-12 w-auto"
              />
            </Link>
            <h1 className="mt-6 font-serif text-2xl font-semibold tracking-tight">Admin Portal</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in with your admin account</p>
          </div>
          <LoginForm />
        </div>
      </div>
    );
  }

  if (!STAFF_ROLES.includes(session.user.role ?? '')) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-4 text-center">
          <h1 className="font-serif text-2xl font-semibold">Access Denied</h1>
          <p className="text-sm text-muted-foreground">You don&apos;t have permission to access the admin portal.</p>
          <Link
            href="/portal"
            className="inline-block text-sm font-medium text-primary underline-offset-4 hover:underline">
            Go to Parent Portal
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
