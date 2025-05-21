import { readFile, writeFile, readdir } from 'fs/promises'
import { join } from 'path'

async function cleanRegistryDeps() {
  try {
    console.log('Cleaning registry dependencies...')

    const publicPath = `${process.cwd()}/public/r`
    const files = await readdir(publicPath)

    for (const file of files) {
      if (!file.endsWith('.json')) continue

      const filePath = join(publicPath, file)
      const content = await readFile(filePath, 'utf-8')
      const json = JSON.parse(content)

      if (json.dependencies && Array.isArray(json.dependencies)) {
        json.dependencies = json.dependencies.filter(
          (dep) => dep !== '@/registry',
        )
      }

      if (
        json.registryDependencies &&
        Array.isArray(json.registryDependencies)
      ) {
        json.registryDependencies = json.registryDependencies.filter(
          (dep) => dep !== '@/registry',
        )
      }

      await writeFile(filePath, JSON.stringify(json, null, 3), 'utf-8')

      console.log(`Cleaned registry dependencies in ${file}`)
    }
  } catch (error) {
    console.error('Error cleaning registry dependencies:', error)
    process.exit(1)
  }
}

cleanRegistryDeps()
