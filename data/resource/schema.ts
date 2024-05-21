import { z } from 'zod';
import { PageReqVO } from '@/types';

export interface QRCodeProjectListVO extends PageReqVO {
  itemName?: string;
  dtcodeStatus?: string;
}

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const qrCodeProjectSchema = z.object({
  // 编号
  id: z.number(),
  // 项目编号
  itemId: z.string(),
  // 项目名称
  itemName: z.string(),
  // 资源来源
  sourceOrigin: z.string(),
  // 图书编号
  bookNo: z.string(),
  // 备注
  remarks: z.string().optional(),
  // 状态
  dtcodeStatus: z.string(),
  // 创建时间
  createTime: z.number(),
});

export type QrCodeProjectList = z.infer<typeof qrCodeProjectSchema>;

export const classifications = [
  {
    value: '00',
    label: '出版社提供',
  },
  {
    value: '01',
    label: '第三方引入',
  },
  {
    value: '03',
    label: '应用提供',
  },
];

export const statuses = [
  {
    value: '00',
    label: '启用',
  },
  {
    value: '01',
    label: '不启用',
  },
];

export const qrCodeProjectFormSchema = z.object({
  // 项目编号
  itemId: z.string().min(1),
  // 项目名称
  itemName: z.string().min(1),
  // 资源来源
  sourceOrigin: z.string().min(1),
  // 图书编号
  bookNo: z.string().min(1),
  // 状态
  dtcodeStatus: z.string(),
  // 备注
  remarks: z.string().optional(),
});

export type QrCodeProjectFormPO = z.infer<typeof qrCodeProjectFormSchema>;
