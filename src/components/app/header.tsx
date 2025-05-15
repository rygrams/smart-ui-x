import Link from 'next/link'
import { Button } from '../ui/button'
import { CommandMenu } from './command-menu'
import { appConfig } from '~/configs'
import { Icons } from './icons'
import { ModeSwitcher } from './mode-switcher'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'

export function AppHeader() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border/80 dark:border-border border-dashed">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <nav className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon" className="size-8 px-0">
                <Link
                  href={appConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icons.gitHub className="size-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <ModeSwitcher />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
