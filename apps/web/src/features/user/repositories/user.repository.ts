import { db } from '@repo/db';

import { User } from '@app/user/types/user.types';

export const updateUser = async (userId: string, data: Partial<User>): Promise<User> => {
  return db.user.update({
    where: {
      id: userId
    },
    data
  });
};

export const getUser = async (userId: string): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      id: userId
    }
  });
};
