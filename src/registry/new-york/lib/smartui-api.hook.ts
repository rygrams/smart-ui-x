import useSWRMutation from 'swr/mutation'
import type { TaskEnpoints } from '@/registry/new-york/lib/smartui-api.utils'

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

export function useXtartapp(taskId: TaskEnpoints | undefined) {
  const { data, error, isMutating, trigger } = useSWRMutation(
    `/api/xtartapp/${taskId}`,
    fetcher,
  )

  return {
    data,
    error,
    isLoading: isMutating,
    mutate: trigger,
  }
}
