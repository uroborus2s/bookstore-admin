import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const qrCodeSchema = z.object({
  // 编号
  id: z.string(),
  // 项目编号
  itemId: z.string(),
  // 项目名称
  itemName: z.string(),
  // 资源来源
  sourceOrigin: z.string(),
  // 图书编号
  bookNo: z.string(),
  // 备注
  remarks: z.string(),
  // 状态
  dtcodeStatus: z.string(),
  // 创建时间
  createTime: z.string(),
});

export type QrCodeList = z.infer<typeof qrCodeSchema>;
