'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/registry/new-york/ui/dialog'
import { Button } from '@/registry/new-york/ui/button'
import { Icons } from '@/registry/new-york/blocks/smart-icons'
import React from 'react'
import { ListPlusIcon, SpellCheck2Icon } from 'lucide-react'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/registry/new-york/ui/toggle-group'
import clsx from 'clsx'

export function DefaultTrigger() {
  return (
    <span className="flex items-center gap-1 text-xs text-purple-950">
      <Icons.Companion className="size-4 " />
      AI companion
    </span>
  )
}

export function SmartDialog({ trigger }: { trigger?: React.ReactNode }) {
  const [title, _] = React.useState('AI Companion')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className="cursor-pointer p-0 h-auto w-auto min-w-2"
        >
          {trigger ?? <DefaultTrigger />}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            <span className="flex items-center gap-2">
              <Icons.Companion className="size-5 text-cyan-600" />
              <h6 className="text-base">
                <base href="" />
                {title}
              </h6>
            </span>
          </DialogTitle>
          <DialogDescription>
            <div>
              <p className="text-sm text-gray-800">
                Jumpstart collaboration with your AI companion.
              </p>

              <p className="text-xs text-muted-foreground">
                Ask questions, get suggestions, and receive feedback on your
                code.
              </p>
            </div>
            <TaskSelection />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

SmartDialog.displayName = 'SmartDialog'

export function TaskSelection() {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      className="flex gap-2 mt-6 shadow-none data-[variant=outline]:shadow-none"
      size={'sm'}
    >
      {tasks.map((task) => (
        <ToggleGroupItem
          key={task.id}
          value={task.title}
          className={clsx([
            'data-[variant=outline]:border-l-0.5 data-[variant=outline]:first:border',
            'data-[state=on]:bg-purple-100 data-[state=on]:text-purple-900',
            'px-3  first:rounded-l last:rounded-r rounded',
          ])}
        >
          {task.icon} {task.title}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

const tasks = [
  {
    id: 'suggestions',
    title: 'suggest',
    icon: <ListPlusIcon />,
  },
  {
    id: 'correction',
    title: 'correct',
    icon: <SpellCheck2Icon />,
  },
]
