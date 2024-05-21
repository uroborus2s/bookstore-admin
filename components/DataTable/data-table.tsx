'use client';

import { flexRender, type Table as TTable } from '@tanstack/react-table';
import { DataTablePagination } from './data-table-pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FC, ReactElement } from 'react';
import { CircularProgress } from '@/components/ui/circular-progress';

interface DataTableProps<TData> {
  table: TTable<TData>;
  isLoading: boolean;
  error: Error | null;
  ToolbarRender: FC<{ table: TTable<TData> }>;
}

export function DataTable<TData>({
  table,
  isLoading,
  error,
  ToolbarRender,
}: DataTableProps<TData>) {
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <div className="mt-6 space-y-2">
      <ToolbarRender table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
