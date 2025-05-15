import * as React from 'react'
import { cn } from '~/lib/utils'

export interface LineDecoratorProps extends React.ComponentProps<'div'> {
  lineOffset?: number
  lineWidth?: number
  lineFadeStop?: number
}

export interface LineDecoratorCSSProperties extends React.CSSProperties {
  '--line-offset': string
  '--line-width': string
  '--line-color': string
  '--line-gap': string
  '--line-fade-stop': string
  '--line-background': string
}

export const HorizontalLineDecorator = React.forwardRef<
  React.ElementRef<'div'>,
  LineDecoratorProps
>(
  (
    {
      lineOffset = 0,
      lineWidth = 1,
      lineFadeStop = 93,
      style,
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      aria-hidden="true"
      style={
        {
          '--line-offset': `${lineOffset}px`,
          '--line-width': `${lineWidth}px`,
          '--line-color': 'hsl(var(--foreground))',
          '--line-gap': '0.3125rem',
          '--line-fade-stop': `${lineFadeStop}%`,
          '--line-background': 'hsl(var(--background))',
          ...style,
        } as LineDecoratorCSSProperties
      }
      // eslint-disable-next-line tailwindcss/no-contradicting-classname
      className={cn(
        // Line
        'left-[calc(var(--line-offset)/2*-1)]',
        'h-[--line-width] w-[calc(100%+var(--line-offset))]',
        'bg-[linear-gradient(to_right,var(--line-color),var(--line-color)_50%,transparent_0,transparent)]',
        'bg-[size:var(--line-gap)_var(--line-width)]',
        // Mask / Gradient
        '![mask-composite:exclude] [mask:linear-gradient(to_left,var(--line-background)_var(--line-fade-stop),transparent),linear-gradient(to_right,var(--line-background)_var(--line-fade-stop),transparent),linear-gradient(#000,#000)]',
        // Animation
        'w-0 animate-landing-horizontal-line-intro',
        className,
      )}
      {...props}
    />
  ),
)
HorizontalLineDecorator.displayName = 'HorizontalLineDecorator'

export const VerticalLineDecorator = React.forwardRef<
  React.ElementRef<'div'>,
  LineDecoratorProps
>(
  (
    {
      lineOffset = 0,
      lineWidth = 1,
      lineFadeStop = 93,
      style,
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      aria-hidden="true"
      style={
        {
          '--line-offset': `${lineOffset}px`,
          '--line-width': `${lineWidth}px`,
          '--line-color': 'hsl(var(--foreground))',
          '--line-gap': '0.3125rem',
          '--line-fade-stop': `${lineFadeStop}%`,
          '--line-background': 'hsl(var(--background))',
          ...style,
        } as LineDecoratorCSSProperties
      }
      // False positive reported by eslint. For more information, see https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/260.
      // eslint-disable-next-line tailwindcss/no-contradicting-classname
      className={cn(
        // Line
        'top-[calc(var(--line-offset)/2*-1)]',
        'h-[calc(100%+var(--line-offset))] w-[--line-width]',
        'bg-[linear-gradient(to_top,var(--line-color),var(--line-color)_50%,transparent_0,transparent)]',
        'bg-[size:var(--line-width)_var(--line-gap)]',
        // Mask / Gradient
        '![mask-composite:exclude] [mask:linear-gradient(to_left,var(--line-background)_var(--line-fade-stop),transparent),linear-gradient(to_top,var(--line-background)_var(--line-fade-stop),transparent),linear-gradient(#000,#000)]',
        // Animation
        'h-0 animate-landing-vertical-line-intro',
        className,
      )}
      {...props}
    />
  ),
)
VerticalLineDecorator.displayName = 'VerticalLineDecorator'
