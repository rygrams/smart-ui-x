'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/registry/new-york/ui/dialog'
import { Button } from '@/registry/new-york/ui/button'
import { Icons } from '@/registry/new-york/blocks/smart-icons'
import { Textarea } from '@/registry/new-york/ui/textarea'
import {
  availableTasks,
  ResultSelection,
  TaskSelection,
} from '@/registry/new-york/blocks/smart-selection'
import { useXtartapp } from '@/registry/new-york/lib/smartui-api.hook'
import { TaskEnpoints } from '@/registry/new-york/lib/smartui-api.utils'
import { LoaderIcon } from 'lucide-react'

function SmartDialogTrigger() {
  return (
    <span className="flex items-center gap-1 text-xs text-purple-950 dark:text-purple-500">
      <Icons.Companion className="size-4" />
      AI companion
    </span>
  )
}

type SmartDialog = React.ComponentProps<typeof Dialog> & {
  tasks?: TaskEnpoints[]
  defaultValue?: string
  context?: string
  onSelect?: (value: string) => void
}

function SmartDialog({ defaultValue, onSelect, context, tasks }: SmartDialog) {
  const [open, setOpen] = React.useState(false)
  const [taskId, setTaskId] = React.useState<TaskEnpoints | undefined>()
  const [selectedValue, setSelectedValue] = React.useState('')
  const [text, setText] = React.useState(defaultValue || '')
  const { mutate, isLoading, data } = useXtartapp(taskId)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className="cursor-pointer p-0 h-auto w-auto min-w-2"
        >
          <SmartDialogTrigger />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            <span className="flex items-center gap-2">
              <Icons.Companion className="size-6" />
              <h6 className="text-base">AI Companion</h6>
            </span>
          </DialogTitle>
          <DialogDescription>
            <span className="text-sm text-gray-800 dark:text-gray-300">
              Jumpstart collaboration with your AI companion.
            </span>
            <br />
            <span className="text-xs text-muted-foreground">
              Ask questions, get suggestions, and receive feedback on your code.
            </span>
          </DialogDescription>
        </DialogHeader>
        <div>
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

          <div className="overflow-y-auto h-[40vh]">
            {data && !isLoading && (
              <>
                <p className="text-sm font-medium text-gray-800">
                  Result for {taskId}
                </p>
                <div className="h-px w-full bg-black/5 mb-4 mt-1" />
                <ResultSelection
                  onSelect={(value) => {
                    if (value === selectedValue) setSelectedValue('')
                    else setSelectedValue(value)
                  }}
                  results={Array.isArray(data) ? data : [data]}
                />
                <div className="h-px w-full bg-black/5 my-4" />
              </>
            )}
            {!data && !isLoading && (
              <div className="size-full flex items-center justify-center">
                <p className="text-sm w-10/12 text-center text-muted-foreground">
                  Select a task and provide your input and let your AI companion
                  make the <strong>JOB</strong> for you.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <TaskSelection
              tasks={tasks}
              onSelectionChange={(value) => {
                setTaskId(value || undefined)
              }}
            />
            {taskId ? (
              <p className="text-xs text-gray-800 dark:text-gray-300">
                {availableTasks.find((task) => task.id === taskId)?.description}
              </p>
            ) : (
              <p className="text-xs text-red-500">
                Select a task to get started.
              </p>
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
            className="max-h-24"
          />
        </div>
        <DialogFooter>
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
          {selectedValue && (
            <Button
              disabled={isLoading}
              variant={'default'}
              className="bg-green-600 hover:bg-green-700 cursor-pointer"
              onClick={() => {
                onSelect?.(selectedValue)
                setOpen(false)
                setSelectedValue('')
              }}
            >
              Accept
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { SmartDialogTrigger, SmartDialog }
