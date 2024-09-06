import 'server-only';

import { cache } from 'react';

import { redirect } from 'next/navigation';

import { auth } from '@app/auth/auth.ts';
import firestore from '@app/lib/firestore.ts';
import { User } from '@app/user/types/user.types.ts';

export const getCurrentUser = async (): Promise<User> => {
  const session = await auth();

  if (!session) {
    return redirect(`/api/auth/signout`);
  }

  const user = await getDatabaseUser(session.user.id);

  if (!user) {
    return redirect(`/api/auth/signout`);
  }

  return user;
};

const getDatabaseUser = cache(async (userId: string) => {
  const doc = await firestore.collection('users').doc(userId).get();

  if (!doc.data()) {
    return null;
  }

  return {
    id: doc.id,
    ...doc.data()
  } as User;
});
