import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { LoginForm } from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Sign In | Sundrops Montessori Parent Portal',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Sundrops Montessori"
              width={200}
              height={52}
              className="mx-auto h-12 w-auto"
            />
          </Link>
          <h1 className="mt-6 font-serif text-2xl font-semibold">Welcome Back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to the Parent Portal</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
