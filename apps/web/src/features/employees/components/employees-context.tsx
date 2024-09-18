'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { User } from '@app/features/user/types/user.types';

type EmployeesContextType = {
  filteredUsers: User[];
  filteredCount: number;
  setSearchTerm: (term: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
};

const EmployeesContext = createContext<EmployeesContextType | undefined>(undefined);

export const EmployeesProvider: React.FC<{
  users: User[];
  search: string;
  sort: string;
}> = ({ users, search, sort, children }) => {
  const [searchTerm, setSearchTerm] = useState(search);
  const [sortOrder, setSortOrder] = useState(sort);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  useEffect(() => {
    let updatedUsers = [...users];

    // Filtering logic
    if (searchTerm) {
      updatedUsers = updatedUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting logic
    if (sortOrder === '-name') {
      updatedUsers = updatedUsers.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      updatedUsers = updatedUsers.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredUsers(updatedUsers);
  }, [searchTerm, sortOrder, users]);

  return (
    <EmployeesContext.Provider
      value={{
        filteredUsers,
        filteredCount: filteredUsers.length,
        setSearchTerm,
        sortOrder,
        setSortOrder
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
