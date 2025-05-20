import * as React from 'react'

import { DocElement, Doc } from '~/types/doc'
import { docsYamlComponents } from './docs-yaml-components'
import { cn } from '~/lib/utils'
import { ContentRender } from './content-render'

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
  if (!Component) return null

  const key = component.id || component.type
  const props = {
    id: component.id,
    ...component.customProps,
    className: component.className,
  }

  return (
    <Component key={key} {...props}>
      {component.content ? (
        <ContentRender content={component.content} />
      ) : (
        component.children?.map((child, i) => (
          <React.Fragment key={child.id || `${component.type}-${i}`}>
            {componentsRenderer(child)}
          </React.Fragment>
        ))
      )}
    </Component>
  )
}
