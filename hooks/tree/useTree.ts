import { useMemo, useState } from 'react';
import { IDData, TreeOptions } from './types';
import { createTree } from '@/hooks/tree/create-tree';

export default <TData extends IDData>(options: TreeOptions<TData>) => {
  const treeRef = useMemo(
    () => ({
      current: createTree<TData>({
        state: {}, // Dummy state
        onStateChange: () => {}, // noop
        ...options,
      }),
    }),
    [],
  );

  // By default, manage table state here using the table's initial state
  const [state, setState] = useState(() => treeRef.current.initialState);

  treeRef.current.setOptions((prev) => ({
    ...prev,
    ...options,
    state: {
      ...state,
      ...options.state,
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: (updater) => {
      setState(updater);
      options.onStateChange?.(updater);
    },
  }));

  return treeRef.current;
};
