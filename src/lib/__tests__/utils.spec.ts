import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { cn, formatDate, absoluteUrl } from '../utils'

describe('cn function', () => {
  it('should merge class names correctly', () => {
    expect(cn('text-red-500', 'bg-blue-200')).toBe('text-red-500 bg-blue-200')
  })

  it('should handle conditionals correctly', () => {
    expect(cn('base', { 'text-red-500': true, 'bg-blue-200': false })).toBe(
      'base text-red-500',
    )
  })

  it('should handle arrays', () => {
    expect(cn('base', ['text-red-500', 'bg-blue-200'])).toBe(
      'base text-red-500 bg-blue-200',
    )
  })

  it('should properly merge tailwind classes', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })

  it('should handle empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
    expect(cn('', '')).toBe('')
  })

  it('should handle undefined and null values', () => {
    expect(cn('base', undefined, null, 'text-red-500')).toBe(
      'base text-red-500',
    )
  })
})

describe('formatDate function', () => {
  it('should format date strings correctly', () => {
    expect(formatDate('2023-01-15')).toBe('January 15, 2023')
  })

  it('should format timestamps correctly', () => {
    expect(formatDate(1673740800000)).toBe('January 15, 2023')
  })

  it('should handle different date formats', () => {
    expect(formatDate('01/15/2023')).toBe('January 15, 2023')
  })

  it('should handle ISO strings', () => {
    expect(formatDate('2023-01-15T12:00:00Z')).toBe('January 15, 2023')
  })
})

describe('absoluteUrl function', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    vi.stubEnv('NEXT_PUBLIC_APP_URL', 'https://example.com')
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('should prepend the app URL to the path', () => {
    expect(absoluteUrl('/blog')).toBe('https://example.com/blog')
  })

  it('should handle empty path', () => {
    expect(absoluteUrl('')).toBe('https://example.com')
  })

  it('should handle undefined app URL', () => {
    process.env.NEXT_PUBLIC_APP_URL = undefined
    expect(absoluteUrl('/blog')).toBe('undefined/blog')
  })
})
