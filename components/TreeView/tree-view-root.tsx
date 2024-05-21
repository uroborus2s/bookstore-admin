'use client';

import { FC, PropsWithChildren } from 'react';

export const TreeViewRoot: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div>{children}</div>;
};
