import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-bold text-primary/20">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Page Not Found</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
          Go Home
        </Link>
        <Link
          href="/preschool-and-kindergarten/"
          className="inline-flex items-center justify-center text-sm font-medium text-primary underline-offset-4 hover:underline">
          View Programs
        </Link>
      </div>
    </div>
  );
}
