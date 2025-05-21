export type TaskEnpoints = 'suggestions' | 'correction' | 'normalization'

/*  API ENDPOINTS UTILS   */
export const routesMap = {
  suggestions: 'text/suggestions',
  correction: 'text/correction',
  normalization: 'text/normalization',
}

export const getPayload = (task: TaskEnpoints) =>
  ({
    suggestions: (text: string, context: string) => ({
      text,
      context,
      language: 'auto',
    }),
    correction: (text: string) => ({
      text,
      language: 'auto',
    }),
    normalization: (text: string) => ({
      text,
      context: 'auto',
      language: 'auto',
    }),
  })[task]

export const getResults = (task: TaskEnpoints) => {
  return {
    suggestions: (response: SuggestionResponse) => {
      return response.data?.suggestions.map((item) => item.suggestion) || []
    },
    correction: (response: CorrectionResponse) => {
      return response.data?.correctedText || ''
    },
    normalization: (response: NormalizationResponse) => {
      return response.data?.normalizedText || ''
    },
  }[task]
}

/*   TYPES   */
type SuggestionResponse = {
  data: {
    suggestions: {
      suggestion: string
      score: number
    }[]
  }
}

type CorrectionResponse = {
  data: {
    originalText: string
    correctedText: string
  }
}

type NormalizationResponse = {
  data: {
    normalizedText: string
  }
}
