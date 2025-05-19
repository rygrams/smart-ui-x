export type Doc = {
  id: string
  title: string
  description: string
  components: DocElement[]
  tableOfContents: TreeContent[]
  next?: DocSwitch
  previous?: DocSwitch
}

export type DocSwitch = {
  id: string
  title: string
  description: string
}

export type DocElement = {
  id?: string
  type: string
  className?: string
  customProps?: Record<string, number | string | boolean>
  content?: string
  children?: DocElement[]
}

export type TreeContent = {
  sectionId: string
  title: string
}

export type TableOfContents = Array<TreeContent>
