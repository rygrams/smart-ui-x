import React from 'react'
import { cn } from '~/lib/utils'

function createBoldElement(match: RegExpExecArray) {
  const [_, boldText] = match
  const matchIndex = match.index

  return (
    <strong key={matchIndex} className="font-bold">
      {boldText}
    </strong>
  )
}

function createLinkElement(match: RegExpExecArray) {
  const [_, linkText, linkUrl] = match

  return (
    <a
      key={linkUrl}
      href={linkUrl}
      className={cn('font-medium underline underline-offset-4')}
    >
      {linkText}
    </a>
  )
}

const linkContentProcessor = {
  regex: /\[([^\]]+)\]\(([^)]+)\)/g,
  createElement: createLinkElement,
}

const boldContentProcessor = {
  regex: /\*\*([^\*]+)\*\*/g,
  createElement: createBoldElement,
}

const contentProcessors = [boldContentProcessor, linkContentProcessor]

export function processText(text: string) {
  if (!text) return null

  const segments: React.ReactNode[] = []

  let lastIndex = 0

  const allMatches = getAllMatches(text)
  allMatches.sort((a, b) => a.match.index - b.match.index)

  allMatches.forEach(({ match, processor }) => {
    if (match.index > lastIndex)
      segments.push(text.substring(lastIndex, match.index))

    segments.push(processor.createElement(match))
    lastIndex = match.index + match[0].length
  })

  if (lastIndex < text.length) segments.push(text.substring(lastIndex))

  return segments
}

export function ContentRender({ content }: { content: string }) {
  return <>{processText(content)}</>
}

function getAllMatches(text: string) {
  const allMatches: {
    match: RegExpExecArray
    processor: typeof boldContentProcessor | typeof linkContentProcessor
  }[] = []

  contentProcessors.forEach((processor) => {
    let match: RegExpExecArray | null
    const regex = new RegExp(processor.regex)

    while ((match = regex.exec(text)) !== null) {
      allMatches.push({ match, processor })
    }
  })

  return allMatches
}
