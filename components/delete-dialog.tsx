import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { forwardRef, useImperativeHandle, useState } from 'react';

interface DeleteDialogProps {
  onConfirm: () => void;
}

export interface DeleteDialogHandle {
  setShowOpen: (open: boolean) => void;
}

export const DeleteDialog = forwardRef<DeleteDialogHandle, DeleteDialogProps>(
  ({ onConfirm }, ref) => {
    const [showOpen, setShowOpen] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        setShowOpen,
      }),
      [],
    );
    return (
      <AlertDialog open={showOpen} onOpenChange={setShowOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              此操作无法撤销！点击确认删除记录
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                onConfirm();
              }}
            >
              确认
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);

DeleteDialog.displayName = 'DeleteDialog';
