'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/registry/new-york/ui/sheet'
import { Button } from '@/registry/new-york/ui/button'
import { Icons } from '@/registry/new-york/blocks/smart-icons'
import React from 'react'
import { Textarea } from '@/registry/new-york/ui/textarea'
import {
  availableTasks,
  ResultSelection,
  TaskSelection,
} from '@/registry/new-york/blocks/smart-selection'
import { useXtartapp } from '../lib/smartui-api.hook'
import { TaskEnpoints } from '../lib/smartui-api.utils'
import { LoaderIcon } from 'lucide-react'
import { cn } from '~/lib/utils'

export function DefaultTrigger() {
  return (
    <span className="flex items-center gap-1 text-xs text-purple-950 dark:text-purple-500">
      <Icons.Companion className="size-4" />
      AI companion
    </span>
  )
}

type VerticalPosition = 'top' | 'middle' | 'bottom'
type HorizontalPosition = 'start' | 'center' | 'end'

export type SmartSheet = React.ComponentProps<typeof Sheet> & {
  trigger?: React.ReactNode
  tasks?: TaskEnpoints[]
  defaultValue?: string
  context?: string
  onSelect?: (value: string) => void
  side?: 'top' | 'right' | 'bottom' | 'left'
  triggerPosition?: {
    vertical: VerticalPosition
    horizontal: HorizontalPosition
  }
}

function getPositionClasses(
  vertical: VerticalPosition,
  horizontal: HorizontalPosition,
): string {
  const verticalClasses = {
    top: 'top-4',
    middle: 'top-1/2 -translate-y-1/2',
    bottom: 'bottom-4',
  }

  const horizontalClasses = {
    start: 'left-4',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-4',
  }

  return cn(
    'fixed z-50',
    verticalClasses[vertical],
    horizontalClasses[horizontal],
  )
}

export function SmartSheet({
  trigger,
  defaultValue,
  context,
  tasks,
  side = 'right',
  triggerPosition = { vertical: 'bottom', horizontal: 'end' },
}: SmartSheet) {
  const [open, setOpen] = React.useState(false)
  const [taskId, setTaskId] = React.useState<TaskEnpoints | undefined>()
  const [selectedValue, setSelectedValue] = React.useState('')
  const [text, setText] = React.useState(defaultValue || '')

  const { mutate, isLoading, data } = useXtartapp(taskId)

  const positionClasses = getPositionClasses(
    triggerPosition.vertical,
    triggerPosition.horizontal,
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={'ghost'}
          className={cn(
            'cursor-pointer p-2 h-auto w-auto min-w-2 rounded-full shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow',
            positionClasses,
          )}
        >
          {trigger ?? <DefaultTrigger />}
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className="w-full sm:max-w-md p-4 h-full">
        <SheetHeader>
          <SheetTitle>
            <span className="flex items-center gap-2">
              <Icons.Companion className="size-5 text-cyan-600" />
              <h6 className="text-base">AI Companion</h6>
            </span>
          </SheetTitle>
          <SheetDescription>
            <span className="text-sm text-gray-800 dark:text-gray-300">
              Jumpstart collaboration with your AI companion.
            </span>
            <br />
            <span className="text-xs text-muted-foreground">
              Ask questions, get suggestions, and receive feedback on your code.
            </span>
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          <TaskSelection
            tasks={tasks}
            onSelectionChange={(value) => {
              if (value === taskId) setTaskId(undefined)
              else setTaskId(value as TaskEnpoints)
            }}
          />
          {taskId ? (
            <p className="text-xs text-gray-800 dark:text-gray-300 mt-1">
              {availableTasks.find((task) => task.id === taskId)?.description}
            </p>
          ) : (
            <p className="text-xs text-red-500 mt-1">
              Select a task to get started.
            </p>
          )}

          {isLoading && (
            <>
              <div className="flex justify-center items-center scale-50">
                <div className="relative w-24 h-24 animate-spin animate-zoom rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white dark:bg-black rounded-full"></div>
                </div>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-300 text-center">
                Please wait while we process your request...
              </p>
            </>
          )}

          <div className="flex-1 overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
            {data && !isLoading && (
              <ResultSelection
                onSelect={(value) => {
                  if (value === selectedValue) setSelectedValue('')
                  else setSelectedValue(value)
                }}
                results={Array.isArray(data) ? data : [data]}
              />
            )}
          </div>

          <Textarea
            placeholder="Type your content here."
            disabled={isLoading || !!selectedValue}
            autoFocus
            wrap="hard"
            onChange={(e) => {
              setText(e.target.value)
            }}
            value={text}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.shiftKey) {
                setText((prev) => prev + '\n')
              } else if (e.key === 'Enter') {
                e.preventDefault()
                mutate({
                  context: context || 'description du monde',
                  input: text,
                })
              }
            }}
            rows={2}
            className="mt-8 max-h-32"
          />
        </div>

        <SheetFooter className="px-0">
          <Button
            disabled={isLoading || !taskId}
            onClick={() => {
              setSelectedValue('')
              mutate({
                context,
                input: text,
              })
            }}
            className="cursor-pointer"
            variant={'default'}
          >
            {isLoading && <LoaderIcon className="mr-2 animate-spin" />}
            Submit
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

SmartSheet.displayName = 'SmartSheet'
