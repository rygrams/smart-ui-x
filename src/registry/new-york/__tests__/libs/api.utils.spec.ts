/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest'
import { routesMap, getPayload, getResults } from '../../lib/api.utils'

describe('API Utils', () => {
  describe('routesMap', () => {
    it('should contain correct route for text suggestions', () => {
      expect(routesMap['suggestions']).toBe('text/suggestions')
    })

    it('should contain correct route for text correction', () => {
      expect(routesMap['correction']).toBe('text/correction')
    })

    it('should contain correct route for text normalization', () => {
      expect(routesMap['normalization']).toBe('text/normalization')
    })
  })

  describe('getPayload', () => {
    it('should return correct payload function for text suggestions', () => {
      const textSuggestionsPayload = getPayload('suggestions')
      const payload = textSuggestionsPayload('Hello world', 'Test context')

      expect(payload).toEqual({
        text: 'Hello world',
        context: 'Test context',
        language: 'auto',
      })
    })

    it('should return correct payload function for text correction', () => {
      const textCorrectionPayload = getPayload('correction')
      const payload = textCorrectionPayload('Hello world', '')

      expect(payload).toEqual({
        text: 'Hello world',
        language: 'auto',
      })
    })
  })

  describe('getResults', () => {
    it('should return suggestions array for text suggestions response', () => {
      const mockResponse = {
        data: {
          suggestions: [
            { suggestion: 'Hello', score: 0.9 },
            { suggestion: 'Hi', score: 0.8 },
          ],
        },
      }

      const resultFunction = getResults('suggestions')
      const results = resultFunction(mockResponse as any)

      expect(results).toEqual(['Hello', 'Hi'])
    })

    it('should return empty array for text suggestions with no data', () => {
      const mockResponse = {
        data: {
          suggestions: [],
        },
      }

      const resultFunction = getResults('suggestions')
      const results = resultFunction(mockResponse as any)

      expect(results).toEqual([])
    })

    it('should return corrected text for text correction response', () => {
      const mockResponse = {
        data: {
          originalText: 'Hello wrld',
          correctedText: 'Hello world',
        },
      }

      const resultFunction = getResults('correction')
      const result = resultFunction(mockResponse as any)

      expect(result).toBe('Hello world')
    })

    it('should return empty string for text correction with no data', () => {
      const mockResponse = {
        data: {
          originalText: '',
          correctedText: '',
        },
      }

      const resultFunction = getResults('correction')
      const result = resultFunction(mockResponse as any)

      expect(result).toBe('')
    })
  })
})
