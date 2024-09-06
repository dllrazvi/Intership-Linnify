import NextAuth from 'next-auth';

import { db } from '@repo/db';

import { PrismaAdapter } from '@app/auth/adapters/prisma.adapter';
import authConfig from '@app/auth/auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
});
