import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isApiRoute = nextUrl.pathname.startsWith('/api');
  const isAuthRoute = nextUrl.pathname.startsWith('/auth');
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');

  // Allow API routes to handle their own auth
  if (isApiRoute) {
    return null;
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/', nextUrl));
    }
    return null;
  }

  // Protect admin routes
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL('/auth/login', nextUrl));
    }

    const isAdmin = req.auth?.user?.role === 'ADMIN';
    if (!isAdmin) {
      return Response.redirect(new URL('/', nextUrl));
    }
  }

  // Protect other routes that require authentication
  if (!isLoggedIn && nextUrl.pathname !== '/') {
    return Response.redirect(new URL('/auth/login', nextUrl));
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
