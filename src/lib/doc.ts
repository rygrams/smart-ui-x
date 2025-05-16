import { promises as fs } from 'fs'
import { Doc } from '~/types/doc'
import yaml from 'yaml'

export async function getDoc(slug: string) {
  const filePath = `${process.cwd()}/src/docs/${slug}.yml`
  const file = await fs.readFile(filePath, 'utf8')
  const data = yaml.parse(file)

  return data as Doc
}

export async function getAllDocs() {
  const files = await fs.readdir(`${process.cwd()}/src/docs`)
  const docs = await Promise.all(
    files.map(async (file) => {
      const filePath = `${process.cwd()}/src/docs/${file}`
      const fileContent = await fs.readFile(filePath, 'utf8')
      const data = yaml.parse(fileContent)
      return data as Doc
    }),
  )

  return docs
}

export function getTableOfContents(doc: Doc) {
  const toc = doc.tableOfContents
  return toc
}
