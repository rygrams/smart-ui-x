import Link from 'next/link'
import { cn } from '~/lib/utils'
import { registryDemoComponents } from '~/registry/registry-demo'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const docsYamlComponents: Record<string, React.ComponentType<any>> = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'font-heading mt-2 scroll-m-20 text-4xl font-bold',
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn('font-medium underline underline-offset-4', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic', className)}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md', className)} alt={alt} {...props} />
  ),
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className={cn('my-4 w-full', className)} {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table
        className={cn(
          'relative w-full overflow-hidden border-none text-sm',
          className,
        )}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn('last:border-b-none m-0 border-b', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn('font-medium underline underline-offset-4', className)}
      {...props}
    />
  ),
  LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        'flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10',
        className,
      )}
      {...props}
    />
  ),
  section: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <section
      className={cn(
        'relative z-10 flex flex-col items-start justify-start bg-background',
        className,
      )}
      {...props}
    />
  ),
  div: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn(
        'relative z-10 flex items-center justify-center bg-background',
        className,
      )}
      {...props}
    />
  ),
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  ...registryDemoComponents,
}

const processLink = (
  text: string,
  props: React.HTMLAttributes<HTMLElement>,
) => {
  if (!text) return text

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g

  if (linkRegex.test(text)) {
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    let match

    linkRegex.lastIndex = 0

    while ((match = linkRegex.exec(text)) !== null) {
      const [fullMatch, linkText, linkUrl] = match
      const matchIndex = match.index

      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex))
      }

      parts.push(
        <a
          key={linkUrl}
          href={linkUrl}
          className={cn('font-medium underline underline-offset-4')}
          {...props}
        >
          {linkText}
        </a>,
      )

      lastIndex = matchIndex + fullMatch.length
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return <>{parts}</>
  }

  return text
}

const processBoldText = (text: string) => {
  if (!text) return text

  const boldRegex = /\*\*([^*]+)\*\*/g

  if (boldRegex.test(text)) {
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    let match

    boldRegex.lastIndex = 0

    while ((match = boldRegex.exec(text)) !== null) {
      const [fullMatch, boldText] = match
      const matchIndex = match.index

      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex))
      }

      parts.push(
        <strong key={matchIndex} className="font-bold">
          {boldText}
        </strong>,
      )

      lastIndex = matchIndex + fullMatch.length
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return <>{parts}</>
  }

  return text
}

export function ContentFormatter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  if (typeof children === 'string') {
    const processedLinks = processLink(children, props)
    const processedText =
      typeof processedLinks === 'string'
        ? processBoldText(processedLinks)
        : processedLinks

    return (
      <span className={className} {...props}>
        {processedText}
      </span>
    )
  }

  return (
    <span className={className} {...props}>
      {children}
    </span>
  )
}
