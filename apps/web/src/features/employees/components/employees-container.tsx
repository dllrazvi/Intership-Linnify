'use client';

import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { User } from '@app/features/user/types/user.types';

import EmployeesSearchBar from './employees-searchbar';
import EmployeesTable from './employees-table';

type EmployeesContainerProps = {
  users: User[];
};

const EmployeesContainer: React.FC<EmployeesContainerProps> = ({ users = [] }) => {
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams?.get('search') || ''; // Get search term from the URL
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [filteredUsers, setFilteredUsers] = useState(users);

  // Filter users based on the search term
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Users
          <span className="text-primary-500 bg-primary-light ml-2 rounded-full px-3 py-1 text-sm font-bold">
            {filteredUsers.length}
          </span>
        </h1>

        <EmployeesSearchBar onSearch={setSearchTerm} />
      </div>

      <EmployeesTable users={filteredUsers} />
    </div>
  );
};

export default EmployeesContainer;
