import { NextResponse } from 'next/server';

import NextAuth from 'next-auth';

import authConfig from '@app/auth/auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth');

  if (!req.auth && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  if (req.auth && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (API routes)
     * - api/tasks (Background Tasks, like CronJobs or Cloud Tasks)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icon.svg
     * - icon.png
     * - apple-icon.png (used for apple)
     * - images/ (images like background, etc)
     * - icons/ (icon files)
     * - logo/ (logo files)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|icon.svg|icon.png|apple-icon.png|images/|icons/|logo/|fallback).*)'
  ]
};
