import * as React from 'react'

import { DocElement, Doc } from '~/types/doc'
import { ContentFormatter, docsYamlComponents } from './docs-yaml-components'
import { cn } from '~/lib/utils'

interface DocPagerProps {
  doc?: Doc
  className?: string
}

export function DocPager({
  doc,
  className,
}: DocPagerProps): React.ReactElement | null {
  if (!doc || !doc.components) {
    return null
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {doc.components.map((component, index) => (
        <div key={index}>{componentsRenderer(component)}</div>
      ))}
    </div>
  )
}

export function componentsRenderer(component: DocElement): React.ReactNode {
  const Component = docsYamlComponents[component.type]

  if (!Component) {
    return null
  }

  if (component.content) {
    return (
      <Component
        key={component.id || component.type}
        id={component.id}
        {...component.customProps}
        className={component.className}
      >
        <ContentFormatter>{component.content}</ContentFormatter>
      </Component>
    )
  }

  if (component.children && Array.isArray(component.children)) {
    return (
      <Component
        key={component.id || component.type}
        id={component.id}
        {...component.customProps}
        className={component.className}
      >
        {component.children.map((child, index) => (
          <React.Fragment key={child.id || `${component.type}-child-${index}`}>
            {componentsRenderer(child)}
          </React.Fragment>
        ))}
      </Component>
    )
  }

  return (
    <Component
      id={component.id}
      key={component.id || component.type}
      {...component.customProps}
      className={component.className}
    />
  )
}
