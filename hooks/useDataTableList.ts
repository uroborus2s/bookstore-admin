import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FetchListData, PageReqVO } from '@/types';
import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';

export interface UseDataTableListOptions<TData, TState> {
  fetchDataFn: (pageVO: PageReqVO) => Promise<FetchListData<TData>>;
  columns: ColumnDef<TData, any>[];
  state: TState;
  queryName: string;
}
export default <TData, TState>({
  fetchDataFn,
  columns,
  state,
  queryName,
}: UseDataTableListOptions<TData, TState>) => {
  // 状态管理
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  // 列可见行
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // 列选择
  const [rowSelection, setRowSelection] = useState({});
  // 列过滤
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // 列排序
  const [sorting, setSorting] = useState<SortingState>([]);

  const convertArrayToObject = (
    filters: ColumnFiltersState,
  ): { [key: string]: unknown } => {
    return filters.reduce(
      (acc, filter) => {
        acc[filter.id] = filter.value;
        return acc;
      },
      {} as { [key: string]: unknown },
    );
  };

  // 使用 useQuery 获取数据
  const { data, isLoading, error } = useQuery({
    queryKey: [
      queryName,
      pagination.pageIndex,
      pagination.pageSize,
      columnFilters,
    ],
    queryFn: (context) =>
      fetchDataFn({
        pageNo: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        ...convertArrayToObject(columnFilters),
      }),
    placeholderData: keepPreviousData,
  });

  const tableData = data?.list || [];
  const rowCount = data?.total || 0;

  const table = useReactTable({
    data: tableData,
    columns,
    rowCount,
    state: {
      ...state,
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    manualPagination: true,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return { table, isLoading, error };
};
