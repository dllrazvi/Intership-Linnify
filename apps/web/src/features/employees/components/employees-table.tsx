'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { ColumnDef, SortingState, createColumnHelper } from '@tanstack/react-table';

import { Button } from '@repo/ui/button';
import { Icons } from '@repo/ui/icons';

import { DataTable } from '@app/components/data-table';
import { useEmployees } from '@app/employees/context/employees.context';
import { UserRoleLabels } from '@app/user/types/enums/user-role.enum';
import { User } from '@app/user/types/user.types';

const EmployeesTable: React.FC = () => {
  const { filteredUsers } = useEmployees();
  const columnHelper = createColumnHelper<User>();

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<User, any>[] = [
    columnHelper.accessor('name', {
      header: () => (
        <div className="flex items-center font-bold">
          <span>Linnifian</span>
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
          <div className="ml-2">
            <p className="font-bold">{data.getValue()}</p>
            <p className="text-sm text-neutral-600">{data.row.original.email}</p>
          </div>
        </div>
      ),
      enableSorting: true
    }),
    columnHelper.accessor('role', {
      header: 'Role',
      cell: (info) => UserRoleLabels[info.getValue()]
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
      )
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
      )
    })
  ];

  return (
    <div className="border border-gray-200 bg-white shadow-sm">
      <DataTable
        columns={columns}
        data={filteredUsers}
        sorting={sorting}
        onSortingChange={setSorting}
        rowId="id"
      />
    </div>
  );
};

export default EmployeesTable;
