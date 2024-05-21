'use client';

import { usePathname } from 'next/navigation';
import Breadcrumbs from '@/components/breadcrumbs';
import { CircularProgress } from '@/components/ui/circular-progress';

export default function Resource() {
  const path = usePathname();

  console.log(path);
  return (
    <>
      <Breadcrumbs path={path} />
      <CircularProgress></CircularProgress>
    </>
  );
}
