'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { ColumnDef, SortingState, createColumnHelper } from '@tanstack/react-table';

import { Button } from '@repo/ui/button';
import { Icons } from '@repo/ui/icons';

import { DataTable } from '@app/components/data-table';
import { useEmployees } from '@app/employees/context/employees.context';
import { UserRoleLabels } from '@app/user/types/enums/user-role.enum';
import { User } from '@app/user/types/user.types';

const EmployeesTable: React.FC = () => {
  const { filteredUsers } = useEmployees();
  const searchParams = useSearchParams();
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<User>();

  const columns: ColumnDef<User, any>[] = [
    columnHelper.accessor('name', {
      header: (props) => (
        <div
          className="flex cursor-pointer items-center justify-between font-bold"
          onClick={() => props.column.getToggleSortingHandler()}
        >
          <span>Linnifian</span>
          <div className="ml-2">
            {props.column.getIsSorted() === 'asc' ? (
              <Icons.arrowUp className="h-5 w-5" />
            ) : props.column.getIsSorted() === 'desc' ? (
              <Icons.arrowDown className="h-5 w-5" />
            ) : (
              <Icons.sort className="h-5 w-5" />
            )}
          </div>
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
      <DataTable
        columns={columns}
        data={filteredUsers}
        rowId="id"
        sorting={sorting}
        onSortingChange={setSorting}
      />
    </div>
  );
};

export default EmployeesTable;
