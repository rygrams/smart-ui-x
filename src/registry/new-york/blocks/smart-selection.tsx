'use client'

import { SparklesIcon } from 'lucide-react'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/registry/new-york/ui/toggle-group'
import clsx from 'clsx'
import * as React from 'react'

export function ResultSelection({
  results,
  onSelect,
}: {
  results: string[]
  onSelect: (value: string) => void
}) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      className="flex flex-col gap-2 shadow-none data-[variant=outline]:shadow-none w-full"
      size={'sm'}
    >
      {results.map((result) => (
        <ToggleGroupItem
          key={result}
          value={result}
          onClick={() => onSelect(result)}
          className={clsx([
            'data-[variant=outline]:border-l-0.5 data-[variant=outline]:first:border',
            'data-[state=on]:bg-gray-100 dark:data-[state=on]:bg-gray-100/10',
            'p-3 first:rounded-l-lg last:rounded-r-lg rounded-lg w-full cursor-pointer',
          ])}
        >
          <span className="flex items-start justify-start gap-2 w-full">
            <SparklesIcon className="size-4 text-emerald-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400 text-wrap text-left">
              {result}
            </span>
          </span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

ResultSelection.displayName = 'ResultSelection'
