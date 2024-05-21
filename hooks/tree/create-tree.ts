import {
  IDData,
  RequiredKeys,
  Tree,
  TreeOptionsResolved,
  TreeState,
} from '@/hooks/tree/types';
import { visibility } from '@/hooks/tree/visibility';
import { Updater } from '@/types';
import { functionalUpdate } from '@/lib/utils';
import { Key, useCallback } from 'react';

const builtInFeatures = [visibility];

export function createTree<TData extends IDData>(
  options: TreeOptionsResolved<TData>,
): Tree<TData> {
  const _features = [...builtInFeatures, ...(options._features ?? [])];

  let tree = { _features } as unknown as Tree<TData>;
  const defaultOptions = tree._features?.reduce((obj, feature) => {
    return Object.assign(obj, feature.getDefaultOptions?.(tree));
  }, {}) as TreeOptionsResolved<TData>;

  const mergeOptions = (options: TreeOptionsResolved<TData>) => {
    // if (tree.options.mergeOptions) {
    //   return tree.options.mergeOptions(defaultOptions, options);
    // }

    return {
      ...defaultOptions,
      ...options,
    };
  };

  let initialState = {} as TreeState;

  tree._features.forEach((feature) => {
    initialState = (feature.getInitialState?.(initialState) ??
      initialState) as TreeState;
  });

  const coreInstance = {
    options: {
      ...defaultOptions,
      ...options,
    },
    initialState,
    reset: () => {
      tree.setState(tree.initialState);
    },
    getState: () => {
      return tree.options.state as TreeState;
    },

    setState: (updater: Updater<TreeState>) => {
      tree.options.onStateChange?.(updater);
    },
    setOptions: (updater:Updater<TreeOptionsResolved<any>>) => {
      const newOptions = functionalUpdate(updater, tree.options);
      tree.options = mergeOptions(newOptions) as RequiredKeys<
        TreeOptionsResolved<TData>,
        'state'
      >;
    },
    getChildrenNode: (id: Key) => {
      // return tree.options
      //   .data.filter((d) => d.parentId === id)
      //   .map((d) => ({ id: String(d.id), data: d }));
      return tree.options.data;
    },
  };
  Object.assign(tree, coreInstance);

  return tree;
}
