'use client';

import React from 'react';

import { User } from '@app/user/types/user.types';

export type UserState = {
  user: User | null;
  updateUser: (user: User) => void;
};

const UserContext = React.createContext<UserState>({} as UserState);

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  const updateUser = (user: User) => {
    setCurrentUser({
      ...(currentUser ?? {}),
      ...user
    });
  };

  const value: UserState = {
    user: currentUser,
    updateUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return React.useContext(UserContext);
};

export const useUser = () => {
  const context = useUserContext();
  return context.user;
};
