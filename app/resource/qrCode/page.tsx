'use client';

import { usePathname } from 'next/navigation';
import Breadcrumbs from '@/components/breadcrumbs';
import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { QrCodeList } from '@/data/resource/schema';
import { DataTable } from '@/components/DataTable/data-table';
import { useState } from 'react';
import { DataTableColumnHeader } from '@/components/DataTable/data-table-column-header';
import { DataTableRowActions } from '@/components/DataTable/data-table-row-actions';
import dayjs from 'dayjs';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchTableData } from '@/data/resource/fetch';

const classifications = [
  {
    value: '00',
    label: '出版社提供',
  },
];

const statuses = [
  {
    value: '00',
    label: '启用',
  },
  {
    value: '01',
    label: '不启用',
  },
];

const columns: ColumnDef<QrCodeList>[] = [
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
      <DataTableColumnHeader column={column} title="项目标题" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue('itemName')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'sourceOrigin',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="项目分类" />
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
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="二维码数量" />
    ),
    cell: ({ row }) => <div className="w-[80px]">0</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'remarks',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="备注" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue('remarks')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'dtcodeStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="状态" />
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
  },
  {
    accessorKey: 'createTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
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

export default function QRCode() {
  const path = usePathname();

  // 状态管理
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // 使用 useQuery 获取数据
  const { data, isLoading, error } = useQuery({
    queryKey: ['tableData', pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      fetchTableData({
        pageNo: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
      }),
    placeholderData: keepPreviousData,
  });
  console.log(data);

  const tableData = data?.data.list || [];
  const pageCount = data?.total || 0;
  console.log(tableData);
  return (
    <>
      <Breadcrumbs path={path} />
      {isLoading ? (
        <div>页面加载中</div>
      ) : error ? (
        <div>错误：{error.message}</div>
      ) : (
        <DataTable
          data={tableData}
          columns={columns}
          pageCount={pageCount}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
    </>
  );
}
