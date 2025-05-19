import { describe, it, expect, vi, afterEach } from 'vitest'
import { fs } from 'memfs'
import { getDoc } from '../doc'
import { Doc } from '~/types/doc'

vi.mock('node:fs')
vi.mock('node:fs/promises')

afterEach(() => {
  vi.resetAllMocks()
})

describe('getDoc function', () => {
  it('should get a single document by slug', async () => {
    const docFolder = `${process.cwd()}/src/docs`

    const mockSlug = 'test-doc'
    const mockYamlContent = 'title: Test Document\ndescription: This is a test'
    const mockParsedDoc = {
      title: 'Test Document',
      description: 'This is a test',
    } as Doc

    fs.mkdirSync(docFolder, { recursive: true })
    fs.writeFileSync(`${docFolder}/${mockSlug}.yml`, mockYamlContent)

    const result = await getDoc(mockSlug)

    expect(result).toEqual(mockParsedDoc)
  })

  it('should throw an error if the file is not found', async () => {
    await expect(getDoc('non-existent')).rejects.toThrow(/ENOENT/)
  })

  it('should throw an error if the YAML is invalid', async () => {
    const invalidYaml = 'invalid: yaml: content:'
    const docFolder = `${process.cwd()}/src/docs`
    fs.mkdirSync(docFolder, { recursive: true })
    fs.writeFileSync(`${docFolder}/invalid-yaml.yml`, invalidYaml)

    await expect(getDoc('invalid-yaml')).rejects.toThrow(
      /Nested mappings are not allowed/,
    )
  })
})
