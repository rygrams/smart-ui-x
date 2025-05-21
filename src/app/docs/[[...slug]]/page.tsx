import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ChevronRight } from 'lucide-react'
import Balancer from 'react-wrap-balancer'
import { absoluteUrl, cn } from '~/lib/utils'
import { getDoc } from '~/lib/doc'
import { appConfig } from '~/configs'
import { DocPager } from '~/components/app/doc-pager'
import { TableOfContentsNav } from '~/components/app/table-of-content'
import { Doc } from '~/types/doc'

interface DocPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params })

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: 'article',
      url: absoluteUrl(doc.id.replace('.', '/')),
      images: [
        {
          url: appConfig.ogImage,
          width: 1200,
          height: 630,
          alt: appConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description: doc.description,
      images: [appConfig.ogImage],
      creator: '@shadcn',
    },
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params })

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0 max-w-2xl">
        <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
          <div className="truncate">Docs</div>
          <ChevronRight className="size-3.5" />
          <div className="text-foreground">{doc.title}</div>
        </div>
        <div className="space-y-2 mt-8">
          <h1 className={cn('scroll-m-20 text-3xl font-bold tracking-tight')}>
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-base text-muted-foreground">
              <Balancer>{doc.description}</Balancer>
            </p>
          )}
        </div>
        <DocPager doc={doc} className="mt-4" />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] pt-4">
          <div className="no-scrollbar h-full overflow-auto pb-10">
            {doc.tableOfContents && (
              <TableOfContentsNav toc={doc.tableOfContents} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

async function getDocFromParams({ params }: DocPageProps) {
  const { slug } = await params
  let doc: Doc | null = null

  if (!slug) doc = await getDoc('introduction')
  else doc = await getDoc(slug.join('/'))

  if (slug && slug.length !== 0 && !doc) notFound()

  return doc
}
