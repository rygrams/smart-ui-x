'use client'

import {
  HelpCircleIcon,
  ListPlusIcon,
  SearchCheck,
  SparklesIcon,
  SpellCheck2Icon,
} from 'lucide-react'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/registry/new-york/ui/toggle-group'
import clsx from 'clsx'
import { TaskEnpoints } from '../lib/smartui-api.utils'
import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function TaskSelection({
  onSelectionChange,
  tasks,
}: {
  onSelectionChange?: (value?: TaskEnpoints) => void
  tasks?: TaskEnpoints[]
}) {
  const filteredTasks = tasks
    ? availableTasks.filter((task) => tasks.includes(task.id as TaskEnpoints))
    : availableTasks

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string>('')

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild className="p-0 h-8 text-left has-[>svg]:px-1">
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'text-xs p-0 text-bold cursor-pointer text-left',
            !value ? 'text-red-400' : 'text-purple-600',
          )}
        >
          {value ? (
            <span className="flex items-center gap-1 capitalize">
              {filteredTasks.find((task) => task.id === value)?.icon}
              {filteredTasks.find((task) => task.id === value)?.id}
            </span>
          ) : (
            'Select a task...'
          )}

          <ChevronsUpDown className="ml-2 size-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {filteredTasks.map((task) => (
                <CommandItem
                  key={task.id}
                  value={task.id}
                  onSelect={(currentValue) => {
                    const selectedValue =
                      currentValue === value ? '' : currentValue

                    setValue(selectedValue)
                    onSelectionChange?.(selectedValue as TaskEnpoints)

                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4 text-black',
                      value === task.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {task.icon}
                  <span className="text-xs"> {task.id}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

TaskSelection.displayName = 'TaskSelection'

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

export const availableTasks = [
  {
    id: 'suggestions',
    description: 'Get content suggestions based on your input',
    icon: <ListPlusIcon />,
  },
  {
    id: 'correction',
    title: 'correct',
    description: 'Get content correction for your input',
    icon: <SpellCheck2Icon />,
  },
  {
    id: 'normalization',
    description: 'Standardize or normalize your input content',
    icon: <SearchCheck />,
  },
  {
    id: 'generation',
    description: 'Automatically generate content based on prompts',
    icon: <SparklesIcon />,
  },
  {
    id: 'explanation',
    description: 'Get explanations for specific content',
    icon: <HelpCircleIcon />,
  },
]
