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

export function TaskSelection({
  onSelectionChange,
  tasks,
}: {
  onSelectionChange?: (value: TaskEnpoints) => void
  tasks?: TaskEnpoints[]
}) {
  const filteredTasks = tasks
    ? availableTasks.filter((task) => tasks.includes(task.id as TaskEnpoints))
    : availableTasks

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      className="flex gap-1 shadow-none data-[variant=outline]:shadow-none"
      size="sm"
    >
      {filteredTasks.map((task) => (
        <ToggleGroupItem
          key={task.id}
          value={task.title}
          onClick={() => onSelectionChange?.(task.id as TaskEnpoints)}
          className={clsx([
            'data-[variant=outline]:border-l-0.5 data-[variant=outline]:first:border text-sm',
            'data-[state=on]:bg-purple-500/10 data-[state=on]:text-purple-900',
            'dark:data-[state=on]:text-purple-500 first:rounded-l last:rounded-r',
            'px-2 rounded',
          ])}
        >
          {task.icon} {task.title}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
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
      className="flex flex-col mt-6 shadow-none data-[variant=outline]:shadow-none w-full"
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
            <SparklesIcon className="size-4 text-purple-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
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
    title: 'suggest',
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
    title: 'normalize',
    description: 'Standardize or normalize your input content',
    icon: <SearchCheck />,
  },
  {
    id: 'generation',
    title: 'generate',
    description: 'Automatically generate content based on context or prompts',
    icon: <SparklesIcon />,
  },
  {
    id: 'explanation',
    title: 'explain',
    description: 'Get explanations or clarifications for specific content',
    icon: <HelpCircleIcon />,
  },
]
