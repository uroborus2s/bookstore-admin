'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { qrCodeProjectSchema } from '@/data/resource/schema';
import { useCallback, useRef } from 'react';
import { DeleteDialog, DeleteDialogHandle } from '@/components/delete-dialog';
import { deleteQRCodeProjectItem } from '@/data/resource/fetch';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const qrCodeRow = qrCodeProjectSchema.parse(row.original);
  const deleteDialogRef = useRef<DeleteDialogHandle | null>(null);

  const onConfirm = useCallback(() => {
    deleteQRCodeProjectItem(Number(qrCodeRow.id)).then((res) => {
      deleteDialogRef.current?.setShowOpen(false);
    });
  }, [qrCodeRow.id]);

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
          <DropdownMenuItem>二维码管理</DropdownMenuItem>
          <DropdownMenuItem>管理</DropdownMenuItem>
          <DropdownMenuSeparator />
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
