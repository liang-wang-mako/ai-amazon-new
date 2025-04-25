import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add paths that don't require authentication
const publicPaths = ['/', '/auth/login', '/auth/register'];

// Add paths that require admin role
const adminPaths = ['/admin', '/admin/products', '/admin/orders', '/admin/users'];

export default auth((req) => {
  const { nextUrl } = req;
  const isAuth = !!req.auth;
  const isAuthPage = nextUrl.pathname.startsWith('/auth');
  const isAdminPage = adminPaths.some((path) => nextUrl.pathname.startsWith(path));
  const isPublicPath = publicPaths.some((path) => nextUrl.pathname === path);

  // Handle auth pages (login, register, etc.)
  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/', nextUrl));
    }
    return null;
  }

  // Handle public paths
  if (isPublicPath) {
    return null;
  }

  // Handle admin paths
  if (isAdminPage) {
    if (!isAuth) {
      return NextResponse.redirect(new URL('/auth/login', nextUrl));
    }

    const userRole = req.auth?.user?.role;
    if (userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', nextUrl));
    }

    return null;
  }

  // Handle protected paths
  if (!isAuth) {
    const redirectUrl = new URL('/auth/login', nextUrl);
    redirectUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return null;
});
// Configure middleware matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - static files (/_next/, /images/, etc.)
     * - favicon.ico
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
};
