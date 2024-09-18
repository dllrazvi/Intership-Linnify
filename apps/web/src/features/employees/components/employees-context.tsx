'use client';

import React, { createContext, useContext, useMemo } from 'react';

import { User } from '@app/features/user/types/user.types';

type EmployeesContextType = {
  filteredUsers: User[];
  filteredCount: number;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  children: React.ReactNode;
};

const EmployeesContext = createContext<EmployeesContextType | undefined>(undefined);

export const EmployeesProvider: React.FC<{
  users: User[];
  search: string;
  sort: string;
}> = ({ users, search, sort, children }) => {
  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => !search || user.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sort === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sort === '-name') {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });
  }, [users, search, sort]);

  const filteredCount = filteredUsers.length;

  return (
    <EmployeesContext.Provider
      value={{
        filteredUsers,
        filteredCount,
        sortOrder: sort,
        setSortOrder: () => {}
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeesProvider');
  }
  return context;
};
