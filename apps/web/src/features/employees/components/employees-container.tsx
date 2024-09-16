'use client';

import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { User } from '@app/features/user/types/user.types';

import SearchBar from './employees-searchbar';
import EmployeesTable from './employees-table';

type SearchBarContainerProps = {
  users: User[];
};

const SearchBarContainer: React.FC<SearchBarContainerProps> = ({ users = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const termFromUrl = searchParams.get('search') || '';
    setSearchTerm(termFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Users
          <span className="text-primary-500 bg-primary-light ml-2 rounded-full px-3 py-1 text-sm font-bold">
            {filteredUsers.length}
          </span>
        </h1>

        <SearchBar onSearch={handleSearch} />
      </div>

      <EmployeesTable users={filteredUsers} />
    </div>
  );
};

export default SearchBarContainer;
