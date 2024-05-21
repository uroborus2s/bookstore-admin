import useTree from '@/hooks/tree/useTree';
import type { IDData, Tree } from '@/hooks/tree/types';
import { FC, PropsWithChildren } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from '@radix-ui/react-icons';

export interface TreeHeaderProps<TData extends IDData> {
  bookData: any;
}

export const TreeHeader: FC<PropsWithChildren<TreeHeaderProps<any>>> = ({
  children,
  bookData,
}) => {
  return (
    <div>
      <Button variant="outline">
        <ChevronRightIcon className="h-4 w-4" />
        {bookData.list[0].bookName}
      </Button>
      {children}
    </div>
  );
};
