import 'server-only';

import { cache } from 'react';

import { redirect } from 'next/navigation';

import { auth } from '@app/auth/auth';
import { getUser } from '@app/user/repositories/user.repository';
import { User } from '@app/user/types/user.types';

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

const getDatabaseUser = cache((userId: string) => getUser(userId));
