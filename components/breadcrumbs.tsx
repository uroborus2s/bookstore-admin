'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Icons } from '@/components/icons';
import { MenuTitle } from '@/types';
import { siteConfig } from '@/config/site';

export interface BreadcrumbsPros {
  path: string;
}

export const getBreadcrumbName = (path: string, map: MenuTitle) => {
  let parts = path.split('/').filter((x) => x);
  let current = map;
  for (let part of parts) {
    if (current.childNode && current.childNode[part]) {
      current = current.childNode[part] as MenuTitle;
    } else {
      return part; // 如果找不到匹配的汉字名称，返回路径部分本身
    }
  }
  return current.label;
};

const Breadcrumbs = ({ path }: BreadcrumbsPros) => {
  const pathNames = path.split('/').filter((x) => x);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Icons.home className="h-4 w-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathNames.map((value, index) => {
          const to = `/${pathNames.slice(0, index + 1).join('/')}`;
          return (
            <>
              <BreadcrumbSeparator>
                <Icons.chevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={to}>
                  {`${getBreadcrumbName(to, siteConfig.modules)}`}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
