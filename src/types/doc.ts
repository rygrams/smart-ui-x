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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customProps?: Record<string, any>
  content?: string
  children?: DocElement[]
}

export type TreeContent = {
  sectionId: string
  title: string
}

export type TableOfContents = Array<TreeContent>
