'use client';

import React, { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@repo/ui/input';

const EmployeesSearchBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.push(`/users?${params.toString()}`);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="🔍 Search..."
        className="shadow-xs w-72 rounded-md border border-neutral-200 p-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={() => handleSearch(searchTerm)}
      />
    </div>
  );
};

export default EmployeesSearchBar;
