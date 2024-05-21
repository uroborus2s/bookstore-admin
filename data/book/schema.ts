import { z } from 'zod';
import { PageReqVO } from '@/types';

export interface SectionListVO extends Partial<PageReqVO> {
  bookNo: string;
}

const sectionSchemaConstant = {
  // 章节编号
  chapterId: z.string(),
  // 章节名称
  chapterName: z.string(),
  // 上级章节名称
  chapterPid: z.string(),
  // 章节标题
  chapterPtitle: z.string(),
  // 图书编号
  bookNo: z.string(),
  // 章节等级
  depth: z.number(),
  // 是否最小节点
  isLeaf: z.string(),
  // 排序
  chapterSeq: z.string(),
  // 状态
  chapterStatus: z.string(),
};

export const sectionFormSchema = z.object(sectionSchemaConstant);

export const sectionResponseSchema = z.object({
  // 编号
  id: z.number(),
  // 创建时间
  createTime: z.number(),
  ...sectionSchemaConstant,
});

const bookSchemaConstant = {
  // 图书编号
  bookNo: z.string(),
  // 图书名称
  bookName: z.string(),
  // 图书审定年份
  auditedYear: z.string().optional(),
  // 图书分类
  bookCategory: z.string(),
  // 学段
  period: z.string().optional(),
  // 年级
  grade: z.string().optional(),
  // 学科
  subject: z.string().optional(),
  // 版本
  edition: z.string().optional(),
  // 册次
  volume: z.string().optional(),
  // 出版单位
  publishUnit: z.string().optional(),
  // 图书状态
  bookStatus: z.string(),
  // 排序
  bookSeq: z.string(),
  // 简介
  intro: z.string().optional(),
  // 备用字段1
  spareFiled1: z.string().optional(),
  // 备用字段2
  spareFiled2: z.string().optional(),
};

export const bookFormSchema = z.object(bookSchemaConstant);

export const bookResponseSchema = z.object({
  // 编号
  id: z.number(),
  // 创建时间
  createTime: z.number(),
  ...bookSchemaConstant,
});

export type SectionFormSchemaPO = z.infer<typeof sectionFormSchema>;
export type SectionResponseSchemaPO = z.infer<typeof sectionResponseSchema>;

export type BookFormSchemaPO = z.infer<typeof bookFormSchema>;
export type BookResponseSchemaPO = z.infer<typeof bookResponseSchema>;

export type SearchBookSchemaVO = Partial<z.infer<typeof bookFormSchema>> &
  PageReqVO;
