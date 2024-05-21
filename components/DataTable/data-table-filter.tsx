'use client';

import { Column } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface DataTableFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  placeholder: string;
  values: {
    label: string;
    value: string;
  }[];
}

export function DataTableFilter<TData, TValue>({
  column,
  placeholder,
  values,
}: DataTableFilterProps<TData, TValue>) {
  return (
    <Select
      onValueChange={(value) => {
        if (value === 'none') {
          column?.setFilterValue(undefined);
        }
        column?.setFilterValue(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {values.map((value, index) => (
          <SelectItem key={index} value={value.value}>
            {value.label}
          </SelectItem>
        ))}
        <SelectSeparator />
        <SelectItem value="none">无</SelectItem>
      </SelectContent>
    </Select>
  );
}
