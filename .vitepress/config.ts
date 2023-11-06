import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Aeria',
  description: 'Official documentation for the Aeria Framework',
  base: '/',

  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,

  themeConfig: {
    nav: [
      {
        text: 'Guide',
        link: '/guide/getting-started',
        activeMatch: '^/guide/'
      },
      {
        text: 'Reference',
        activeMatch: '^/(aeria|aeria-ui)//',
        items: [
          { text: 'Aeria', link: '/aeria/', activeMatch: '^/aeria/' },
          { text: 'Aeria UI', link: '/aeria-ui/', activeMatch: '^/aeria-ui/' },
        ]
      },
    ],
    sidebar: {
      '/guide/': sidebarGuide(),
      '/aeria/': sidebarAeriaReference(),
      '/aeria-ui/': sidebarAeriaUiReference()
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/aeriaframework/aeria'
      }
    ]
  }
})

function sidebarGuide() {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'What is Aeria?', link: '/guide/what-is-aeria' },
        { text: 'Getting started', link: '/guide/getting-started' },
        { text: 'Deploy', link: '/guide/deploy' },
      ]
    }
  ]
}

function sidebarAeriaReference() {
  return [
    {
      text: 'Help Topics',
      link: '/aeria/help-topics/'
    },
    {
      text: 'Collection',
      items: [
        { text: 'AccessControl', link: '/aeria/access-control' },
        { text: 'Collection', link: '/aeria/collection' },
        { text: 'CollectionProperty', link: '/aeria/collection-property' },
        { text: 'Description', link: '/aeria/description' },
        { text: 'defineCollection', link: '/aeria/define-collection' },
        { text: 'defineDescription', link: '/aeria/define-description' },
        { text: 'traverseDocument', link: '/aeria/traverse-document' },
        { text: 'useFunctions', link: '/aeria/use-functions' },
      ]
    },
    {
      text: 'Validation',
      items: [
        { text: 'ValidationError', link: '/aeria/validationError' },
        { text: 'validate', link: '/aeria/validate' },
        { text: 'validateSilently', link: '/aeria/validate-silently' },
        { text: 'validator', link: '/aeria/validator' },
      ]
    },
    {
      text: 'Miscellaneous',
      items: [
        { text: 'Either', link: '/aeria/either' },
        { text: 'RouterOptions', link: '/aeria/router-options' },
        { text: 'makeRouter', link: '/aeria/make-router' }
      ]
    },
  ]
}

function sidebarAeriaUiReference() {
  return [
    {
      text: 'Help Topics',
      link: '/aeria-ui/help-topics/'
    },
    {
      text: 'Components',
      collapsed: true,
      items: [
        { text: 'aeria-bare-button', link: '/aeria-ui/components/aeria-bare-button' },
        { text: 'aeria-button', link: '/aeria-ui/components/aeria-button' },
        { text: 'aeria-card', link: '/aeria-ui/components/aeria-card' },
        { text: 'aeria-crud', link: '/aeria-ui/components/aeria-crud' },
        { text: 'aeria-grid', link: '/aeria-ui/components/aeria-grid' },
        { text: 'aeria-info', link: '/aeria-ui/components/aeria-info' },
        { text: 'aeria-main', link: '/aeria-ui/components/aeria-main' },
        { text: 'aeria-picture', link: '/aeria-ui/components/aeria-picture' },
        { text: 'aeria-table', link: '/aeria-ui/components/aeria-table' },
        { text: 'aeria-tabs', link: '/aeria-ui/components/aeria-tabs' },
      ]
    },
    {
      text: 'Stores',
      items: [
        { text: 'CollectionStore', link: '/aeria-ui/collection-store' },
        { text: 'useStore', link: '/aeria-ui/use-store' },
        { text: 'registerStore', link: '/aeria-ui/register-store' },
        { text: 'createCollectionStore', link: '/aeria-ui/create-collection-store' },
      ]
    },
    {
      text: 'Composables',
      items: [
        { text: 'useAction', link: '/aeria-ui/use-action' },
        { text: 'useBreakpoints', link: '/aeria-ui/use-breakpoints' },
        { text: 'useClipboard', link: '/aeria-ui/use-clipboard' },
        { text: 'useCondition', link: '/aeria-ui/use-condition' },
        { text: 'useDebounce', link: '/aeria-ui/use-debounce' },
        { text: 'useNavbar', link: '/aeria-ui/use-navbar' },
        { text: 'usePasswordPolicy', link: '/aeria-ui/use-password-policy' },
        { text: 'useRouter', link: '/aeria-ui/use-router' },
      ]
    },
    {
      text: 'Directives',
      collapsed: true,
      items: [
        { text: 'v-clickable', link: '/aeria-ui/v-clickable' },
        { text: 'v-focus', link: '/aeria-ui/v-focus' },
        { text: 'v-loading', link: '/aeria-ui/v-loading' },
        { text: 'v-overlay', link: '/aeria-ui/v-overlay' },
        { text: 'v-theme', link: '/aeria-ui/v-theme' },
      ]
    },
  ]
}
