'use client'

import { LoaderIcon } from 'lucide-react'
import { getPositionClasses, TriggerPosition } from '../lib/smartui.utils'
import { cn } from '../lib/utils'
import { Button } from '../ui/button'
import { Icons } from './smart-icons'
import {
  SmartSidebar,
  SmartSidebarContent,
  SmartSidebarFooter,
  SmartSidebarHeader,
  SmartSidebarProvider,
  SmartSidebarTrigger,
  useSmartSidebar,
} from './smart-sidebar'
import { useXtartapp } from '../lib/smartui-api.hook'
import { useState } from 'react'
import { TaskEnpoints } from '../lib/smartui-api.utils'
import { Textarea } from '../ui/textarea'
import {
  availableTasks,
  ResultSelection,
  TaskSelection,
} from './smart-selection'

export function SmartLayout({
  children,
  triggerPosition = { vertical: 'bottom', horizontal: 'end' },
  defaultValue,
  context,
}: React.PropsWithChildren & {
  triggerPosition?: TriggerPosition
  defaultValue?: string
  context?: string
}) {
  const [taskId, setTaskId] = useState<TaskEnpoints | undefined>()
  const { mutate, isLoading, data } = useXtartapp(taskId)
  const [selectedValue, setSelectedValue] = useState('')
  const [text, setText] = useState(defaultValue || '')

  const positionClasses = getPositionClasses(
    triggerPosition.vertical,
    triggerPosition.horizontal,
  )

  return (
    <SmartSidebarProvider
      defaultOpen={true}
      style={{
        '--sidebar-width': '22rem',
        '--sidebar-width-mobile': '20rem',
      }}
    >
      <SmartSidebar className=" shadow-md" side="right" variant="inset">
        <SmartSidebarHeader>
          <div className="w-full flex justify-between">
            <span className="flex items-center gap-2 mt-8">
              <Icons.Companion className="size-5" />
              <h6 className="text-base text-purple-500 font-semibold">
                AI Companion
              </h6>
            </span>
          </div>

          <span className="text-sm text-gray-800 dark:text-gray-300 mt-6">
            Jumpstart collaboration with your AI companion.
          </span>
          <span className="text-xs text-muted-foreground -mt-1">
            Ask questions, get suggestions, and receive feedback on your code.
          </span>
        </SmartSidebarHeader>
        <SmartSidebarContent>
          <div className="size-full flex flex-col justify-end">
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
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
            <TaskSelection
              //tasks={tasks}
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
        </SmartSidebarContent>
        <SmartSidebarFooter>
          <div className="flex justify-end gap-2 w-full">
            <CloseButton />
            <Button
              disabled={isLoading || !taskId}
              onClick={() => {
                setSelectedValue('')
                // mutate({
                //   ...data,
                // })
              }}
              className="cursor-pointer w-7/12 bg-purple-700"
              variant={'default'}
            >
              {isLoading && <LoaderIcon className="mr-2 animate-spin" />}
              Submit
            </Button>
          </div>
        </SmartSidebarFooter>
      </SmartSidebar>
      <main>
        <div className={cn(positionClasses)}>
          <SmartSidebarTrigger />
        </div>
        {children}
      </main>
    </SmartSidebarProvider>
  )
}

function CloseButton() {
  const { setOpen } = useSmartSidebar()

  return (
    <Button
      onClick={() => {
        setOpen(false)
      }}
      className="cursor-pointer w-4/12"
      variant={'outline'}
    >
      Close
    </Button>
  )
}
