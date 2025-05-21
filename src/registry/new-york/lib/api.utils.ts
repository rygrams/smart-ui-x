export type TaskEnpoints = 'text-suggestions' | 'text-correction'

/*  API ENDPOINTS UTILS   */
export const routesMap = {
  'text-suggestions': 'text/suggestions',
  'text-correction': 'text/correction',
}

export const getPayload = (task: TaskEnpoints) =>
  ({
    'text-suggestions': (text: string, context: string) => ({
      text,
      context,
      language: 'auto',
    }),
    'text-correction': (text: string) => ({
      text,
      language: 'auto',
    }),
  })[task]

export const getResults = (task: TaskEnpoints) => {
  return {
    'text-suggestions': (response: SuggestionResponse) => {
      return response.data?.suggestions.map((item) => item.suggestion) || []
    },
    'text-correction': (response: CorrectionResponse) => {
      return response.data?.correctedText || ''
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
