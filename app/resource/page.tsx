'use client';

import { usePathname } from 'next/navigation';
import Breadcrumbs from '@/components/breadcrumbs';

export default function Resource() {
  const path = usePathname();

  return (
    <>
      <Breadcrumbs path={path} />
    </>
  );
}
