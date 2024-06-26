import { SiteConfig } from 'types';
import { Icons } from '@/components/icons';

export const siteConfig: SiteConfig = {
  name: 'Book Store',
  description:
    'An open source application built using the new router, server components and everything new in Next.js 13.',
  url: 'https://tx.shadcn.com',
  ogImage: 'https://tx.shadcn.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/shadcn',
    github: 'https://github.com/shadcn/taxonomy',
  },
  modules: {
    label: '首页',
    Icon: Icons.home,
    path: '/',
    childNode: {
      resource: {
        label: '资源管理',
        Icon: Icons.folders,
        path: '/resource',
        childNode: {
          qrCode: { label: '二维码管理', path: '/resource/qrCode' },
        },
      },
      meta: {
        label: '元数据管理',
        Icon: Icons.databaseBackup,
        childNode: {
          book: { label: '图书管理', path: '/meta/book' },
          section: { label: '章节管理', path: '/meta/section' },
        },
      },
      // user: { label: '用户管理', Icon: Icons.user },
      // statistics: { label: '资源统计', Icon: Icons.statistics },
    },
  },
};
