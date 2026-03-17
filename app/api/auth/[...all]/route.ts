import { type NextRequest } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL!;

async function handler(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const search = req.nextUrl.search;
  const target = `${BACKEND_URL}${path}${search}`;

  const headers = new Headers(req.headers);
  headers.set('x-forwarded-host', req.nextUrl.host);

  const body =
    req.method !== 'GET' && req.method !== 'HEAD' ? await req.arrayBuffer() : undefined;

  return fetch(target, { method: req.method, headers, body, redirect: 'manual' });
}

export const GET = handler;
export const POST = handler;
