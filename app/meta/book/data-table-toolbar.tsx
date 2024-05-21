'use client';

import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/DataTable/data-table-view-options';
import { Icons } from '@/components/icons';
import { PresetCreateBook } from './preset-creat';
import { DataTableFilter } from '@/components/DataTable/data-table-filter';
import { fetchBookCategory } from '@/data/book/fetch';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <Icons.search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="请输入图书名称"
            value={
              (table.getColumn('bookName')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('bookName')?.setFilterValue(event.target.value)
            }
            className="pl-8"
          />
        </div>
        <DataTableFilter
          column={table.getColumn('bookCategory')}
          placeholder="请选择图书分类"
          values={fetchBookCategory()}
        />
      </div>
      <div className="ml-auto mr-4">
        <PresetCreateBook />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
