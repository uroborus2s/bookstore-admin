'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useCallback, useRef } from 'react';
import { DeleteDialog, DeleteDialogHandle } from '@/components/delete-dialog';
import { deleteBookItem } from '@/data/book/fetch';
import { bookResponseSchema } from '@/data/book/schema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const bookRow = bookResponseSchema.parse(row.original);
  const deleteDialogRef = useRef<DeleteDialogHandle | null>(null);

  const onConfirm = useCallback(() => {
    console.log(bookRow);
    deleteBookItem(Number(bookRow.id)).then((res) => {
      console.log(res);
      deleteDialogRef.current?.setShowOpen(false);
    });
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>修改</DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => deleteDialogRef.current?.setShowOpen(true)}
            className="text-red-600"
          >
            删除
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog ref={deleteDialogRef} onConfirm={onConfirm} />
    </>
  );
}
