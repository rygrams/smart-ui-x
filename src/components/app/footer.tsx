import { appConfig } from '~/configs'

export function AppFooter() {
  return (
    <footer className="border-grid border-t py-6 md:px-8 md:py-0">
      <div className="container-wrapper">
        <div className="container py-4">
          <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{' '}
            <a
              href={appConfig.links.githubProfile}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              junwen-k
            </a>{' '}
            based on{' '}
            <a
              href={appConfig.links.githubShadcnUi}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn-ui
            </a>
            . The source code is available on{' '}
            <a
              href={appConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  )
}
