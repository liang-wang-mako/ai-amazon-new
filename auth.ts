import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter:
    process.env.NEXT_RUNTIME === 'edge' ? undefined : (await import('./auth.adapter')).adapter,
  session: { strategy: 'jwt' },
  ...authConfig,
});
