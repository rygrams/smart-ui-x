export default function HomePage() {
  return (
    <div className="container">
      <div className="py-6 lg:py-8">
        <div className="flex items-center justify-center py-6 md:hidden">
          <Announcement />
        </div>
        {/* <div className="flex items-center justify-center">
          <div className="relative hidden min-w-[28rem] items-center justify-center p-8 md:flex">
            <VerticalLineDecorator
              lineFadeStop={50}
              className="absolute left-0 [animation-duration:0.5s]"
            />
            <Announcement />
            <VerticalLineDecorator
              lineFadeStop={50}
              className="absolute right-0 [animation-duration:0.5s]"
            />
          </div>
        </div> */}
        {/* <section className="relative text-center">
          <HorizontalLineDecorator
            lineOffset={150}
            className="absolute -top-px"
          />
          <CircleDecorator className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 delay-500" />
          <VerticalLineDecorator
            lineOffset={150}
            className="absolute -left-px"
          />
          <div className="relative z-10 flex items-center justify-center bg-background p-8">
            <h1 className="text-balance bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-4xl font-bold leading-tight tracking-tighter text-transparent sm:text-5xl md:text-7xl lg:leading-[1.1]">
              Supercharge your component library
            </h1>
            <HorizontalLineDecorator
              lineOffset={150}
              className="absolute bottom-0 delay-100"
            />
          </div>
          <div className="relative z-10 flex items-center justify-center bg-background p-8">
            <p className="max-w-screen-md text-balance text-sm font-light text-muted-foreground md:text-lg">
              <span className="font-medium text-foreground">Additional</span>{' '}
              beautifully designed components that you can copy and paste into
              your apps. Accessible. Customizable. Open Source.
            </p>
            <HorizontalLineDecorator
              lineOffset={150}
              className="absolute bottom-0 delay-150"
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="relative flex flex-wrap items-center justify-center gap-4 p-8">
              <VerticalLineDecorator
                lineOffset={150}
                className="absolute left-0 hidden delay-300 [animation-duration:0.5s] md:block"
              />
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/docs">Get Started</Link>
              </Button>
              <StarGitHubButton
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              />
              <VerticalLineDecorator
                lineOffset={150}
                className="absolute right-0 hidden delay-300 [animation-duration:0.5s] md:block"
              />
            </div>
          </div>
          <HorizontalLineDecorator
            lineOffset={150}
            className="absolute bottom-0 delay-200"
          />
          <VerticalLineDecorator
            lineOffset={150}
            className="absolute -right-px"
          />
        </section> */}
      </div>
    </div>
  )
}
