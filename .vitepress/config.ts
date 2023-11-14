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
    outline: [2, 3],
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
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Capsul'
    }
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
        { text: 'defineCollection()', link: '/aeria/define-collection' },
        { text: 'defineDescription()', link: '/aeria/define-description' },
        { text: 'traverseDocument()', link: '/aeria/traverse-document' },
        { text: 'useFunctions()', link: '/aeria/use-functions' },
      ]
    },
    {
      text: 'Validation',
      items: [
        { text: 'ValidationError', link: '/aeria/validationError' },
        { text: 'validate()', link: '/aeria/validate' },
        { text: 'validateSilently()', link: '/aeria/validate-silently' },
        { text: 'validator()', link: '/aeria/validator' },
      ]
    },
    {
      text: 'Built-ins',
      items: [
        {
          text: 'Functions',
          collapsed: true,
          items: [
            { text: 'count', link: '/aeria/count' },
            { text: 'get', link: '/aeria/get' },
            { text: 'getAll', link: '/aeria/get-all' },
            { text: 'insert', link: '/aeria/insert' },
            { text: 'remove', link: '/aeria/remove' },
          ]
        }
      ]
    },
    {
      text: 'Miscellaneous',
      items: [
        { text: 'Either', link: '/aeria/either' },
        { text: 'RouterOptions', link: '/aeria/router-options' },
        { text: 'makeRouter()', link: '/aeria/make-router' }
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
      text: 'Stores',
      items: [
        { text: 'CollectionStore', link: '/aeria-ui/collection-store' },
        { text: 'useStore()', link: '/aeria-ui/use-store' },
        { text: 'registerStore()', link: '/aeria-ui/register-store' },
        { text: 'createCollectionStore()', link: '/aeria-ui/create-collection-store' },
      ]
    },
    {
      text: 'Built-ins',
      items: [
        { text: 'Directives', link: '/aeria-ui/directives' },
        { text: 'Composables', link: '/aeria-ui/composables' },
      ]
    },
    {
      text: 'Components',
      items: [
        { text: 'aeria-accordion', link: '/aeria-ui/components/aeria-accordion' },
        { text: 'aeria-bare-button', link: '/aeria-ui/components/aeria-bare-button' },
        { text: 'aeria-box', link: '/aeria-ui/components/aeria-box' },
        { text: 'aeria-button', link: '/aeria-ui/components/aeria-button' },
        { text: 'aeria-card', link: '/aeria-ui/components/aeria-card' },
        { text: 'aeria-checkbox', link: '/aeria-ui/components/aeria-checkbox' },
        { text: 'aeria-crud', link: '/aeria-ui/components/aeria-crud' },
        { text: 'aeria-file', link: '/aeria-ui/components/aeria-file' },
        { text: 'aeria-form', link: '/aeria-ui/components/aeria-form' },
        { text: 'aeria-grid', link: '/aeria-ui/components/aeria-grid' },
        { text: 'aeria-info', link: '/aeria-ui/components/aeria-info' },
        { text: 'aeria-input', link: '/aeria-ui/components/aeria-input' },
        { text: 'aeria-main', link: '/aeria-ui/components/aeria-main' },
        { text: 'aeria-options', link: '/aeria-ui/components/aeria-options' },
        { text: 'aeria-picture', link: '/aeria-ui/components/aeria-picture' },
        { text: 'aeria-search', link: '/aeria-ui/components/aeria-search' },
        { text: 'aeria-select', link: '/aeria-ui/components/aeria-select' },
        { text: 'aeria-switch', link: '/aeria-ui/components/aeria-switch' },
        { text: 'aeria-table', link: '/aeria-ui/components/aeria-table' },
        { text: 'aeria-tabs', link: '/aeria-ui/components/aeria-tabs' },
      ]
    },
  ]
}
