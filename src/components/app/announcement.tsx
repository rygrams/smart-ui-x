import Link from 'next/link'
import { ChevronRight, Dot, Sparkles } from 'lucide-react'
import { cn } from '~/lib/utils'
import { badgeVariants } from '../ui/badge'

export function Announcement() {
  return (
    <Link
      href="/docs/components/virtualizer"
      className={cn(badgeVariants({ variant: 'outline' }), 'group')}
    >
      <Sparkles className="mr-2 size-3 fill-yellow-500 text-yellow-500" />
      <span className="font-medium">AI powered components</span>
      <Dot className="mx-1 hidden size-4 text-muted-foreground sm:inline" />
      <span className="hidden text-muted-foreground sm:inline">Learn more</span>
      <ChevronRight className="ml-1 size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5" />
    </Link>
  )
}
