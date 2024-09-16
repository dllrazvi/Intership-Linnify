'use client';

import React from 'react';

import Image from 'next/image';

import { createColumnHelper } from '@tanstack/react-table';

import { Button } from '@repo/ui/button';
import { Icons } from '@repo/ui/icons';

import { DataTable } from '@app/components/data-table';
import { UserRoleLabels } from '@app/features/user/types/enums/user-role.enum';
import { User } from '@app/features/user/types/user.types';

type EmployeesTableProps = {
  users: User[];
};

const EmployeesTable: React.FC<EmployeesTableProps> = ({ users }) => {
  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Linnifian',
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
      )
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
      <DataTable columns={columns} data={users} rowId="id" />
    </div>
  );
};

export default EmployeesTable;
