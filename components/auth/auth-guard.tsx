'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from '@/lib/auth-client';
import { LoginForm } from '@/components/auth/login-form';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
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
            <h1 className="mt-6 font-serif text-2xl font-semibold tracking-tight">Welcome Back</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to the Parent Portal</p>
          </div>
          <LoginForm />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
