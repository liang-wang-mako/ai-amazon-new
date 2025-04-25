import { auth } from '@/auth';
import { NextResponse } from 'next/server';

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

  if (isAuthPage && isAuth) {
    return Response.redirect(new URL('/', nextUrl));
  }

  if (isPublicPath || isAuthPage) {
    return NextResponse.next();
  }

  if (isAdminPage) {
    if (!isAuth) {
      return Response.redirect(new URL('/auth/login', nextUrl));
    }

    const userRole = req.auth?.user?.role;
    if (userRole !== 'ADMIN') {
      return Response.redirect(new URL('/', nextUrl));
    }

    return NextResponse.next();
  }

  if (!isAuth) {
    const redirectUrl = new URL('/auth/login', nextUrl);
    redirectUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return Response.redirect(redirectUrl);
  }

  return NextResponse.next();
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
