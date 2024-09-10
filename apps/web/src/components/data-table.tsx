'use client';

import * as React from 'react';
import { PropsWithChildren, ReactElement, ReactNode } from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  HeaderContext,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Row } from '@tanstack/table-core';

import { Button } from '@repo/ui/button';
import { Icons } from '@repo/ui/icons';
import { cn } from '@repo/ui/lib';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/table';

import { ColumnType } from '@app/types/enums/data-table.enum';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData, TValue> {
    filterComponent: (headerContext: HeaderContext<TData, string>) => ReactNode;
  }
}

export type DataTableProps<TData, TValue> = PropsWithChildren<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowSelection?: RowSelectionState;
  columnFilters?: ColumnFiltersState;
  expanded?: ExpandedState;
  count?: number;
  onRowClick?: (data: Row<TData>) => void;
  rowId?: keyof TData;
  sorting?: SortingState;
  columnVisibility?: VisibilityState;
  onRowSelectionChange?: (rowSelection: RowSelectionState) => void;
  onColumnFiltersChange?: (filter: ColumnFiltersState) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onColumnVisibilityChange?: (visibility: VisibilityState) => void;
  onExpandedChange?: (expanded: ExpandedState) => void;
  getExtendedContent?: (data: TData) => ReactElement;
  className?: string;
}>;

function DataTableInner<TData, TValue>(
  {
    columns,
    data,
    expanded,
    sorting,
    columnFilters = [],
    columnVisibility,
    rowSelection = {},
    onRowClick,
    rowId,
    onRowSelectionChange,
    onColumnFiltersChange,
    onSortingChange,
    onColumnVisibilityChange,
    onExpandedChange,
    getExtendedContent,
    className,
    children
  }: DataTableProps<TData, TValue>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      expanded
    },
    manualSorting: !!onSortingChange,
    manualFiltering: !!onColumnFiltersChange,
    enableRowSelection: !!onRowSelectionChange,
    enableExpanding: !!onExpandedChange && !!getExtendedContent,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableSorting: !!onSortingChange,
    enableColumnFilters: !!onColumnFiltersChange,
    autoResetPageIndex: false,
    autoResetExpanded: false,
    autoResetAll: false,
    onRowSelectionChange: (updater) => {
      if (typeof updater === 'function') {
        onRowSelectionChange && onRowSelectionChange(updater(rowSelection));
      }
    },
    onColumnVisibilityChange: (updater) => {
      if (typeof updater === 'function') {
        onColumnVisibilityChange &&
          columnVisibility &&
          onColumnVisibilityChange(updater(columnVisibility));
      }
    },
    onColumnFiltersChange: (updater) => {
      if (typeof updater === 'function') {
        onColumnFiltersChange && onColumnFiltersChange(updater(columnFilters));
      }
    },
    onSortingChange: (updater) => {
      if (typeof updater === 'function') {
        onSortingChange && sorting && onSortingChange(updater(sorting));
      }
    },
    getRowId: (row) => row[rowId || ('id' as keyof TData)] as unknown as string,
    onExpandedChange: (updater) => {
      if (typeof updater === 'function') {
        onExpandedChange && expanded && onExpandedChange(updater(expanded));
      }
    },
    getExpandedRowModel: getExpandedRowModel()
  });

  return (
    <div className={cn('flex flex-1 flex-col', className)} ref={ref}>
      <Table>
        <TableHeader className="bg-neutral-light text-primary-foreground">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="cursor-default border-0">
              {headerGroup.headers.map((header, index) => {
                return (
                  <TableHead
                    className={cn(
                      header.id === ColumnType.ACTIONS && 'w-0',
                      header.column.getIsFiltered() && 'bg-secondary'
                    )}
                    key={header.id}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          'flex items-center font-bold',
                          header.id === ColumnType.ACTIONS && 'justify-center'
                        )}
                      >
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none pr-2'
                              : '',
                            onClick: header.column.getToggleSortingHandler()
                          }}
                        >
                          {{
                            asc: <Icons.arrowUp className={'h-5 w-5'} />,
                            desc: <Icons.arrowDown className={'h-5 w-5'} />
                          }[header.column.getIsSorted() as string] ??
                            (header.column.getCanSort() ? (
                              <Icons.sort className={'h-5 w-5'} />
                            ) : null)}
                        </div>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.columnDef?.meta?.filterComponent(
                          header.getContext() as HeaderContext<TData, string>
                        )}
                      </div>
                    )}
                  </TableHead>
                );
              })}
              {!!onColumnFiltersChange && (
                <TableHead className="w-0 py-0 font-medium">
                  <Button
                    className={cn(
                      'my-auto',
                      table.getState().columnFilters.length === 0 && 'pointer-events-none opacity-0'
                    )}
                    variant={'secondary'}
                    onClick={() => table.resetColumnFilters()}
                  >
                    <span className="whitespace-break-spaces text-xs">Clear filters</span>
                  </Button>
                </TableHead>
              )}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow
                  className={cn(
                    index % 2 === 1,
                    'hover:bg-muted/50 hover:border-primary-lighter cursor-pointer transition-colors'
                  )}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => (onRowClick ? onRowClick(row) : undefined)}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      data-first={index === 0}
                      data-last={index === row.getVisibleCells().length - 1}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  {!!onColumnFiltersChange && <TableCell />}
                </TableRow>
                {row.getIsExpanded() && !!getExtendedContent && (
                  <TableRow>
                    <TableCell
                      className={'p-0'}
                      colSpan={row.getVisibleCells().length + (!!onColumnFiltersChange ? 1 : 0)}
                    >
                      {getExtendedContent(row.original)}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + (!!onColumnFiltersChange ? 1 : 0)}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export const DataTable = React.forwardRef(DataTableInner) as <TData, TValue>(
  props: DataTableProps<TData, TValue> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof DataTableInner>;
