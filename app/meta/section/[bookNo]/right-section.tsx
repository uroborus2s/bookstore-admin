import { FC, Key } from 'react';
import { fetchSectionListData } from '@/data/book/fetch';
import { useQuery } from '@tanstack/react-query';
import { queryNames } from '@/data/constant';
import useTree from '@/hooks/tree/useTree';
import { SectionResponseSchemaPO } from '@/data/book/schema';
import { DataTree } from '@/components/TreeView/data-tree';

interface RightPanelProps {
  data: any;
  bookData: any;
}

export type TreeNodeData = SectionResponseSchemaPO & {
  parentId: Key;
  key: Key;
};

export const RightPanel: FC<RightPanelProps> = ({ data,bookData }) => {
  const treeData = data?.list.map((l: SectionResponseSchemaPO) => ({
    ...l,
    key: l.id,
    id: l.chapterId,
    parentId: l.chapterPid,
  })) as TreeNodeData[];
  console.log(treeData);
  const tree = useTree<TreeNodeData>({
    data: treeData,
    rootId: '0',
  });

  return <DataTree bookData={bookData} tree={tree}></DataTree>;
};
