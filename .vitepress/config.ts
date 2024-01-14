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
    logo: '/assets/logo.png',
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
          { text: 'Aeria SDK', link: '/aeria-sdk/', activeMatch: '^/aeria-sdk/' },
          { text: 'Aeria Lang', link: '/aeria-lang/', activeMatch: '^/aeria-lang/' },
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
        { text: 'Why choose Aeria over another options?', link: '/guide/why-choose-aeria-over-another-options' },
        { text: 'Getting started', link: '/guide/getting-started' },
        { text: 'Deploy', link: '/guide/deploy' },
      ]
    }
  ]
}

function sidebarAeriaReference() {
  return [
    {
      text: 'Getting started',
      items: [
        { text: 'Glossary', link: '/aeria/glossary' },
        { text: 'Cheatsheet', link: '/aeria/cheatsheet/' },
      ]
    },
    {
      text: 'Collection',
      items: [
        {
          text: 'Collection',
          link: '/aeria/collection',
          items: [
            { text: 'Access Control', link: '/aeria/access-control' },
          ]
        },
        {
          text: 'Description',
          link: '/aeria/description',
          items: [
            { text: 'Property', link: '/aeria/property' },
            { text: 'Validation', link: '/aeria/validation' },
          ]
        },
      ]
    },
    {
      text: 'General',
      items: [
        {
          text: 'Routing',
          link: '/aeria/routing',
          items: [
            { text: 'Contracts', link: '/aeria/contracts' }
          ]
        },
        // { text: 'validate()', link: '/aeria/validate' },
        // { text: 'validateSilently()', link: '/aeria/validate-silently' },
        // { text: 'validator()', link: '/aeria/validator' },
      ]
    },
    {
      text: 'Built-ins',
      items: [
        {
          text: 'Collections',
          collapsed: true,
          items: [
            { text: 'User', link: '/aeria/user' },
            { text: 'File', link: '/aeria/file' },
            { text: 'ResourceUsage', link: '/aeria/resourceUsage' },
            { text: 'Log', link: '/aeria/log' },
            { text: 'ApiKey', link: '/aeria/apiKey' },
          ]
        },
        {
          text: 'Functions',
          collapsed: true,
          items: [
            { text: 'count()', link: '/aeria/count' },
            { text: 'get()', link: '/aeria/get' },
            { text: 'getAll()', link: '/aeria/get-all' },
            { text: 'insert()', link: '/aeria/insert' },
            { text: 'remove()', link: '/aeria/remove' },
          ]
        }
      ]
    },
    {
      text: 'Advanced API',
      items: [
        { text: 'Either', link: '/aeria/either' },
        { text: 'Condition', link: '/aeria/condition' },
        { text: 'traverseDocument()', link: '/aeria/traverse-document' },
      ]
    },
  ]
}

function sidebarAeriaUiReference() {
  return [
    {
      text: 'Cheatsheet',
      link: '/aeria-ui/cheatsheet/'
    },
    {
      text: 'Configuration',
      items: [
        { text: 'App configuration', link: '/aeria-ui/app-configuration' },
        { text: 'Menu configuration', link: '/aeria-ui/menu-configuration' }
      ]
    },
    {
      text: 'Stores',
      items: [
        { text: 'Using and registering stores', link: '/aeria-ui/using-and-registering-stores' },
        { text: 'CollectionStore', link: '/aeria-ui/collection-store' },
      ]
    },
    {
      text: 'Built-ins',
      items: [
        { text: 'Directives', link: '/aeria-ui/directives' },
        { text: 'Composables', link: '/aeria-ui/composables' },
        { text: 'Template functions and computed variables', link: '/aeria-ui/template-functions-and-computed-variables' },
      ]
    },
    {
      text: 'Components',
      items: [
        { text: 'aeria-accordion', link: '/aeria-ui/components/aeria-accordion' },
        { text: 'aeria-bare-button', link: '/aeria-ui/components/aeria-bare-button' },
        { text: 'aeria-button', link: '/aeria-ui/components/aeria-button' },
        { text: 'aeria-card', link: '/aeria-ui/components/aeria-card' },
        { text: 'aeria-checkbox', link: '/aeria-ui/components/aeria-checkbox' },
        { text: 'aeria-crud', link: '/aeria-ui/components/aeria-crud' },
        { text: 'aeria-file', link: '/aeria-ui/components/aeria-file' },
        { text: 'aeria-form', link: '/aeria-ui/components/aeria-form' },
        { text: 'aeria-grid', link: '/aeria-ui/components/aeria-grid' },
        { text: 'aeria-icon', link: '/aeria-ui/components/aeria-icon' },
        { text: 'aeria-info', link: '/aeria-ui/components/aeria-info' },
        { text: 'aeria-input', link: '/aeria-ui/components/aeria-input' },
        { text: 'aeria-main', link: '/aeria-ui/components/aeria-main' },
        { text: 'aeria-options', link: '/aeria-ui/components/aeria-options' },
        { text: 'aeria-panel', link: '/aeria-ui/components/aeria-panel' },
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
