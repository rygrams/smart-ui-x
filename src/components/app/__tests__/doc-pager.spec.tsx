import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DocPager } from '../doc-pager'
import { Doc } from '~/types/doc'

const metaMock = {
  id: '',
  title: '',
  description: '',
  tableOfContents: [],
}

describe('DocPager', () => {
  it('should return null when doc is undefined', () => {
    const { container } = render(<DocPager />)
    expect(container.firstChild).toBeNull()
  })

  it('should return null when doc.components is undefined', () => {
    const doc = {} as Doc
    const { container } = render(<DocPager doc={doc} />)
    expect(container.firstChild).toBeNull()
  })

  it('should render components with className', () => {
    const doc: Doc = {
      components: [
        { type: 'h1', content: 'Test Heading' },
        { type: 'p', content: 'Test Paragraph' },
      ],
      ...metaMock,
    }

    const className = 'test-class'

    const { container } = render(<DocPager doc={doc} className={className} />)

    const h1Selector = container.querySelector('h1')
    const pSelector = container.querySelector('p')

    expect(h1Selector).toBeDefined()
    expect(pSelector).toBeDefined()

    expect(h1Selector?.textContent).toBe('Test Heading')
    expect(pSelector?.textContent).toBe('Test Paragraph')
  })

  it('should render nested components', () => {
    const doc: Doc = {
      components: [
        {
          type: 'div',
          children: [
            {
              type: 'h1',
              content: 'Nested Heading',
            },
            {
              type: 'p',
              content: 'Nested Paragraph',
            },
          ],
        },
      ],
      ...metaMock,
    }

    render(<DocPager doc={doc} />)

    expect(screen.getByText('Nested Heading')).toBeDefined()
    expect(screen.getByText('Nested Paragraph')).toBeDefined()
  })

  it('should render components with custom props', () => {
    const doc: Doc = {
      components: [
        {
          type: 'div',
          id: 'test-id',
          className: 'custom-class',
          customProps: {
            'data-testid': 'custom-div',
          },
        },
      ],
      ...metaMock,
    }

    const { container } = render(<DocPager doc={doc} />)

    const divSelector = container.querySelector('.custom-class')

    expect(divSelector).toBeDefined()
    expect(divSelector?.getAttribute('data-testid')).toBe('custom-div')
    expect(divSelector?.getAttribute('id')).toBe('test-id')
  })
})
