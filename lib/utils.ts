import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Updater } from '@/types';
import { TreeState } from '@/hooks/tree/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function functionalUpdate<T>(updater: Updater<T>, input: T): T {
  return typeof updater === 'function'
    ? (updater as (input: T) => T)(input)
    : updater;
}

export function makeStateUpdater<K extends keyof TreeState>(
  key: K,
  instance: unknown,
) {
  return (updater: Updater<TreeState[K]>) => {
    (instance as any).setState(<TTableState>(old: TTableState) => {
      return {
        ...old,
        [key]: functionalUpdate(updater, (old as any)[key]),
      };
    });
  };
}
