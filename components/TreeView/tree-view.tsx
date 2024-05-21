import useTree from '@/hooks/tree/useTree';
import type { IDData, Tree } from '@/hooks/tree/types';
import { FC, PropsWithChildren } from 'react';

export interface TreeViewProps<TData extends IDData> {}

export const TreeView: FC<PropsWithChildren<TreeViewProps<any>>> = ({
  children,
}) => {
  return <div>{children}</div>;
};
