'use client';

import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@repo/ui/input';

import { useEmployees } from './employees-context';

const EmployeesSearchBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSearchTerm } = useEmployees();
  const initialSearchTerm = searchParams.get('search') || '';
  const [searchTerm, setSearchTermState] = useState(initialSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearchTerm) {
      params.set('search', debouncedSearchTerm);
    } else {
      params.delete('search');
    }

    router.push(`?${params.toString()}`);
  }, [debouncedSearchTerm]);

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="🔍 Search..."
        className="shadow-xs w-72 rounded-md border border-neutral-200 p-2"
        value={searchTerm}
        onChange={(e) => setSearchTermState(e.target.value)}
      />
    </div>
  );
};

export default EmployeesSearchBar;
