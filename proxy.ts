import { NextRequest, NextResponse } from 'next/server';

const STAFF_ROLES = new Set(['superadmin', 'admin', 'staff', 'teacher']);

interface SessionResponse {
  user?: {
    id?: string;
    role?: string;
  };
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isPortalRoute = pathname.startsWith('/portal');

  if (!isAdminRoute && !isPortalRoute) {
    return NextResponse.next();
  }

  const authBaseUrl = process.env.NEXT_PUBLIC_AUTH_URL ?? 'https://api.sundrops.dev:1355';
  let session: SessionResponse | null = null;

  try {
    const response = await fetch(`${authBaseUrl}/api/auth/get-session`, {
      headers: {
        cookie: request.headers.get('cookie') ?? '',
      },
    });
    if (response.ok) {
      session = (await response.json()) as SessionResponse;
    }
  } catch {
    // Fail closed: treat as unauthenticated if backend unreachable
  }

  if (!session?.user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && !STAFF_ROLES.has(session.user.role ?? '')) {
    return NextResponse.redirect(new URL('/portal', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/portal/:path*'],
};
