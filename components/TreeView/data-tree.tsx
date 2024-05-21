import type { IDData, Tree } from '@/hooks/tree/types';
import { Node } from '@/hooks/tree/types';
import { FC, PropsWithChildren, useMemo } from 'react';
import { TreeViewRoot } from '@/components/TreeView/tree-view-root';
import { TreeView } from '@/components/TreeView/tree-view';
import { TreeHeader } from '@/components/TreeView/tree-header';
import { TreeItem } from '@/components/TreeView/tree-item';
import { TreeNodeData } from '@/app/meta/section/[bookNo]/right-section';

export interface DataTreeProps<TData extends IDData> {
  tree: Tree<TData>;
  bookData: any;
}

export const DataTree: FC<PropsWithChildren<DataTreeProps<any>>> = ({
  tree,
  bookData,
}) => {
  const DataTreeNode = (treeNodes: Node<TreeNodeData>[]) => {
    return (
      <TreeView>
        {treeNodes &&
          treeNodes.length > 0 &&
          treeNodes.map((childNode) => (
            <TreeItem key={childNode.id}>
              {DataTreeNode(tree.getChildrenNode(childNode.data.chapterId))}
            </TreeItem>
          ))}
      </TreeView>
    );
  };

  const rootId = useMemo(() => tree.options.rootId, []);
  const children = tree.getChildrenNode(rootId);

  return (
    <TreeViewRoot>
      <TreeHeader bookData={bookData}>
        {children && children.length > 0 && DataTreeNode(children)}
      </TreeHeader>
    </TreeViewRoot>
  );
};
