import useSWR from 'swr'
import type { TaskEnpoints } from '~/registry/new-york/lib/smartui-api.utils'

interface UseXtartappOptions {
  taskId: TaskEnpoints
  input?: string
  context?: string
  enabled?: boolean
}

type ApiResponse = string | string[]

const fetcher = async (
  url: string,
  { arg }: { arg: { input: string; context?: string } },
) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  })

  if (!response.ok) throw new Error('Request failed')

  const { data } = await response.json()
  return data as ApiResponse
}

export function useXtartapp({
  taskId,
  input = '',
  context = '',
}: UseXtartappOptions) {
  const shouldFetch = input.length > 0

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? [`/api/xtartapp/${taskId}`, { input, context }] : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
