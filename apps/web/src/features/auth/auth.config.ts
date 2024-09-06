import { AdapterUser, NextAuthConfig, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Google from 'next-auth/providers/google';

const authConfig: NextAuthConfig = {
  providers: [Google],
  pages: {
    signIn: '/auth',
    error: '/auth/error',
    signOut: '/auth',
    newUser: '/onboarding'
  },
  trustHost: true,
  session: {
    strategy: 'jwt',
    /**
     * Relative time from now in seconds when to expire the session
     * @default 30 days
     */
    maxAge: 2592000,
    /**
     * How often the session should be updated in seconds.
     * If set to `0`, session is updated every time.
     */
    updateAge: 600 // 10 minutes
  },
  debug: process.env.NODE_ENV !== 'production',
  callbacks: {
    jwt: ({
      token,
      user,
      trigger
    }: {
      token: JWT;
      user: User | AdapterUser;
      trigger?: 'signIn' | 'signUp' | 'update';
    }) => {
      if (user && user.id) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }: { session: Session; token: JWT }) => {
      if (token && session.user) {
        session.user.id = token.id as string;
      }

      return session;
    }
  }
};

export default authConfig satisfies NextAuthConfig;
