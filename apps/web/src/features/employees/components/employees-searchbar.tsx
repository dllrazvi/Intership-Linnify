'use client';

import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

const EmployeesSearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams?.get('search') || ''; // Get the search term from the URL if available
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
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
    onSearch(debouncedSearchTerm);

    // Update the URL with the current search term
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearchTerm) {
      params.set('search', debouncedSearchTerm);
    } else {
      params.delete('search');
    }
    router.replace(`?${params.toString()}`);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="🔍 Search..."
        className="shadow-xs w-72 rounded-md border border-neutral-200 p-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default EmployeesSearchBar;
