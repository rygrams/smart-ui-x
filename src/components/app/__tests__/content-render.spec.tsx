import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContentRender, processText } from '../content-render'

describe('ContentRender Component', () => {
  it('should render plain text correctly', () => {
    render(<ContentRender content="Hello World" />)
    expect(screen.getByText('Hello World')).toBeDefined()
  })

  it('should render null when text is empty', () => {
    const { container } = render(<ContentRender content="" />)
    expect(container.firstChild).toBeNull()
  })

  it('should render text with bold formatting', () => {
    const { container } = render(
      <ContentRender content="This is **bold** text" />,
    )
    const strongElement = container.querySelector('strong')

    expect(strongElement).toBeDefined()
    expect(strongElement?.textContent).toBe('bold')
  })

  it('should render text with link formatting', () => {
    const { container } = render(
      <ContentRender content="This is a [link](https://example.com)" />,
    )

    const linkElement = container.querySelector('a')
    expect(linkElement).toBeDefined()
    expect(linkElement?.getAttribute('href')).toBe('https://example.com')
    expect(linkElement?.textContent).toBe('link')
  })

  it('should render text with mixed formatting', () => {
    const { container } = render(
      <ContentRender content="This is **bold** and has a [link](https://example.com)" />,
    )
    const strongElement = container.querySelector('strong')
    const linkElement = container.querySelector('a')

    expect(strongElement).toBeDefined()
    expect(strongElement?.textContent).toBe('bold')

    expect(linkElement).toBeDefined()
    expect(linkElement?.getAttribute('href')).toBe('https://example.com')
    expect(linkElement?.textContent).toBe('link')
  })
})

describe('processText Function', () => {
  it('should return null for empty text', () => {
    expect(processText('')).toBeNull()
  })

  it('should return text without any processors', () => {
    const result = processText('Simple text')
    expect(result).toEqual(['Simple text'])
  })

  it('should process text with mixed content', () => {
    const text = 'This is **bold** and has a [link](https://example.com)'
    const result = processText(text)

    expect(Array.isArray(result)).toBe(true)
    expect(result?.length).toBeGreaterThan(1)
  })
})
