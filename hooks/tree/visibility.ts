import type { IDData, Tree, TreeFeature, TreeState } from '@/hooks/tree/types';
import { makeStateUpdater } from '@/lib/utils';
import type { Updater } from '@/types';
import { OnChangeFn } from '@/types';

// @ts-ignore
export const visibility: TreeFeature<any> = {
  getInitialState: (state): { visibility: Record<string, boolean> } => {
    return {
      visibility: {},
      ...state,
    };
  },
  getDefaultOptions: <TData extends IDData>(tree: Tree<TData>) => {
    return {
      onVisibilityChange: makeStateUpdater('visibility', tree) as OnChangeFn<
        Pick<TreeState, 'visibility'>
      >,
    };
  },
};
