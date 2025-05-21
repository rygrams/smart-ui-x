import {
  getPayload,
  getResults,
  routesMap,
  TaskEnpoints,
} from '@/registry/new-york/lib/smartui-api.utils'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ taskId: TaskEnpoints }> },
) {
  const taskId = (await params).taskId
  const body = await req.json()
  const payload = getPayload(taskId)(body.input, body.context)

  const res = await fetch(`https://api.xtartapp.com/${routesMap[taskId]}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.XTARTAPP_API_KEY || ''}`,
    },
    body: JSON.stringify(payload),
  })
  const data = await res.json()

  return Response.json({ data: getResults(taskId)(data) })
}
