import type { IDData } from '@/hooks/tree/types';
import { FC, PropsWithChildren } from 'react';

export interface TreeItemProps<TData extends IDData> {}

export const TreeItem: FC<PropsWithChildren<TreeItemProps<any>>> = ({
  children,
}) => {
  return <div></div>;
};
