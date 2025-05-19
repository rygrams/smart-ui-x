import { promises as fs } from 'node:fs'
import { Doc } from '~/types/doc'
import yaml from 'yaml'

export async function getDoc(slug: string) {
  const filePath = `${process.cwd()}/src/docs/${slug}.yml`
  const file = await fs.readFile(filePath, 'utf8')
  const data = yaml.parse(file)

  return data as Doc
}
