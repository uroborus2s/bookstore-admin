import { Key } from 'react';
import { OnChangeFn } from '@/types';

export type Updater<T> = T | ((old: T) => T);
export type PartialKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export interface IDData {
  id: Key;
  parentId: Key;
}

export interface TreeState {
  visibility?: Record<string, boolean>;
}

export interface InitialTreeState extends Partial<TreeState> {}

export type NodeDefTemplate<TProps extends object> =
  | string
  | ((props: TProps) => any);

export interface Node<TData extends IDData> {
  id: Key;
  // isLeaf: boolean;
  // isRoot: boolean;
  // isHidden: boolean;
  // isExpanded: boolean;
  // isSelected: boolean;
  data: TData;
}
export interface NodeDef<TData extends IDData> {
  // 可见性
  enableHiding?: boolean;
  //   是否展开
  enableExpanding?: boolean;
  //   是否选中
  enableSelecting?: boolean;
  //   是否编辑
  enableEditing?: boolean;
  //   是否复制
  enableCopying?: boolean;
  //   是否粘贴
  enablePasting?: boolean;
  //   是否删除
  enableDeleting?: boolean;
  value?: NodeDefTemplate<TData>;
}

export interface TreeOptions<TData extends IDData>
  extends PartialKeys<TreeOptionsResolved<TData>, 'state' | 'onStateChange'> {}

export interface TreeOptionsResolved<TData extends IDData> {
  data: TData[];
  nodeDefs?: NodeDef<TData>[];
  _features?: TreeFeature<TData>[];
  mergeOptions?: (
    defaultOptions: TreeOptions<TData>,
    options: Partial<TreeOptions<TData>>,
  ) => TreeOptions<TData>;
  state: TreeState;
  onStateChange?: (updater: Updater<TreeState>) => void;
  rootId: string;
  onVisibilityChange?: OnChangeFn<Pick<TreeState, 'visibility'>>;
}

export interface TreeFeature<TData extends IDData = any> {
  getDefaultOptions?: (
    tree: Tree<TData>,
  ) => Partial<TreeOptionsResolved<TData>>;
  getInitialState?: (initialState?: InitialTreeState) => Partial<TreeState>;
}

export interface Tree<TData extends IDData> {
  _features: readonly TreeFeature<TData>[];
  initialState: TreeState;
  getState: () => TreeState;
  options: RequiredKeys<TreeOptionsResolved<TData>, 'state'>;
  setOptions: (newOptions: Updater<TreeOptionsResolved<TData>>) => void;
  setState: (updater: Updater<TreeState>) => void;
  reset: () => void;
  getRootNode: () => Node<TData>;
  getChildrenNode: (id: Key) => Node<TData>[];
  getParentNode: (id: Key) => Node<TData>;
  /**
   * Returns an array of all leaf-node columns for this column. If a column has no children, it is considered the only leaf-node column.
   */
  getLeafNodes: (id: Key) => Node<TData>[];
}
