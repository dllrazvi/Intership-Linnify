'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@app/auth/auth';
import { updateUser } from '@app/user/repositories/user.repository';

export const completeUserOnboarding = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return;
  }

  await updateUser(session.user.id, {
    onboardedAt: new Date()
  });

  revalidatePath('/onboarding');
  revalidatePath('/');

  redirect('/');
};
