'use client';

import { ColumnDef } from '@tanstack/react-table';
import { QrCodeProjectList } from '@/data/resource/schema';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/DataTable/data-table-column-header';
import dayjs from 'dayjs';
import {
  fetchBookCategory,
  fetchBookListData,
  fetchBookStatuses,
} from '@/data/book/fetch';
import useDataTableList from '@/hooks/useDataTableList';
import { usePathname } from 'next/navigation';
import Breadcrumbs from '@/components/breadcrumbs';
import { DataTable } from '@/components/DataTable/data-table';
import { ALL_COLUMN, queryNames } from '@/data/constant';
import { DataTableToolbar } from './data-table-toolbar';
import { DataTableRowActions } from './data-table-row-actions';

const columns: ColumnDef<QrCodeProjectList>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'bookSeq',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ALL_COLUMN['bookSeq'] as string}
      />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue('bookSeq')}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'bookName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ALL_COLUMN['bookName'] as string}
      />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue('bookName')}</div>
    ),
  },
  {
    accessorKey: 'bookCategory',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ALL_COLUMN['bookCategory'] as string}
      />
    ),
    cell: ({ row }) => {
      const category = fetchBookCategory().find(
        (cate) => cate.value === row.getValue('bookCategory'),
      );

      if (!category) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{category.label}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'publishUnit',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ALL_COLUMN['publishUnit'] as string}
      />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue('publishUnit')}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'bookStatus',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ALL_COLUMN['bookStatus'] as string}
      />
    ),
    cell: ({ row }) => {
      const status = fetchBookStatuses().find(
        (status) => status.value === row.getValue('bookStatus'),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'createTime',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ALL_COLUMN['createTime'] as string}
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <span>
          {dayjs(row.getValue('createTime')).format('YYYY-MM-DD HH:mm:ss')}
        </span>
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export default function BookPage() {
  const path = usePathname();

  const { table, isLoading, error } = useDataTableList<QrCodeProjectList, {}>({
    queryName: queryNames.BookQuery,
    columns,
    fetchDataFn: fetchBookListData,
    state: {},
  });

  return (
    <>
      <Breadcrumbs path={path} />
      <DataTable
        table={table}
        isLoading={isLoading}
        error={error}
        ToolbarRender={DataTableToolbar}
      />
    </>
  );
}
