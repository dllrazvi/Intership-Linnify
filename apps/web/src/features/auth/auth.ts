import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { FirestoreAdapter } from '@app/auth/adapters/firestore.adapter';
import authConfig from '@app/auth/auth.config';
import EmailProvider from '@app/auth/providers/email.provider';
import firestore from '@app/lib/firestore';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: FirestoreAdapter(firestore),
  session: { strategy: 'jwt' },
  ...authConfig,
  providers: [GoogleProvider, EmailProvider]
});
