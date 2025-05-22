import { cn } from './utils'

type VerticalPosition = 'top' | 'middle' | 'bottom'
type HorizontalPosition = 'start' | 'center' | 'end'

export type TriggerPosition = {
  vertical: VerticalPosition
  horizontal: HorizontalPosition
}

export function getPositionClasses(
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
