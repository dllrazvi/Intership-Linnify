import firestore from '@app/lib/firestore.ts';
import { userConverter } from '@app/user/converters/user.converter.ts';
import { User } from '@app/user/types/user.types.ts';

export const getAllUsers = async (): Promise<User[] | []> => {
  const usersQuery = await firestore.collection('users').withConverter(userConverter).get();

  return usersQuery.docs.map((userDoc) => userDoc.data());
};
