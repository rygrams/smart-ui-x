'use client'

import { usePathname } from 'next/navigation'
import { cn } from '~/lib/utils'

export function AppMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <main
      className={cn(
        'flex-1',
        pathname === '/' && 'flex items-center justify-center overflow-hidden',
      )}
    >
      {children}
    </main>
  )
}
