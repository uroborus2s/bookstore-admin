'use client';

import { usePathname } from 'next/navigation';
import Breadcrumbs from '@/components/breadcrumbs';
import { type ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  classifications,
  QrCodeProjectList,
  statuses,
} from '@/data/resource/schema';
import { DataTable } from '@/components/DataTable/data-table';
import { DataTableColumnHeader } from '@/components/DataTable/data-table-column-header';
import dayjs from 'dayjs';
import { fetchQrcodeListData } from '@/data/resource/fetch';
import { DataTableRowActions } from '@/app/resource/qrCode/data-table-row-actions';
import useDataTableList from '@/hooks/useDataTableList';
import { ALL_COLUMN, queryNames } from '@/data/constant';
import { DataTableToolbar } from './data-table-toolbar';

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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'itemName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ALL_COLUMN['itemName'] as string}
      />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue('itemName')}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'sourceOrigin',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ALL_COLUMN['sourceOrigin'] as string}
      />
    ),
    cell: ({ row }) => {
      const label = classifications.find(
        (cla) => cla.value === row.getValue('sourceOrigin'),
      );

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {label?.label}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ALL_COLUMN['total'] as string}
      />
    ),
    cell: ({ row }) => <div className="w-[80px]">0</div>,
  },
  {
    accessorKey: 'remarks',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ALL_COLUMN['remarks'] as string}
      />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue('remarks')}</div>
    ),
  },
  {
    accessorKey: 'dtcodeStatus',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ALL_COLUMN['dtcodeStatus'] as string}
      />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('dtcodeStatus'),
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
    enableHiding: false,
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

export default function QRCodePage() {
  const path = usePathname();

  const { table, isLoading, error } = useDataTableList<QrCodeProjectList, {}>({
    queryName: queryNames.QRCodeProjectQuery,
    columns,
    fetchDataFn: fetchQrcodeListData,
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
