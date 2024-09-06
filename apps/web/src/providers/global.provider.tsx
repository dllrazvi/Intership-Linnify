'use client';

import React from 'react';

export type GlobalState = {};

const Context = React.createContext<GlobalState>({} as GlobalState);

/**
 * Global Context. We can store global data like theme configuration.
 * Every information that we want to store based on the current user, we should use the "UserContext"
 */
export const GlobalProvider = ({ children }: React.PropsWithChildren) => {
  const value: GlobalState = {};

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useGlobalContext = () => {
  return React.useContext(Context);
};
