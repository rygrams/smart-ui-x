export const appConfig = {
  name: 'Smart/UI',
  url: 'https://smart-ui-x.vercel.app/',
  ogImage: '',
  description:
    'Supercharge your component with AI - A beautifully designed component library enhanced with artificial intelligence capabilities. Accessible. Customizable. Open Source.',
  links: {
    github: 'https://github.com/rygrams/smart-ui-x',
    githubProfile: 'https://github.com/rygrams',
    githubShadcnUi: 'https://github.com/shadcn-ui/ui',
    linkedIn: 'https://www.linkedin.com/in/ladji-bamory-gramboute/',
  },
} as const

export type AppConfig = typeof appConfig

export const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b',
}
