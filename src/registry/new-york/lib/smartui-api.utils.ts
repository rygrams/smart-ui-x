/* eslint-disable @typescript-eslint/no-explicit-any */
export type TaskEnpoints =
  | 'suggestions'
  | 'correction'
  | 'normalization'
  | 'prompt'
  | 'explanation'
  | 'translation'

/*  API ENDPOINTS UTILS   */
export const routesMap = {
  suggestions: 'text/suggestions',
  correction: 'text/correction',
  normalization: 'text/normalization',
  prompt: 'text/prompt',
  explanation: 'text/explanation',
  translation: 'text/translation',
}

export const getPayload = (task: TaskEnpoints) =>
  ({
    suggestions: (text: string, context: string) => ({
      text,
      intent: context,
      language: 'auto',
      limit: 5,
    }),
    correction: (text: string) => ({
      text,
      language: 'auto',
    }),
    normalization: (text: string) => ({
      text,
      language: 'auto',
    }),
    prompt: (text: string) => ({
      text,
      language: 'auto',
    }),
    explanation: (text: string) => ({
      text,
      complexity: 'intermediate',
      language: 'auto',
    }),
    translation: (text: string, context: string) => ({
      text,
      intent: context,
      language: 'auto',
    }),
  })[task]

export const getResults = (task: TaskEnpoints) => {
  return {
    suggestions: ({ data }: ApiResponse) => {
      return (
        data?.suggestions.map((item: any) => item.suggestion).slice(1, 5) || []
      )
    },
    correction: ({ data }: ApiResponse) => {
      return [data?.correctedText || '']
    },
    normalization: ({ data }: ApiResponse) => {
      return [data?.normalizedText || '']
    },
    prompt: ({ data }: ApiResponse) => {
      return [data?.response || '']
    },
    explanation: ({ data }: ApiResponse) => {
      return data?.explanations || []
    },
    translation: ({ data }: ApiResponse) => {
      return [data?.translatedText || '']
    },
  }[task]
}

type ApiResponse = {
  data: any
}
