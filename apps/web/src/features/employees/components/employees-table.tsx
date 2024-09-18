'use client';

import React from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { createColumnHelper } from '@tanstack/react-table';

import { Button } from '@repo/ui/button';
import { Icons } from '@repo/ui/icons';

import { DataTable } from '@app/components/data-table';
import { UserRoleLabels } from '@app/features/user/types/enums/user-role.enum';

import { useEmployees } from './employees-context';

const columnHelper = createColumnHelper<User>();

const EmployeesTable = () => {
  const { filteredUsers, sortOrder, setSortOrder } = useEmployees();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSortingChange = () => {
    const newSortOrder = sortOrder === 'name' ? '-name' : 'name';
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSortOrder);
    router.push(`/users?${params.toString()}`);
    setSortOrder(newSortOrder);
  };

  const columns = [
    columnHelper.accessor('name', {
      header: () => (
        <div className="flex cursor-pointer items-center" onClick={handleSortingChange}>
          Linnifian
          {sortOrder === 'name' ? (
            <Icons.arrowUp className="ml-2 h-4 w-4" />
          ) : (
            <Icons.arrowDown className="ml-2 h-4 w-4" />
          )}
        </div>
      ),
      cell: (data) => (
        <div className="flex items-center">
          <Image
            src={data.row.original.image}
            alt={data.getValue()}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p>{data.getValue()}</p>
            <p className="text-sm text-neutral-600">{data.row.original.email}</p>
          </div>
        </div>
      ),
      enableSorting: true
    }),

    columnHelper.accessor('role', {
      header: 'Role',
      cell: (info) => UserRoleLabels[info.getValue()],
      enableSorting: false
    }),

    columnHelper.accessor('technicalProfile', {
      header: 'Technical Profiles',
      cell: (data) => (
        <div className="flex items-center">
          <p className="text-sm text-neutral-600">{data.getValue()}</p>
          <Button variant="ghost">
            <Icons.chevronRight className="h-4 w-4" />
          </Button>
        </div>
      ),
      enableSorting: false
    }),

    columnHelper.display({
      id: 'actions',
      cell: () => (
        <div className="flex items-center justify-end gap-4">
          <Button variant="ghost">
            <Icons.edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="text-red-500">
            <Icons.trash className="h-4 w-4" />
          </Button>
        </div>
      ),
      enableSorting: false
    })
  ];

  return (
    <div className="border border-gray-200 bg-white shadow-sm">
      <DataTable columns={columns} data={filteredUsers} rowId="id" />
    </div>
  );
};

export default EmployeesTable;
