export const appConfig = {
  name: 'Smart/UI',
  url: '',
  ogImage: '',
  description: '',
  links: {
    github: '',
    githubProfile: '',
    githubShadcnUi: '',
  },
} as const

export type AppConfig = typeof appConfig

export const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b',
}
