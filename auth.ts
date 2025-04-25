import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: await (async () => {
    if (typeof window === 'undefined') {
      const { PrismaAdapter } = await import('@auth/prisma-adapter');
      const { prisma } = await import('@/lib/prisma');
      return PrismaAdapter(prisma);
    }
    return undefined;
  })(),
  session: { strategy: 'jwt' },
  ...authConfig,
});
