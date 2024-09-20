'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { User } from '@app/features/user/types/user.types';

interface EmployeesContextProps {
  filteredUsers: User[];
  filteredCount: number;
}

interface EmployeesProviderProps {
  users: User[];
  search: string;
  sort: string;
  children: React.ReactNode;
}

const EmployeesContext = createContext<EmployeesContextProps | undefined>(undefined);

export const EmployeesProvider: React.FC<EmployeesProviderProps>= ({ users, search, sort, children }) => {
  
  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => !search || user.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (sort === 'name' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
  }, [users, search, sort]);

  const filteredCount = filteredUsers.length;
  return (
    <EmployeesContext.Provider value={{ filteredUsers, filteredCount }}>
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
